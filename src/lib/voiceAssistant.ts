import { supabase } from './supabase';

export type VoiceContext = 'equipment_listing' | 'job_posting' | 'storage_listing' | 'profile';

export interface FormFieldSchema {
  name: string;
  type: 'string' | 'number' | 'date';
  label: string;
}

export const FORM_SCHEMAS: Record<VoiceContext, FormFieldSchema[]> = {
  equipment_listing: [
    { name: 'title', type: 'string', label: 'Equipment Name' },
    { name: 'category', type: 'string', label: 'Category' },
    { name: 'daily_rate', type: 'number', label: 'Daily Rate' },
    { name: 'location_address', type: 'string', label: 'Location' },
    { name: 'description', type: 'string', label: 'Description' },
  ],
  job_posting: [
    { name: 'title', type: 'string', label: 'Job Title' },
    { name: 'workers_needed', type: 'number', label: 'Workers Needed' },
    { name: 'daily_wage', type: 'number', label: 'Daily Wage' },
    { name: 'date_required', type: 'date', label: 'Date Required' },
    { name: 'description', type: 'string', label: 'Description' },
  ],
  storage_listing: [
    { name: 'title', type: 'string', label: 'Storage Facility Name' },
    { name: 'storage_type', type: 'string', label: 'Storage Type' },
    { name: 'total_capacity_tons', type: 'number', label: 'Capacity (Tons)' },
    { name: 'rate_per_ton_day', type: 'number', label: 'Daily Rate per Ton' },
    { name: 'location_address', type: 'string', label: 'Location' },
  ],
  profile: [
    { name: 'firstName', type: 'string', label: 'First Name' },
    { name: 'lastName', type: 'string', label: 'Last Name' },
    { name: 'city', type: 'string', label: 'City/District' },
    { name: 'phone', type: 'string', label: 'Contact Phone' },
    { name: 'crops', type: 'string', label: 'Crops' },
    { name: 'farm_size_range', type: 'string', label: 'Farm Size' },
    { name: 'interests', type: 'string', label: 'Interests' },
    { name: 'equipment_types', type: 'string', label: 'Equipment Types' },
    { name: 'work_skills', type: 'string', label: 'Work Skills' },
    { name: 'storage_types', type: 'string', label: 'Storage Types' },
  ],
};

const BCP47_MAP: Record<string, string> = {
  ml: 'ml-IN',
  hi: 'hi-IN',
  ta: 'ta-IN',
  en: 'en-IN',
};

export function isSpeechRecognitionSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}

export async function processVoiceInput(
  context: VoiceContext,
  transcript: string,
  appLanguage: string = 'en'
): Promise<{ candidateFields: Record<string, any>; unresolved: string[] }> {
  const allowedSchemas = FORM_SCHEMAS[context] || [];
  const allowedFieldNames = allowedSchemas.map(s => s.name);
  const lang = BCP47_MAP[appLanguage] || 'en-IN';

  try {
    const { data, error } = await supabase.functions.invoke('voice-extractor', {
      body: {
        context,
        language: lang,
        transcript,
        allowedFields: allowedFieldNames,
      },
    });

    if (!error && data?.fields && Object.keys(data.fields).length > 0) {
      return sanitizeExtractedFields(data.fields, allowedSchemas);
    }
  } catch (err) {
    console.warn('Edge function voice extraction fallback to local parser:', err);
  }

  // Client-side rule-based fallback parser if Edge Function is unavailable or unconfigured
  return fallbackRuleBasedExtraction(context, transcript, allowedSchemas);
}

function sanitizeExtractedFields(
  rawFields: Record<string, any>,
  schemas: FormFieldSchema[]
): { candidateFields: Record<string, any>; unresolved: string[] } {
  const candidateFields: Record<string, any> = {};
  const unresolved: string[] = [];

  for (const schema of schemas) {
    const val = rawFields[schema.name];
    if (val === undefined || val === null || val === '') continue;

    if (schema.type === 'number') {
      const num = typeof val === 'number' ? val : parseFloat(String(val).replace(/[^\d.]/g, ''));
      if (!isNaN(num) && num >= 0) {
        candidateFields[schema.name] = num;
      } else {
        unresolved.push(schema.label);
      }
    } else if (schema.type === 'date') {
      const dateStr = String(val).trim();
      const parsed = Date.parse(dateStr);
      if (!isNaN(parsed)) {
        candidateFields[schema.name] = new Date(parsed).toISOString().split('T')[0];
      } else {
        candidateFields[schema.name] = dateStr;
      }
    } else {
      candidateFields[schema.name] = String(val).trim();
    }
  }

  return { candidateFields, unresolved };
}

function fallbackRuleBasedExtraction(
  context: VoiceContext,
  text: string,
  schemas: FormFieldSchema[]
): { candidateFields: Record<string, any>; unresolved: string[] } {
  const candidateFields: Record<string, any> = {};
  const lower = text.toLowerCase();

  // Numbers regex
  const numbers = text.match(/\d+(?:\.\d+)?/g);

  if (context === 'equipment_listing') {
    candidateFields.title = text.slice(0, 50);
    if (numbers && numbers[0]) candidateFields.daily_rate = parseFloat(numbers[0]);
  } else if (context === 'job_posting') {
    candidateFields.title = text.slice(0, 50);
    if (numbers && numbers[0]) candidateFields.workers_needed = parseInt(numbers[0], 10);
    if (numbers && numbers[1]) candidateFields.daily_wage = parseFloat(numbers[1]);
  } else if (context === 'storage_listing') {
    candidateFields.title = text.slice(0, 50);
    if (numbers && numbers[0]) candidateFields.total_capacity_tons = parseFloat(numbers[0]);
    if (numbers && numbers[1]) candidateFields.rate_per_ton_day = parseFloat(numbers[1]);
  } else if (context === 'profile') {
    const words = text.split(' ').filter(Boolean);
    if (words[0]) candidateFields.firstName = words[0];
    if (words[1]) candidateFields.lastName = words[1];
  }

  return sanitizeExtractedFields(candidateFields, schemas);
}
