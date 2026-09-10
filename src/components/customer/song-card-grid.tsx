import Link from "next/link";
import { CoverArt } from "@/components/shared/cover-art";
import { SaveControls } from "@/components/customer/save-controls";

export type CustomerSongCard = {
  id: string;
  title: string;
  cover_art_url: string | null;
  artistNames: string[];
};

export function SongCardGrid({
  songs,
  emptyMessage,
  signedIn,
}: {
  songs: CustomerSongCard[];
  emptyMessage: string;
  signedIn: boolean;
}) {
  if (songs.length === 0) {
    return (
      <p className="rounded-[var(--radius-panel)] border border-console-border p-6 text-sm text-console-text-muted">
        {emptyMessage}
      </p>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {songs.map((song) => (
        <article
          key={song.id}
          className="flex flex-col gap-3 rounded-[var(--radius-panel)] border border-console-border bg-console-panel p-4"
        >
          <Link
            href={signedIn ? `/music/${song.id}` : "/auth"}
            className="flex min-w-0 items-center gap-3"
          >
            <CoverArt url={song.cover_art_url} title={song.title} />
            <div className="min-w-0">
              <p className="truncate font-medium text-console-text">{song.title}</p>
              <p className="truncate text-sm text-console-text-muted">
                {song.artistNames.join(", ") || "No artist yet"}
              </p>
            </div>
          </Link>
          <div className="mt-auto">
            <SaveControls songId={song.id} signedIn={signedIn} />
          </div>
        </article>
      ))}
    </div>
  );
}
