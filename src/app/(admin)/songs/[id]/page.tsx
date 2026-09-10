import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteSong, updateSong } from "@/app/(admin)/songs/actions";
import { SongForm } from "@/app/(admin)/songs/song-form";
import type { WriterMeta } from "@/lib/format-writer";

export const dynamic = "force-dynamic";

type WriterRow = {
  id: string;
  name: string;
  publisher: { name: string } | null;
  writer_pros: { pros: { name: string } | null }[];
  writer_publisher_pros: { pros: { name: string } | null }[];
};

type SongDetail = {
  id: string;
  title: string;
  cover_art_url: string | null;
  notes: string | null;
  spotify_track_id: string | null;
  publisher: { id: string; name: string } | null;
  song_artists: { artist_id: string; artists: { id: string; name: string } | null }[];
  song_writers: {
    writer_id: string;
    split_percent: number;
    writers: { id: string; name: string } | null;
  }[];
  song_labels: {
    label_id: string;
    split_percent: number;
    labels: { id: string; name: string } | null;
  }[];
};

export default async function SongDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();

  const [
    { data: song },
    { data: artists },
    { data: writerRows },
    { data: labels },
    { data: publishers },
  ] = await Promise.all([
    supabase
      .from("songs")
      .select(
        `id, title, cover_art_url, notes, spotify_track_id,
         publisher:publisher_id(id, name),
         song_artists(artist_id, artists(id, name)),
         song_writers(writer_id, split_percent, writers(id, name)),
         song_labels(label_id, split_percent, labels(id, name))`,
      )
      .eq("id", id)
      .maybeSingle()
      .returns<SongDetail | null>(),
    supabase.from("artists").select("id, name").order("name"),
    supabase
      .from("writers")
      .select(
        `id, name, publisher:publisher_id(name),
         writer_pros(pros(name)), writer_publisher_pros(pros(name))`,
      )
      .order("name")
      .returns<WriterRow[]>(),
    supabase.from("labels").select("id, name").order("name"),
    supabase.from("publishers").select("id, name").order("name"),
  ]);

  if (!song) {
    notFound();
  }

  const writers: WriterMeta[] = (writerRows ?? []).map((w) => ({
    id: w.id,
    name: w.name,
    proNames: w.writer_pros.map((p) => p.pros?.name).filter((n): n is string => Boolean(n)),
    publisherName: w.publisher?.name ?? null,
    publisherProNames: w.writer_publisher_pros
      .map((p) => p.pros?.name)
      .filter((n): n is string => Boolean(n)),
  }));

  const updateWithId = updateSong.bind(null, song.id);
  const deleteWithId = deleteSong.bind(null, song.id);

  return (
    <div>
      <Link
        href="/songs"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Songs
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">{song.title}</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-[var(--radius-control)] border border-console-warn/40 px-3 py-1.5 text-sm text-console-warn hover:bg-console-warn/10"
          >
            Delete
          </button>
        </form>
      </div>

      <SongForm
        defaultValues={{
          title: song.title,
          cover_art_url: song.cover_art_url,
          notes: song.notes,
          publisher: song.publisher,
          spotify_track_id: song.spotify_track_id,
          artists: song.song_artists
            .filter((sa) => sa.artists)
            .map((sa) => ({ id: sa.artists!.id, name: sa.artists!.name })),
          writers: song.song_writers
            .filter((sw) => sw.writers)
            .map((sw) => ({
              id: sw.writers!.id,
              splitPercent: String(sw.split_percent),
            })),
          labels: song.song_labels
            .filter((sl) => sl.labels)
            .map((sl) => ({
              id: sl.labels!.id,
              splitPercent: String(sl.split_percent),
            })),
        }}
        referenceData={{
          artists: artists ?? [],
          writers,
          labels: labels ?? [],
          publishers: publishers ?? [],
        }}
        action={updateWithId}
        submitLabel="Save changes"
      />
    </div>
  );
}
