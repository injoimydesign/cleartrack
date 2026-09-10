# Reference material — not part of the build

Files here are kept for context, not imported anywhere in the app. They're
from a Lovable-generated reference build (TanStack Router + shadcn/React
Query — a different stack than ours) and were deliberately not adapted
during the Phase 3 song-form/list UX pass. Pull from them when their
matching phase comes up:

- **AppShell.tsx** → **Phase 6** (auth) and **Phase 9** (user management).
  Shows: the logo/wordmark treatment, top global search bar, sidebar nav
  icons (lucide-react, one per entity), the sign-in/sign-out control, a
  "Customer view" link out of the admin shell, and a `Users` nav entry.
  The `useAuth()` redirect-if-signed-out pattern (`useEffect` + `navigate`)
  is the interaction to adapt once Supabase Auth is wired in — ours will
  use middleware/server-side redirects instead of a client-side effect,
  but the *behavior* (bounce signed-out visitors to `/auth`) is the same.

- **SongCardGrid.tsx** → **Phase 7/8** (customer browsing UI). Shows the
  customer-facing card-grid treatment for Browse: cover art + title +
  artist line + writer line truncated to two lines, a save control, and a
  signed-out state that links to `/auth` instead of the song page. Compare
  against PRD §8's "three most recent songs as cards, then a table" —
  this card is the shape for those three recent-song cards specifically,
  not the full table.

When building those phases, treat these the same way the Phase 3 pass
treated `SongForm.tsx`/`SongList.tsx`: reimplement the *information and
interaction* on our stack (Next.js Server Components/Actions, Radix
primitives, Supabase Auth) — don't port the TanStack/shadcn code directly.
