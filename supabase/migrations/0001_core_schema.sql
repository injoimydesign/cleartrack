-- ClearTrack — Phase 1: core data model
-- Reference entities, songs, join tables (with split percentages), profiles,
-- the is_admin() helper, and row-level security policies.
--
-- Design note: every write policy below routes through is_admin(), a single
-- function, rather than repeating the role check per table. See
-- ClearTrack-ARCHITECTURE.md §2–3 for why this exists and the known linter
-- trade-off it carries.

-- ---------------------------------------------------------------------------
-- profiles — one row per auth.users row. Created here (Phase 1) because the
-- admin/member role check is needed by RLS from day one, even though the
-- sign-up UI and "first user = admin" trigger land in Phase 6.
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'member' check (role in ('admin', 'member')),
  display_name text,
  company text,
  business_address text,
  phone text,
  locked boolean not null default false,
  lock_message text not null default 'Please contact ClearTrack administration for help and assistance.',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Security-definer helper so RLS policies have one shared source of truth
-- for "is this user an admin". Runs as the function owner, bypassing RLS
-- on profiles itself, which is what lets it be called from other tables'
-- policies without recursion.
create or replace function public.is_admin(uid uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = uid and role = 'admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- Reference entities — canonical, reusable, admin-managed.
-- ---------------------------------------------------------------------------
create table if not exists public.artists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.pros (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.publishers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.labels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.writers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  -- A writer's own (single) publisher, per PRD §2. The publisher's PROs are
  -- tracked separately below since a writer can carry multiple.
  publisher_id uuid references public.publishers (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Writer <-> PRO, many-to-many (PRD §2: "Multiple PROs per writer").
create table if not exists public.writer_pros (
  writer_id uuid not null references public.writers (id) on delete cascade,
  pro_id uuid not null references public.pros (id) on delete cascade,
  primary key (writer_id, pro_id)
);

-- Writer <-> the PRO(s) of the writer's publisher (PRD §2: "Multiple
-- publisher PROs per writer"). Kept distinct from writer_pros because it
-- describes the publisher relationship, not the writer's own PRO membership.
create table if not exists public.writer_publisher_pros (
  writer_id uuid not null references public.writers (id) on delete cascade,
  pro_id uuid not null references public.pros (id) on delete cascade,
  primary key (writer_id, pro_id)
);

-- ---------------------------------------------------------------------------
-- Songs
-- ---------------------------------------------------------------------------
create table if not exists public.songs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  cover_art_url text,
  notes text,
  spotify_track_id text,
  publisher_id uuid references public.publishers (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.song_artists (
  song_id uuid not null references public.songs (id) on delete cascade,
  artist_id uuid not null references public.artists (id) on delete cascade,
  primary key (song_id, artist_id)
);

create table if not exists public.song_writers (
  song_id uuid not null references public.songs (id) on delete cascade,
  writer_id uuid not null references public.writers (id) on delete cascade,
  split_percent numeric(5, 2) not null check (split_percent >= 0),
  primary key (song_id, writer_id)
);

create table if not exists public.song_labels (
  song_id uuid not null references public.songs (id) on delete cascade,
  label_id uuid not null references public.labels (id) on delete cascade,
  split_percent numeric(5, 2) not null check (split_percent >= 0),
  primary key (song_id, label_id)
);

-- ---------------------------------------------------------------------------
-- updated_at maintenance
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

do $$
declare
  t text;
begin
  foreach t in array array['profiles', 'artists', 'publishers', 'labels', 'writers', 'songs']
  loop
    execute format(
      'drop trigger if exists set_updated_at on public.%I;
       create trigger set_updated_at before update on public.%I
       for each row execute function public.set_updated_at();',
      t, t
    );
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Row-level security
--
-- Read: any authenticated user (supervisors and coordinators alike browse
-- the whole catalog). Write: admin only, enforced here — not in the app —
-- per PRD §7 ("enforced in the database, not just the interface").
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.artists enable row level security;
alter table public.pros enable row level security;
alter table public.publishers enable row level security;
alter table public.labels enable row level security;
alter table public.writers enable row level security;
alter table public.writer_pros enable row level security;
alter table public.writer_publisher_pros enable row level security;
alter table public.songs enable row level security;
alter table public.song_artists enable row level security;
alter table public.song_writers enable row level security;
alter table public.song_labels enable row level security;

-- profiles: a user reads/updates their own row; admins read/update all.
-- (Full admin user-management policies land in Phase 9 — this is the
-- minimum needed for is_admin() and self-service profile fields to work.)
create policy "profiles_select_own_or_admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin(auth.uid()));

create policy "profiles_update_own_or_admin" on public.profiles
  for update using (id = auth.uid() or public.is_admin(auth.uid()));

create policy "profiles_insert_self" on public.profiles
  for insert with check (id = auth.uid());

-- Reusable pattern for every catalog table: read for any signed-in user,
-- write for admins only.
do $$
declare
  t text;
begin
  foreach t in array array[
    'artists', 'pros', 'publishers', 'labels', 'writers',
    'writer_pros', 'writer_publisher_pros',
    'songs', 'song_artists', 'song_writers', 'song_labels'
  ]
  loop
    execute format(
      'create policy "%1$s_read_authenticated" on public.%1$s
         for select using (auth.uid() is not null);',
      t
    );
    execute format(
      'create policy "%1$s_write_admin" on public.%1$s
         for all using (public.is_admin(auth.uid()))
         with check (public.is_admin(auth.uid()));',
      t
    );
  end loop;
end;
$$;

-- Known, accepted trade-off (see PRD §11 and ClearTrack-ARCHITECTURE.md §3):
-- is_admin() is callable by any signed-in user (needed for the policies
-- above to evaluate at all). A linter will flag this; it is intentional.
