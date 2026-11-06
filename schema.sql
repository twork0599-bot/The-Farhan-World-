-- Run this entire file in Supabase Dashboard > SQL Editor.
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text default '',
  category text not null default 'Technology',
  content_html text not null default '',
  cover_url text,
  media_url text,
  media_type text,
  status text not null default 'draft' check (status in ('draft','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.posts enable row level security;
drop policy if exists "Public can read published posts" on public.posts;
create policy "Public can read published posts" on public.posts
  for select using (status = 'published');
-- Admin API uses the service-role key on the server. Never expose it in browser code.
insert into storage.buckets (id, name, public, file_size_limit)
values ('media','media',true,104857600)
on conflict (id) do update set public = true, file_size_limit = 104857600;
