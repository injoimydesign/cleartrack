import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CoverArt } from "@/components/shared/cover-art";
import { SaveControls } from "@/components/customer/save-controls";
import { formatWriterPros, formatWriterPublisherDisplay, type WriterMeta } from "@/lib/format-writer";

export const dynamic = "force-dynamic";

type SongDetail = {
  id: string;
  title: string;
  cover_art_url: string | null;
  spotify_track_id: string | null;
  publisher: { name: string } | null;
  song_artists: { artist_id: string; artists: { id: string; name: string } | null }[];
  song_writers: {
    split_percent: number;
    writers: {
      id: string;
      name: string;
      publisher: { name: string } | null;
      writer_pros: { pros: { name: string } | null }[];
      writer_publisher_pros: { pros: { name: string } | null }[];
    } | null;
  }[];
  song_labels: { split_percent: number; labels: { id: string; name: string } | null }[];
};

type RelatedSong = { id: string; title: string; cover_art_url: string | null };

export default async function CustomerSongPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: song } = await supabase
    .from("songs")
    .select(
      `id, title, cover_art_url, spotify_track_id,
       publisher:publisher_id(name),
       song_artists(artist_id, artists(id, name)),
       song_writers(split_percent, writers(
         id, name, publisher:publisher_id(name),
         writer_pros(pros(name)), writer_publisher_pros(pros(name))
       )),
       song_labels(split_percent, labels(id, name))`,
    )
    .eq("id", id)
    .maybeSingle()
    .returns<SongDetail | null>();

  if (!song) {
    notFound();
  }

  const artistIds = song.song_artists.map((sa) => sa.artist_id);

  let related: RelatedSong[] = [];
  if (artistIds.length > 0) {
    const { data: relatedRows } = await supabase
      .from("song_artists")
      .select("songs(id, title, cover_art_url)")
      .in("artist_id", artistIds)
      .neq("song_id", song.id)
      .returns<{ songs: RelatedSong | null }[]>();

    const seen = new Set<string>();
    for (const row of relatedRows ?? []) {
      if (row.songs && !seen.has(row.songs.id)) {
        seen.add(row.songs.id);
        related.push(row.songs);
      }
    }
    related = related.slice(0, 10);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        href="/browse"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Browse
      </Link>

      <div className="mb-6 flex items-start gap-4">
        <CoverArt url={song.cover_art_url} title={song.title} size={16} />
        <div className="min-w-0 flex-1">
          <h1 className="text-lg font-medium text-console-text">{song.title}</h1>
          <p className="truncate text-sm text-console-text-muted">
            {song.song_artists
              .filter((sa) => sa.artists)
              .map((sa) => sa.artists!.name)
              .join(", ") || "No artist yet"}
          </p>
          {song.publisher && (
            <p className="mt-1 text-xs text-console-text-muted">Publisher: {song.publisher.name}</p>
          )}
        </div>
        <SaveControls songId={song.id} signedIn />
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-sm font-medium text-console-text-muted">Audio preview</h2>
        {song.spotify_track_id ? (
          <iframe
            src={`https://open.spotify.com/embed/track/${song.spotify_track_id}`}
            width="100%"
            height="152"
            style={{ borderRadius: "var(--radius-control)" }}
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify audio preview"
          />
        ) : (
          <p className="text-sm text-console-text-muted">No preview available.</p>
        )}
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-sm font-medium text-console-text-muted">Writers</h2>
        {song.song_writers.length === 0 ? (
          <p className="text-sm text-console-text-muted">No writers listed.</p>
        ) : (
          <div className="rounded-[var(--radius-panel)] border border-console-border divide-y divide-console-border">
            {song.song_writers
              .filter((sw) => sw.writers)
              .map((sw) => {
                const w = sw.writers!;
                const meta: WriterMeta = {
                  id: w.id,
                  name: w.name,
                  proNames: w.writer_pros.map((p) => p.pros?.name).filter((n): n is string => Boolean(n)),
                  publisherName: w.publisher?.name ?? null,
                  publisherProNames: w.writer_publisher_pros
                    .map((p) => p.pros?.name)
                    .filter((n): n is string => Boolean(n)),
                };
                return (
                  <div key={w.id} className="px-4 py-2.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-console-text">{w.name}</span>
                      <span className="text-sm font-bold text-console-accent">
                        {sw.split_percent}%
                      </span>
                    </div>
                    <p className="mt-0.5 text-xs text-console-text-muted">
                      {formatWriterPros(meta)} · {formatWriterPublisherDisplay(meta)}
                    </p>
                  </div>
                );
              })}
          </div>
        )}
      </div>

      <div className="mb-8">
        <h2 className="mb-2 text-sm font-medium text-console-text-muted">Labels</h2>
        {song.song_labels.length === 0 ? (
          <p className="text-sm text-console-text-muted">No labels listed.</p>
        ) : (
          <div className="rounded-[var(--radius-panel)] border border-console-border divide-y divide-console-border">
            {song.song_labels
              .filter((sl) => sl.labels)
              .map((sl) => (
                <div key={sl.labels!.id} className="flex items-center justify-between px-4 py-2.5 text-sm">
                  <span className="text-console-text">{sl.labels!.name}</span>
                  <span className="text-sm font-bold text-console-accent">
                    {sl.split_percent}%
                  </span>
                </div>
              ))}
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-medium text-console-text-muted">More by this artist</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/music/${r.id}`}
                className="w-32 shrink-0 rounded-[var(--radius-control)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-console-accent"
              >
                <CoverArt url={r.cover_art_url} title={r.title} size={16} />
                <p className="mt-1.5 truncate text-xs text-console-text">{r.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
