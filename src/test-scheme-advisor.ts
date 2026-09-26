import { supabase } from './lib/supabase';
import { consultSchemeAdvisor } from './lib/api';

/**
 * TEMPORARY DEVELOPMENT-ONLY TEST FOR SCHEME ADVISOR EDGE FUNCTION
 * 
 * Usage:
 * 1. Ensure you are signed in as an authenticated Supabase user.
 * 2. Run testSchemeAdvisor() from the browser console or a temporary button handler.
 */

export async function runSchemeAdvisorTest() {
  console.log('--- Starting Scheme Advisor Integration Test ---');

  // 1. Check current authenticated user session
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    console.error('❌ FAILURE: User is not authenticated. Please log in before running this test.');
    return {
      success: false,
      error: 'Unauthenticated. Please log in first.',
    };
  }

  console.log('✅ User authenticated successfully.');

  // 2. Test Payload
  const testPayload = {
    profile: {
      role: 'farmer',
      crops: ['Paddy', 'Coconut'],
      land_size_hectares: 1.5,
      location: {
        district: 'Palakkad',
        state: 'Kerala',
      },
      language: 'English',
    },
    query: 'What government schemes can help me purchase agricultural machinery?',
  };

  try {
    console.log('⏳ Invoking consultSchemeAdvisor Edge Function...');
    const result = await consultSchemeAdvisor(testPayload.profile, testPayload.query);

    console.log('--------------------------------------------------');
    console.log('✅ TEST RESULT: SUCCESS');
    console.log('--------------------------------------------------');

    // Handle parsed JSON or raw response
    const parsedData = typeof result === 'string' ? JSON.parse(result) : result;

    console.log('\n📋 Recommendations:');
    if (parsedData.recommendations && Array.isArray(parsedData.recommendations)) {
      parsedData.recommendations.forEach((rec: any, idx: number) => {
        console.log(`  ${idx + 1}. [${rec.eligibility_match} Match] ${rec.scheme_title}`);
        console.log(`     Reason: ${rec.reason}`);
      });
    } else {
      console.log('  None provided');
    }

    console.log('\n💡 Advice:');
    console.log(`  ${parsedData.advice || 'No advice text returned.'}`);

    console.log('\n🚀 Next Steps:');
    if (parsedData.next_steps && Array.isArray(parsedData.next_steps)) {
      parsedData.next_steps.forEach((step: string, idx: number) => {
        console.log(`  ${idx + 1}. ${step}`);
      });
    } else {
      console.log('  None provided');
    }

    return {
      success: true,
      recommendations: parsedData.recommendations,
      advice: parsedData.advice,
      next_steps: parsedData.next_steps,
    };
  } catch (err: any) {
    console.error('--------------------------------------------------');
    console.error('❌ TEST RESULT: FAILURE');
    console.error(`Error details: ${err.message || err}`);
    console.error('--------------------------------------------------');

    return {
      success: false,
      error: err.message || err,
    };
  }
}
