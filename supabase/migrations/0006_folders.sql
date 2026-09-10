-- ClearTrack — Phase 9: folders & saved songs (PRD §9).
--
-- "Saving" a song is modeled as adding it to at least one folder — the
-- save controls let you pick/create folders directly (PRD §9: "A song can
-- be added to multiple folders from the save controls, including creating
-- a new folder on the spot"). The "Saved" page is the union of every song
-- across all of a user's folders, deduplicated.

create table if not exists public.folders (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.folder_songs (
  folder_id uuid not null references public.folders (id) on delete cascade,
  song_id uuid not null references public.songs (id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (folder_id, song_id)
);

drop trigger if exists set_updated_at on public.folders;
create trigger set_updated_at before update on public.folders
  for each row execute function public.set_updated_at();

-- RLS: private to the owner, per PRD §9 ("All library data is private to
-- its owner, enforced by row-level security"). folder_songs has no
-- owner_id of its own, so it's scoped through its parent folder.
alter table public.folders enable row level security;
alter table public.folder_songs enable row level security;

create policy "folders_owner_all" on public.folders
  for all using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

create policy "folder_songs_owner_all" on public.folder_songs
  for all using (
    exists (select 1 from public.folders f where f.id = folder_id and f.owner_id = auth.uid())
  )
  with check (
    exists (select 1 from public.folders f where f.id = folder_id and f.owner_id = auth.uid())
  );

-- Standing convention since 0003: Supabase no longer auto-exposes new
-- tables to the Data API, so every new table needs an explicit grant.
grant select, insert, update, delete on table public.folders, public.folder_songs
  to anon, authenticated, service_role;
