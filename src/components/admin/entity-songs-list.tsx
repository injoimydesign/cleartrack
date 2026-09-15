import Link from "next/link";
import { CoverArt } from "@/components/shared/cover-art";

export type EntitySongRow = {
  id: string;
  title: string;
  cover_art_url: string | null;
  splitPercent?: number;
};

export function EntitySongsList({ songs }: { songs: EntitySongRow[] }) {
  if (songs.length === 0) {
    return <p className="text-sm text-console-text-muted">No songs yet.</p>;
  }

  return (
    <div className="rounded-[var(--radius-panel)] border border-console-border divide-y divide-console-border">
      {songs.map((song) => (
        <Link
          key={song.id}
          href={`/songs/${song.id}`}
          className="flex items-center gap-3 px-4 py-2.5 hover:bg-console-border/30"
        >
          <CoverArt url={song.cover_art_url} title={song.title} size={12} />
          <span className="min-w-0 flex-1 truncate text-sm text-console-text">
            {song.title}
          </span>
          {song.splitPercent !== undefined && (
            <span className="shrink-0 text-sm font-bold text-console-accent">
              {song.splitPercent}%
            </span>
          )}
        </Link>
      ))}
    </div>
  );
}
