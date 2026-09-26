-- ============================================================
-- KISAN: Automatically create profile after signup
-- Migration: create_profile_on_signup
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

    -- Only allow valid KISAN roles.
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

        coalesce(
            new.raw_user_meta_data->>'full_name',
            split_part(coalesce(new.email, ''), '@', 1),
            'User'
        ),

        new.raw_user_meta_data->>'phone',

        selected_role,

        coalesce(
            new.raw_user_meta_data->>'language',
            'ml'
        ),

        coalesce(
            new.raw_user_meta_data,
            '{}'::jsonb
        )
    );

    return new;
end;
$$;


-- Run the function whenever a new auth user is created.
create trigger on_auth_user_created
    after insert on auth.users
    for each row
    execute function public.handle_new_user();