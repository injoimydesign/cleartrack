import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getPublicRecentSongs } from "@/lib/public-songs";
import { SongCardGrid, type CustomerSongCard } from "@/components/customer/song-card-grid";
import { CoverArt } from "@/components/shared/cover-art";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 25;

type SongJoinRow = {
  id: string;
  title: string;
  cover_art_url: string | null;
  song_artists: { artists: { name: string } | null }[];
};

function toCard(row: SongJoinRow): CustomerSongCard {
  return {
    id: row.id,
    title: row.title,
    cover_art_url: row.cover_art_url,
    artistNames: row.song_artists.map((sa) => sa.artists?.name).filter((n): n is string => Boolean(n)),
  };
}

export default async function BrowsePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    // Signed out: PRD §8 — "a simple card grid only, no counts, filters,
    // or catalog details." See getPublicRecentSongs for why this reads
    // through the service-role client.
    const songs = await getPublicRecentSongs(24);

    return (
      <div>
        <h1 className="mb-6 text-lg font-medium">Browse</h1>
        <SongCardGrid
          songs={songs}
          emptyMessage="No songs yet."
          signedIn={false}
        />
      </div>
    );
  }

  const { page: pageParam } = await searchParams;
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const [{ data: recentData }, { data: tableData, count }] = await Promise.all([
    supabase
      .from("songs")
      .select("id, title, cover_art_url, song_artists(artists(name))")
      .order("created_at", { ascending: false })
      .limit(3)
      .returns<SongJoinRow[]>(),
    supabase
      .from("songs")
      .select("id, title, cover_art_url, song_artists(artists(name))", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(3 + (page - 1) * PAGE_SIZE, 3 + page * PAGE_SIZE - 1)
      .returns<SongJoinRow[]>(),
  ]);

  const remainingCount = Math.max(0, (count ?? 0) - 3);
  const totalPages = Math.max(1, Math.ceil(remainingCount / PAGE_SIZE));
  const recent = (recentData ?? []).map(toCard);
  const rest = (tableData ?? []).map(toCard);

  return (
    <div>
      <h1 className="mb-6 text-lg font-medium">Browse</h1>

      {recent.length > 0 && (
        <div className="mb-8">
          <h2 className="mb-3 text-sm font-medium text-console-text-muted">Most recent</h2>
          <SongCardGrid songs={recent} emptyMessage="" signedIn />
        </div>
      )}

      <h2 className="mb-3 text-sm font-medium text-console-text-muted">All songs</h2>
      {rest.length === 0 ? (
        <p className="rounded-[var(--radius-panel)] border border-console-border p-6 text-sm text-console-text-muted">
          No more songs to show.
        </p>
      ) : (
        <div className="rounded-[var(--radius-panel)] border border-console-border divide-y divide-console-border">
          {rest.map((song) => (
            <Link
              key={song.id}
              href={`/music/${song.id}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-console-border/30"
            >
              <CoverArt url={song.cover_art_url} title={song.title} size={12} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm text-console-text">{song.title}</p>
                <p className="truncate text-xs text-console-text-muted">
                  {song.artistNames.join(", ") || "No artist yet"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="mt-4 flex items-center justify-between text-sm">
          <Link
            href={`/browse?page=${page - 1}`}
            aria-disabled={page <= 1}
            className={`rounded-[var(--radius-pill)] border border-console-border px-3 py-1.5 ${
              page <= 1
                ? "pointer-events-none opacity-40"
                : "text-console-text hover:border-console-accent hover:text-console-accent"
            }`}
          >
            Previous
          </Link>
          <span className="text-console-text-muted">
            Page {page} of {totalPages}
          </span>
          <Link
            href={`/browse?page=${page + 1}`}
            aria-disabled={page >= totalPages}
            className={`rounded-[var(--radius-pill)] border border-console-border px-3 py-1.5 ${
              page >= totalPages
                ? "pointer-events-none opacity-40"
                : "text-console-text hover:border-console-accent hover:text-console-accent"
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </div>
  );
}
