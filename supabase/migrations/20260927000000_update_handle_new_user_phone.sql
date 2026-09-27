-- ============================================================
-- KISAN: Update handle_new_user to support Phone Auth & SMS Signup
-- Migration: 20260927000000_update_handle_new_user_phone.sql
-- ============================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    selected_role text;
begin
    selected_role := coalesce(
        new.raw_user_meta_data->>'role',
        'farmer'
    );

    -- Ensure role matches valid KISAN schema roles
    if selected_role not in (
        'farmer',
        'tool_lender',
        'job_seeker',
        'storage_owner'
    ) then
        selected_role := 'farmer';
    end if;

    insert into public.profiles (
        id,
        full_name,
        phone,
        role,
        language,
        metadata
    )
    values (
        new.id,

        -- Extract full name from metadata or fallback to phone / email / 'User'
        coalesce(
            nullif(new.raw_user_meta_data->>'full_name', ''),
            nullif(split_part(coalesce(new.email, ''), '@', 1), ''),
            nullif(new.phone, ''),
            'User'
        ),

        -- Extract phone from Auth user record or metadata
        coalesce(
            nullif(new.phone, ''),
            new.raw_user_meta_data->>'phone'
        ),

        selected_role,

        coalesce(
            nullif(new.raw_user_meta_data->>'language', ''),
            'en'
        ),

        coalesce(
            new.raw_user_meta_data,
            '{}'::jsonb
        )
    )
    on conflict (id) do update set
        full_name = excluded.full_name,
        phone = coalesce(excluded.phone, public.profiles.phone),
        metadata = public.profiles.metadata || excluded.metadata;

    return new;
end;
$$;
