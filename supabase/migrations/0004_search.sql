-- ClearTrack — Phase 4: full-text search (PRD §5).
--
-- Generated tsvector columns + GIN indexes on the five searchable entities
-- (songs, artists, writers, labels, publishers — PROs are a small fixed
-- reference list and aren't part of PRD §5's search scope). Generated
-- columns keep the vector in sync automatically on every insert/update, so
-- there's no trigger to maintain separately.
--
-- Query-side note: search is done with a hand-built prefix tsquery
-- ("term:* & term:*") rather than plainto_tsquery, so partial/forgiving
-- matches on the last word typed still hit the index — see src/lib/search.ts.

alter table public.songs
  add column if not exists search_vector tsvector
  generated always as (
    to_tsvector('english', coalesce(title, '') || ' ' || coalesce(notes, ''))
  ) stored;
create index if not exists songs_search_idx on public.songs using gin (search_vector);

alter table public.artists
  add column if not exists search_vector tsvector
  generated always as (to_tsvector('english', coalesce(name, ''))) stored;
create index if not exists artists_search_idx on public.artists using gin (search_vector);

alter table public.writers
  add column if not exists search_vector tsvector
  generated always as (to_tsvector('english', coalesce(name, ''))) stored;
create index if not exists writers_search_idx on public.writers using gin (search_vector);

alter table public.labels
  add column if not exists search_vector tsvector
  generated always as (to_tsvector('english', coalesce(name, ''))) stored;
create index if not exists labels_search_idx on public.labels using gin (search_vector);

alter table public.publishers
  add column if not exists search_vector tsvector
  generated always as (to_tsvector('english', coalesce(name, ''))) stored;
create index if not exists publishers_search_idx on public.publishers using gin (search_vector);
