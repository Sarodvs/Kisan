// @ts-ignore Remote Deno imports are resolved by the Supabase Edge Function runtime.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
// @ts-ignore Remote Deno imports are resolved by the Supabase Edge Function runtime.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

declare const Deno: {
  env: {
    get(name: string): string | undefined;
  };
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RequestBody {
  profile?: {
    role?: string;
    crops?: string[];
    land_size_hectares?: number;
    location?: { district?: string; state?: string };
    language?: string;
  };
  query?: string;
  mode?: "start" | "continue";
  answers?: Array<{ question?: string; answer?: "Yes" | "No" }>;
  scheme?: {
    id?: string;
    title?: string;
    category?: string;
    description?: string;
    benefits?: string;
    eligibility_criteria?: Record<string, unknown>;
    official_link?: string;
    source_url?: string;
    source_type?: string;
  };
}

const VALID_ROLES = ["farmer", "tool_lender", "job_seeker", "storage_owner"];

function encodePdf(bytes: Uint8Array) {
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(index, index + chunkSize));
  }
  return btoa(binary);
}

serve(async (req: Request) => {
  // 1. Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 2. Validate Authorization Header & Authenticate User via Supabase Auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Missing Authorization header. Authentication required." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";

    if (!supabaseUrl || !supabaseAnonKey) {
      return new Response(
        JSON.stringify({ error: "Supabase environment configuration error." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });

    // Authenticate user using the token
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: "Invalid or expired authentication token." }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. Parse & Validate Input Body
    let body: RequestBody;
    try {
      body = (await req.json()) as RequestBody;
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid JSON request body." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Input Validation & Sanitization
    const rawQuery = body.query ?? "";
    if (typeof rawQuery !== "string") {
      return new Response(
        JSON.stringify({ error: "Query parameter must be a string." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const cleanQuery = rawQuery.trim().slice(0, 500); // Limit query length to 500 chars

    const role = body.profile?.role && VALID_ROLES.includes(body.profile.role)
      ? body.profile.role
      : "farmer";

    const crops = Array.isArray(body.profile?.crops)
      ? body.profile.crops
          .filter((c): c is string => typeof c === "string")
          .map((c) => c.trim().slice(0, 50))
          .slice(0, 20)
      : [];

    const rawLand = body.profile?.land_size_hectares;
    const landSize = typeof rawLand === "number" && !isNaN(rawLand) && rawLand >= 0
      ? rawLand
      : null;

    const district = typeof body.profile?.location?.district === "string"
      ? body.profile.location.district.trim().slice(0, 100)
      : "";
    const state = typeof body.profile?.location?.state === "string"
      ? body.profile.location.state.trim().slice(0, 100)
      : "India";

    const language = typeof body.profile?.language === "string"
      ? body.profile.language.trim().slice(0, 50)
      : "English";

    // 4. Fetch Trusted Government Schemes Data Directly from Database Server-Side
    const { data: trustedSchemes, error: dbError } = await supabase
      .from("government_schemes")
      .select("id, title, category, description, benefits, eligibility_criteria, official_link, source_url, source_type");

    if (dbError) {
      return new Response(
        JSON.stringify({ error: `Database query failed: ${dbError.message}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 5. Verify Gemini API Key
    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    if (!geminiApiKey) {
      return new Response(
        JSON.stringify({ error: "GEMINI_API_KEY environment variable is not configured." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (body.scheme) {
      const scheme = (trustedSchemes || []).find((item: any) =>
        (body.scheme?.id && item.id === body.scheme.id) || item.title === body.scheme?.title
      ) || body.scheme;
      const answers = Array.isArray(body.answers)
        ? body.answers.filter((item) => item && (item.answer === "Yes" || item.answer === "No")).slice(0, 8)
        : [];
      const pdfUrl = typeof scheme.source_url === "string" && (scheme.source_type === "pdf" || scheme.source_url.toLowerCase().split("?")[0].endsWith(".pdf"))
        ? scheme.source_url
        : null;
      const parts: Array<Record<string, unknown>> = [];

      if (pdfUrl) {
        try {
          const pdfResponse = await fetch(pdfUrl);
          if (pdfResponse.ok) {
            parts.push({ inlineData: { mimeType: "application/pdf", data: encodePdf(new Uint8Array(await pdfResponse.arrayBuffer())) } });
          }
        } catch {
          // Use the verified database criteria if the source PDF is temporarily unavailable.
        }
      }

      const eligibilityPrompt = `You help an Indian farmer check one government scheme. Use only the official scheme context below and, when present, the attached official PDF. Ask one short question at a time that can be answered Yes or No. Ask only questions needed to decide eligibility. After enough answers, return a result. Never invent criteria.

Official scheme context:
${JSON.stringify(scheme)}

Farmer profile:
${JSON.stringify({ role, crops, landSize, district, state, language })}

Previous answers:
${JSON.stringify(answers)}

Return strict JSON in exactly one of these forms:
{ "question": "One simple yes/no question" }
or
{ "result": "eligible" | "not_eligible" | "needs_verification", "reason": "Short explanation tied to the criteria", "next_steps": ["Short practical next step"] }`;
      parts.push({ text: eligibilityPrompt });

      const eligibilityRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts }],
          generationConfig: { responseMimeType: "application/json", temperature: 0.1 },
        }),
      });

      if (!eligibilityRes.ok) {
        return new Response(JSON.stringify({ error: `Gemini API Error: ${await eligibilityRes.text()}` }), {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const eligibilityData = await eligibilityRes.json();
      const eligibilityText = eligibilityData.candidates?.[0]?.content?.parts?.[0]?.text;
      return new Response(eligibilityText || JSON.stringify({ error: "No eligibility response generated." }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // 6. Build Grounded Prompt with Strict Isolation
    const systemPrompt = `You are Kisan AI, an expert agricultural scheme and farming advisor for Indian rural farmers.
CRITICAL INSTRUCTIONS:
- You must ONLY recommend government schemes present in the provided Trusted Database Schemes list below.
- DO NOT invent, hallucinate, or reference any external government scheme titles or eligibility rules not present in the trusted context.
- If no scheme in the context matches, state clearly that no specific scheme in our database matches the query.
- Format responses strictly in simple, clear JSON. Keep advice practical, encouraging, and in clear simple language (${language}).`;

    const trustedContextString = JSON.stringify(trustedSchemes || [], null, 2);

    const userContent = `
--- TRUSTED DATABASE SCHEMES CONTEXT ---
${trustedContextString}

--- USER PROFILE (UNTRUSTED DATA) ---
Role: ${role}
Crops: ${crops.length > 0 ? crops.join(", ") : "General crops"}
Land Size: ${landSize !== null ? landSize + " hectares" : "Not specified"}
Location: ${district ? district + ", " : ""}${state}
Preferred Language: ${language}

--- USER QUERY (UNTRUSTED DATA) ---
"${cleanQuery || "What government schemes and subsidies am I eligible for?"}"

Respond strictly with valid JSON using this structure:
{
  "recommendations": [
    {
      "scheme_title": "Exact Title from Trusted Context",
      "eligibility_match": "High" | "Medium" | "Low",
      "reason": "Clear explanation based on profile"
    }
  ],
  "advice": "Clear advice for the farmer",
  "next_steps": ["Step 1", "Step 2"]
}
`;

    // 7. Invoke Gemini API (gemini-1.5-flash)
    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`;

    const geminiRes = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemPrompt}\n\n${userContent}` }],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.1,
        },
      }),
    });

    if (!geminiRes.ok) {
      const errorText = await geminiRes.text();
      return new Response(
        JSON.stringify({ error: `Gemini API Error: ${errorText}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const geminiData = await geminiRes.json();
    const responseText = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    return new Response(responseText || JSON.stringify({ advice: "No response generated." }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
