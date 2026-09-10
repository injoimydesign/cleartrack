import { Link } from "@tanstack/react-router";

import { CoverArt } from "@/components/CoverArt";
import { SaveControls } from "@/components/SaveControls";
import { useAuth } from "@/hooks/useAuth";
import type { SongRecord } from "@/lib/catalog";

export function SongCardGrid({
  songs,
  emptyMessage,
}: {
  songs: SongRecord[];
  emptyMessage: string;
}) {
  const { user } = useAuth();

  if (songs.length === 0) {
    return <p className="panel p-6 text-sm text-muted-foreground">{emptyMessage}</p>;
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {songs.map((song) => (
        <article key={song.id} className="panel flex flex-col gap-3 p-4">
          {user ? (
          <Link
            to="/music/$songId"
            params={{ songId: song.id }}
            className="flex min-w-0 items-center gap-3"
          >
            <CoverArt url={song.cover_url} title={song.title} />
            <div className="min-w-0">
              <p className="truncate font-medium">{song.title}</p>
              <p className="truncate text-sm text-muted-foreground">
                {song.song_artists.map((a) => a.artist.name).join(", ") || "No artist yet"}
              </p>
            </div>
          </Link>
          ) : (
            <Link to="/auth" className="flex min-w-0 items-center gap-3">
              <CoverArt url={song.cover_url} title={song.title} />
              <div className="min-w-0">
                <p className="truncate font-medium">{song.title}</p>
                <p className="truncate text-sm text-muted-foreground">
                  {song.song_artists.map((a) => a.artist.name).join(", ") || "No artist yet"}
                </p>
              </div>
            </Link>
          )}
          <p className="line-clamp-2 text-xs text-muted-foreground">
            {song.song_writers.map((w) => w.writer.name).join(" · ") || "No writers listed"}
          </p>
          <div className="mt-auto">
            <SaveControls songId={song.id} />
          </div>
        </article>
      ))}
    </div>
  );
}
