-- ============================================================
-- KISAN: Add Personalization Onboarding Fields to Profiles
-- Migration: 20260927140000_add_personalization_to_profiles.sql
-- ============================================================

alter table public.profiles
    add column if not exists crops text[] not null default '{}',
    add column if not exists farm_size_range text,
    add column if not exists interests text[] not null default '{}',
    add column if not exists equipment_types text[] not null default '{}',
    add column if not exists work_skills text[] not null default '{}',
    add column if not exists storage_types text[] not null default '{}',
    add column if not exists onboarding_completed boolean not null default false;

-- Backward compatibility: Mark existing accounts created before this migration cutoff
-- as onboarding_completed = true so legacy users are not blocked or forced
-- through onboarding upon login.
do $$
declare
    migration_cutoff timestamptz := timezone('utc', now());
begin
    update public.profiles
    set onboarding_completed = true
    where created_at < migration_cutoff
      and onboarding_completed = false;
end $$;
