import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteSongs } from "@/app/(admin)/songs/actions";
import { SongListPanel, type SongListRow } from "@/app/(admin)/songs/song-list-panel";
import { ErrorBanner } from "@/components/admin/error-banner";

export const dynamic = "force-dynamic";

type SongRow = {
  id: string;
  title: string;
  cover_art_url: string | null;
  song_artists: { artists: { name: string } | null }[];
  song_writers: { split_percent: number; writers: { name: string } | null }[];
  song_labels: { split_percent: number; labels: { name: string } | null }[];
};

export default async function SongsPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("songs")
    .select(
      `id, title, cover_art_url, updated_at,
       song_artists(artists(name)),
       song_writers(split_percent, writers(name)),
       song_labels(split_percent, labels(name))`,
    )
    .order("updated_at", { ascending: false })
    .returns<SongRow[]>();

  const rows: SongListRow[] = (data ?? []).map((song) => ({
    id: song.id,
    title: song.title,
    cover_art_url: song.cover_art_url,
    artistNames: song.song_artists.map((a) => a.artists?.name).filter((n): n is string => Boolean(n)),
    writers: song.song_writers
      .filter((w) => w.writers)
      .map((w) => ({ name: w.writers!.name, split_percent: w.split_percent })),
    labels: song.song_labels
      .filter((l) => l.labels)
      .map((l) => ({ name: l.labels!.name, split_percent: l.split_percent })),
  }));

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">Songs</h1>
        <Link
          href="/songs/new"
          className="rounded-[var(--radius-pill)] bg-console-accent px-4 py-1.5 text-sm font-medium text-console-bg hover:bg-console-accent-strong"
        >
          Add song
        </Link>
      </div>

      {error && <ErrorBanner message={`Couldn't load songs: ${error.message}`} />}

      {!error && (
        <SongListPanel
          songs={rows}
          onBulkDelete={deleteSongs}
          emptyMessage="No songs in the catalog yet."
        />
      )}
    </div>
  );
}
