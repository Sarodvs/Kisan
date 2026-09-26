An AI-assisted, voice-first digital marketplace and e-service coordination platform designed to bridge the digital and accessibility divide for Indian farmers and rural communities.

Built in 24 hours, Kisan connects small and marginal farmers with local equipment lenders, agricultural laborers, and storage facilities, while enabling seamless interaction with local e-service centers (Common Service Centers / Akshaya centers) and welfare scheme eligibility engines.

🌟 Key Features
Voice & Vernacular-First Onboarding: Eliminates literacy and technological barriers through localized explainer videos and speech-to-text voice prompts that gather basic farmer profiles without complex text input.

Hyperlocal Equipment & Storage Marketplace (P2P & B2C): An on-demand sharing economy allowing farmers to rent idle tractors, tillers, harvesters, and cold-storage units on a pay-per-use model.

AI Government Scheme Eligibility Engine: Analyzes basic parameters (land size, crops, monthly income) to recommend eligible central and state agricultural schemes with clear, step-by-step application guidance.

Dual-Role Operator Dashboard: Provides a streamlined view for local e-service center operators to manage service requests, update application statuses, and track localized rural bookings in real-time.

🛠️ Tech Stack
Frontend: React (Vite) + TypeScript

Styling & Components: Tailwind CSS, shadcn/ui, Lucide Icons

Backend & Database: Supabase (PostgreSQL, Row-Level Security, Realtime Subscriptions)

API / Connecting Layer: Supabase JavaScript Client (@supabase/supabase-js)

AI Assistance: Gemini API (Scheme eligibility matching and voice parsing)

Deployment: Vercel

## Local setup

1. Copy `.env.example` to `.env.local` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the Supabase project settings.
2. Apply the SQL migrations in `supabase/migrations` to the project.
3. In Supabase Dashboard, enable **Authentication > Providers > Phone** and configure an SMS provider. The app sends Indian numbers as `+91XXXXXXXXXX`.
4. Run `npm install` and `npm run dev`.

The onboarding flow currently uses temporary development verification: any six-digit code is accepted, and Supabase Anonymous Auth creates the backend session. New users are created with role and name metadata, the database trigger creates their profile, and the signup then stores their address, phone, and onboarding answers in `profiles`. Re-enable real phone OTP before production.
