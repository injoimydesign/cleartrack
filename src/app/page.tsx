import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getPublicRecentSongs } from "@/lib/public-songs";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "ClearTrack — Music Clearance Catalog",
  description:
    "Search, evaluate, and clear songs for film and TV. Full rights data — writers, splits, PROs, publishers, and labels — in one place.",
  openGraph: {
    title: "ClearTrack — Music Clearance Catalog",
    description:
      "Search, evaluate, and clear songs for film and TV. Full rights data in one place.",
    type: "website",
  },
};

const FEATURES = [
  {
    title: "Full rights data",
    description:
      "Writers with splits and PROs, labels with splits, and publisher credits — canonical records reused across every song, not re-entered each time.",
  },
  {
    title: "Spotify-powered lookups",
    description:
      "Fetch cover art and publisher credits straight from Spotify, then review and confirm before saving.",
  },
  {
    title: "Fast, forgiving search",
    description:
      "One search box across songs, artists, writers, labels, and publishers — built for how supervisors and coordinators actually look things up.",
  },
];

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // PRD §8: "Signed-in visitors get links straight through to Browse."
  if (user) {
    redirect("/browse");
  }

  const recentSongs = await getPublicRecentSongs(10);

  return (
    <div className="min-h-screen bg-console-bg text-console-text">
      <header className="flex items-center justify-between px-6 py-5">
        <span className="font-mono text-sm tracking-tight text-console-accent">
          CLEARTRACK
        </span>
        <nav className="flex items-center gap-3 text-sm">
          <Link
            href="/auth?mode=sign-in"
            className="text-console-text-muted hover:text-console-accent"
          >
            Sign in
          </Link>
          <Link
            href="/auth?mode=sign-up"
            className="rounded-[var(--radius-pill)] bg-console-accent px-4 py-1.5 font-medium text-console-bg hover:bg-console-accent-strong"
          >
            Create account
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold text-console-text sm:text-4xl">
          The music clearance catalog built for supervisors and coordinators
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-console-text-muted">
          Search, evaluate, and organize song licensing rights data — writers,
          splits, PROs, publishers, and labels — all in one place.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/auth?mode=sign-up"
            className="rounded-[var(--radius-pill)] bg-console-accent px-5 py-2 text-sm font-medium text-console-bg hover:bg-console-accent-strong"
          >
            Create account
          </Link>
          <Link
            href="/auth?mode=sign-in"
            className="rounded-[var(--radius-pill)] border border-console-border px-5 py-2 text-sm text-console-text hover:border-console-accent hover:text-console-accent"
          >
            Sign in
          </Link>
        </div>
      </main>

      {recentSongs.length > 0 && (
        <div className="mx-auto max-w-4xl px-6 pb-16">
          <p className="mb-3 text-center text-xs text-console-text-muted">
            Recently added
          </p>
          <div className="flex justify-center gap-3 overflow-x-auto">
            {recentSongs.map((song) => (
              <div
                key={song.id}
                className="h-16 w-16 shrink-0 overflow-hidden rounded-[var(--radius-control)] border border-console-border bg-console-panel"
              >
                {song.cover_art_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={song.cover_art_url}
                    alt={`${song.title} cover art`}
                    className="h-full w-full object-cover"
                  />
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}

      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="grid gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="rounded-[var(--radius-panel)] border border-console-border bg-console-panel p-5"
            >
              <h2 className="mb-2 text-sm font-semibold text-console-text">
                {feature.title}
              </h2>
              <p className="text-sm text-console-text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
