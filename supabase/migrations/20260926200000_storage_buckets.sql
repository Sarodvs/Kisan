-- ============================================================
-- KISAN: Storage Buckets & Policies
-- Migration: 20260926200000_storage_buckets.sql
-- ============================================================

-- 1. Insert 'kisan-media' bucket if it doesn't already exist
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
    'kisan-media',
    'kisan-media',
    true,
    52428800, -- 50 MB
    array['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf', 'audio/webm', 'audio/mp3', 'audio/wav']
)
on conflict (id) do update set
    public = true,
    file_size_limit = 52428800;


-- 2. Storage Objects Row-Level Security Policies
-- Anyone can view public files in kisan-media bucket
create policy "Public view access for kisan-media"
on storage.objects
for select
to authenticated, anon
using (bucket_id = 'kisan-media');

-- Authenticated users can upload files to kisan-media
create policy "Authenticated users upload access for kisan-media"
on storage.objects
for insert
to authenticated
with check (
    bucket_id = 'kisan-media'
    and auth.role() = 'authenticated'
);

-- Owners can update their uploaded files in kisan-media
create policy "Users update own files in kisan-media"
on storage.objects
for update
to authenticated
using (bucket_id = 'kisan-media' and owner = auth.uid())
with check (bucket_id = 'kisan-media' and owner = auth.uid());

-- Owners can delete their uploaded files in kisan-media
create policy "Users delete own files in kisan-media"
on storage.objects
for delete
to authenticated
using (bucket_id = 'kisan-media' and owner = auth.uid());
