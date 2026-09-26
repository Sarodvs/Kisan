// @ts-ignore Supabase Edge Function runtime resolves remote Deno imports.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore Supabase Edge Function runtime resolves the package import.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

declare const Deno: { env: { get(name: string): string | undefined } };

const corsHeaders = { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" };

type ParsedScheme = {
  title: string;
  category: string;
  description: string;
  eligibility_criteria: Record<string, unknown>;
  benefits: string;
  official_link: string;
};

function sourceUrls() {
  return (Deno.env.get("OFFICIAL_SCHEME_SOURCE_URLS") || "")
    .split(",")
    .map((url) => url.trim())
    .filter((url) => /^https:\/\//i.test(url));
}

async function parseOfficialSource(url: string, geminiApiKey: string): Promise<ParsedScheme[]> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Could not fetch ${url}: ${response.status}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  let binary = "";
  for (let index = 0; index < bytes.length; index += 1) binary += String.fromCharCode(bytes[index]);
  const prompt = `Read this official Indian government scheme document. Return only JSON with a schemes array. Extract only scheme names, descriptions, benefits, and explicit eligibility criteria. Do not invent missing facts. Every record must retain source_url: ${url}.`;
  const geminiResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: response.headers.get("content-type") || "application/pdf", data: btoa(binary) } }] }], generationConfig: { responseMimeType: "application/json", temperature: 0 } }),
  });
  if (!geminiResponse.ok) throw new Error(`Gemini could not parse ${url}`);
  const result = await geminiResponse.json();
  const content = result.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
  return JSON.parse(content).schemes || [];
}

serve(async (request: Request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY") || "";
    if (!supabaseUrl || !serviceRoleKey || !geminiApiKey) throw new Error("SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and GEMINI_API_KEY are required");
    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const urls = sourceUrls();
    if (!urls.length) throw new Error("Set OFFICIAL_SCHEME_SOURCE_URLS to comma-separated official HTTPS PDF or webpage URLs");
    let imported = 0;
    for (const url of urls) {
      const schemes = await parseOfficialSource(url, geminiApiKey);
      for (const scheme of schemes) {
        await supabase.from("government_schemes").upsert({ ...scheme, source_url: url, source_checked_at: new Date().toISOString(), active: true }, { onConflict: "title" });
        imported += 1;
      }
    }
    return new Response(JSON.stringify({ imported, sources: urls.length }), { headers: corsHeaders });
  } catch (error) {
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Scheme sync failed" }), { status: 500, headers: corsHeaders });
  }
});
