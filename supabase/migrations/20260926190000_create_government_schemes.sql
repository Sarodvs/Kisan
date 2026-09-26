-- ============================================================
-- KISAN: Government Welfare Schemes Data
-- Migration: 20260926190000_create_government_schemes.sql
-- ============================================================

-- 1. Government Schemes Table
create table public.government_schemes (
    id uuid primary key default gen_random_uuid(),
    title text not null,
    category text not null,
    description text not null,
    eligibility_criteria jsonb not null default '{}'::jsonb,
    benefits text not null,
    official_link text,
    created_at timestamptz not null default timezone('utc', now())
);

-- Index for category
create index government_schemes_category_idx on public.government_schemes(category);

-- RLS for government_schemes
alter table public.government_schemes enable row level security;

-- Anyone can view government schemes
create policy "Anyone can view government schemes"
on public.government_schemes
for select
to authenticated, anon
using (true);

-- 2. Seed Initial Agricultural Schemes
insert into public.government_schemes (title, category, description, eligibility_criteria, benefits, official_link)
values
(
    'PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)',
    'Income Support',
    'Provides financial support of Rs. 6,000 per year to all landholding farmer families across India in 3 equal installments.',
    '{"roles": ["farmer"], "max_land_hectares": null, "exclusions": ["institutional_landholders", "high_income_taxpayers"]}'::jsonb,
    'Rs. 6,000 per year directly transferred to verified bank account (3 installments of Rs. 2,000).',
    'https://pmkisan.gov.in'
),
(
    'PMFBY (Pradhan Mantri Fasal Bima Yojana)',
    'Crop Insurance',
    'Comprehensive crop insurance scheme covering crop failure against non-preventable natural risks from pre-sowing to post-harvest.',
    '{"roles": ["farmer"], "crops": ["all_food_crops", "oilseeds", "commercial_crops"]}'::jsonb,
    'Premium rate of only 2% for Kharif, 1.5% for Rabi, and 5% for commercial/horticultural crops with full financial claim settlement.',
    'https://pmfby.gov.in'
),
(
    'KCC (Kisan Credit Card Scheme)',
    'Credit & Loans',
    'Provides timely and hassle-free credit to farmers for agricultural inputs, crop maintenance, and emergency farm expenses.',
    '{"roles": ["farmer", "tool_lender"], "max_interest_rate": "7%"}'::jsonb,
    'Revolving credit up to Rs. 3 Lakhs at subsidized interest rates (4% effective with prompt repayment incentive).',
    'https://myscheme.gov.in'
),
(
    'SMAM (Sub-Mission on Agricultural Mechanization)',
    'Mechanization',
    'Subsidizes agricultural machinery and equipment for small, marginal farmers and custom hiring centers.',
    '{"roles": ["farmer", "tool_lender"], "target_groups": ["small_farmers", "women_farmers", "sc_st"]}'::jsonb,
    '40% to 80% subsidy on farm tractors, tillers, harvesters, and specialized farm implements.',
    'https://agrimachinery.nic.in'
),
(
    'AIF (Agriculture Infrastructure Fund)',
    'Infrastructure',
    'Medium-long term debt financing facility for investment in viable projects for post-harvest management infrastructure and community farming assets.',
    '{"roles": ["farmer", "storage_owner", "tool_lender"], "target_assets": ["cold_storage", "warehouses", "silos"]}'::jsonb,
    '3% per annum interest subvention up to Rs. 2 Crore credit limit for 7 years.',
    'https://agriinfra.dac.gov.in'
);
