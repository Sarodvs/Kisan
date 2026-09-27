-- ============================================================
-- KISAN: Add avatar_url to profiles & scope avatar storage paths
-- Migration: 20260927120000_add_avatar_url_and_avatar_policies.sql
-- ============================================================

-- 1. Add avatar_url column to public.profiles table
alter table public.profiles
    add column if not exists avatar_url text;

-- 2. Restructure Storage RLS Policies for kisan-media bucket
-- Drop old broad INSERT policy if present to eliminate permissive OR loophole
drop policy if exists "Authenticated users upload access for kisan-media" on storage.objects;

-- Create policy for non-avatar uploads in kisan-media (marketplace, community, etc.)
do $$
begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'objects'
        and schemaname = 'storage'
        and policyname = 'Authenticated users upload non-avatar media to kisan-media'
    ) then
        create policy "Authenticated users upload non-avatar media to kisan-media"
        on storage.objects
        for insert
        to authenticated
        with check (
            bucket_id = 'kisan-media'
            and (storage.foldername(name))[1] != 'avatars'
        );
    end if;
end $$;

-- Create ownership-scoped policy for avatar uploads in kisan-media (avatars/{auth.uid()}/...)
do $$
begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'objects'
        and schemaname = 'storage'
        and policyname = 'Users upload own avatar to kisan-media'
    ) then
        create policy "Users upload own avatar to kisan-media"
        on storage.objects
        for insert
        to authenticated
        with check (
            bucket_id = 'kisan-media'
            and (storage.foldername(name))[1] = 'avatars'
            and (storage.foldername(name))[2] = auth.uid()::text
        );
    end if;
end $$;

-- Ensure ownership-scoped DELETE policy for avatars in kisan-media
do $$
begin
    if not exists (
        select 1 from pg_policies
        where tablename = 'objects'
        and schemaname = 'storage'
        and policyname = 'Users delete own avatar in kisan-media'
    ) then
        create policy "Users delete own avatar in kisan-media"
        on storage.objects
        for delete
        to authenticated
        using (
            bucket_id = 'kisan-media'
            and (storage.foldername(name))[1] = 'avatars'
            and (storage.foldername(name))[2] = auth.uid()::text
        );
    end if;
end $$;
