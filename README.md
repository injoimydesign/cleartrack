# ClearTrack

Music clearance catalog — see `ClearTrack-PRD-v2.0.md` and
`ClearTrack-ARCHITECTURE.md` (in the parent deliverable) for product and
technical context. This README covers local setup only.

## Setup

1. `npm install`
2. Create a Supabase project, then copy `.env.local.example` to `.env.local`
   and fill in the three Supabase values (the new publishable/secret keys, not legacy anon/service_role) from the project dashboard
   (Settings → API).
3. Link the CLI and push the schema:
   ```
   npx supabase login
   npx supabase link --project-ref <your-project-ref>
   npx supabase db push
   ```
   This runs the schema, seed, and grants migrations in `supabase/migrations/`
   — including `0003_grants.sql`, which is required. Supabase no longer
   auto-exposes new tables to the Data API by default (a 2026 platform
   change), so without that migration every query returns
   `permission denied for table ...` even though RLS is set up correctly.
   If you already ran `db push` before this file existed, run it again —
   migrations are additive and this one is safe to apply on top.
4. Regenerate types against the real schema (replaces the hand-written
   placeholder):
   ```
   npx supabase gen types typescript --linked > src/lib/types/database.ts
   ```
5. `npm run dev` → http://localhost:3000/songs

## Customer song page, nav, and typeahead search

Rebuilt `/music/[id]` to match a reference screenshot (hero record card, side-by-side Writers/Labels split tables, Project Notes card), rebuilt the customer nav to match (icon nav links with an active-state pill, admin-only "Admin" link, sign out), and added a real debounced typeahead search in the header (songs matched by title, artist, or writer name). "Download Report" builds a genuine plain-text rights summary client-side — no report backend exists, so this isn't a formatted PDF, but it's real, not decorative. No schema changes. One known gap: the reference shows album/year/duration under the song title; the schema has none of those fields, so that line is omitted rather than faked.

## Design system restyle

Full visual restyle to the ClearTrack Design System (Figma-sourced tokens/components the user provided) — palette, fonts (Figtree + Inter), radius scale, and icons (real lucide-react, not hand-drawn SVGs). No functional changes; every route/action/interaction from Phase 9 works identically. See `ClearTrack-ARCHITECTURE.md` §18 for the full breakdown, especially the cyan/orange/amber accent-role split.

## Phase 9 status

Saved songs & folders (PRD §9), admin user management at `/users` (PRD §7), and a self-service `/profile` page. "Saving" a song means adding it to a folder — there's no separate saved_songs table. `/users` is the second and last legitimate use of the service-role client in the app, needed specifically for Supabase's Auth Admin API (listing/deleting users), always gated behind a session-client admin check first.

**Requires a new migration** (`0006_folders.sql`) — run `npx supabase db push`.

## Phase 8 status

`/` is the real public landing page now (PRD §8): branding, sign-in/create-account CTAs, a recently-added cover-art strip, feature cards, and SEO/OG metadata. Signed-in visitors get redirected straight to `/browse`. No new migration.

## Phase 7 status

Customer-facing Browse (`/browse`) and song detail (`/music/[id]`) pages, per PRD §8. Signed-out visitors see a bare card grid on Browse (no catalog details); signed in, it's three recent cards + a paginated list. The song page has full rights data, the Spotify embed preview, and a "more by this artist" strip. `SaveControls` correctly shows "Sign in to View" when signed out — the signed-in save button is an honest placeholder, since the folders/saved-songs schema is Phase 9.

No new migration this phase.

## Phase 6 status

Real authentication (PRD §7): self sign-up/sign-in at `/auth`, first-account-becomes-admin trigger, session middleware (now `src/proxy.ts` — Next.js 16 renamed the file convention) gating every catalog route, and locked-account handling. **Every admin action and page now runs under the signed-in user's session instead of the Phase 1 service-role shortcut** — the admin-only RLS policies that have existed since Phase 1 are finally actually being enforced by the database, not just present in the schema.

**Requires a new migration** (`0005_first_user_admin.sql`) — run `npx supabase db push`. The first account you create through `/auth` becomes the admin; there's no signed-out access to the catalog anymore.

## Phase 5 status

Browsing content added to the existing Artist/Writer/Label detail pages (PRD §6) — no new routes, no migration needed. Artist and Label pages now show a "Songs" section; the Writer page also gets a small PRO/Publisher metadata summary above the edit form (`Publisher Name · PRO` format, per PRD §2).

## Phase 4 status

Global search across Songs, Artists, Writers, Labels, and Publishers (PRD §5) — a search bar in the admin header, `/search` results page grouped by type, backed by Postgres full-text search (generated `tsvector` columns + GIN indexes, prefix-matching so partial words still hit).

**Requires a new migration** — run `npx supabase db push` again to apply `0004_search.sql` before search will return results.

## Song form & list UX refresh

Adapted from an uploaded Lovable-generated reference (different stack — TanStack Router/shadcn — reimplemented here, not ported): the song form is now a two-column panel layout with row-based pickers for Writers/Labels/Artists (one row per item, split-percent inline, duplicate-exclusion, an "Add …" button), writer rows show a PRO/publisher info line, split totals show as a colored badge, and cover-art/publisher Spotify fetches are two independent buttons with toast feedback. The songs list now shows cover art, an artist+writer subtitle, label badges, and live split-percentage indicators per row.

**Not carried over from that reference, on purpose:** the logo/wordmark, top global search bar, sidebar icons, a Users admin page, sign-in/out — those belong with Phase 6 (auth) — and the customer-facing card-grid browse view (Phase 7/8).

## Phase 3 status

Spotify integration: a "Fetch from Spotify" button on the song form searches by title + selected artists, fills in cover art and the song's Publisher field (matched/created from the album's copyright line), and shows a live preview immediately — before you've even saved the song.

**Platform note:** Spotify deprecated the `preview_url` field in Nov 2024 and it has stayed removed since — there's no official way to pull a raw 30-second MP3 anymore, for any app. The "Audio preview" section instead embeds Spotify's own official player (`open.spotify.com/embed/track/{id}`), which still plays previews through Spotify's UI. Falls back to "No preview available" when there's no Spotify match, per PRD §4.

Needs `SPOTIFY_CLIENT_ID` / `SPOTIFY_CLIENT_SECRET` in `.env.local` (Client Credentials flow — no user login involved). **If you register a new Spotify Developer app, it starts in "Development Mode,"** which as of Feb 2026 requires the app owner's Spotify account to have an active Premium subscription, or the integration stops working. Apply for Extended Quota Mode if this needs to be more resilient than that.

## Phase 2 status

Full reference-data CRUD for Artists, Writers, Labels, Publishers, and PROs
— each with list (bulk-select + delete), create, and edit pages. The Song
form now has Artists/Writers/Labels pickers wired in: client-side search
over the reference list, "Add "<name>"" inline creation, and a per-item
split-percent field for Writers/Labels with a visible warning when a
song's splits don't total 100% (allowed, per PRD §2, but flagged).
Writer's Publisher field also supports inline "add new."

All admin routes (Songs, Writers, Labels, Publishers, PROs, Artists) now
live under an `(admin)` route group in `src/app/(admin)/` so they share
one sidebar layout — the group folder doesn't affect the URL, so PRD §3's
"admin catalog lives at /songs" still holds; `/writers`, `/labels`, etc.
sit alongside it the same way.

**Known Phase 2 shortcut:** the "Add "<name>"" writer/label/artist/publisher
flow is a simplified inline-create rather than the PRD's separate dialog
(§3 point 3) — same end result (create, refresh, auto-select) without a
modal. Worth revisiting as a real dialog in a later polish pass.

## Phase 1 status

Core schema (songs, artists, writers, labels, publishers, PROs, all join
tables with splits, `profiles` + `is_admin()`, full RLS) plus admin CRUD for
the Song entity itself (title, cover art URL, notes). Reference-data
management, writer/label/PRO pickers on the song form, and everything past
that follows the phase order in ClearTrack-ARCHITECTURE.md §5.

**Known Phase 1 shortcut:** admin writes currently go through the
service-role client (`src/lib/supabase/admin.ts`) because there's no
sign-in yet. That file and `src/app/songs/actions.ts` both flag where this
needs to switch to the session-aware client once Phase 6 (auth) lands —
that's the point at which the RLS admin-role check actually starts being
enforced rather than just being present in the schema.
