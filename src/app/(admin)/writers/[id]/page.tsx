import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteWriters, updateWriter } from "@/app/(admin)/writers/actions";
import { WriterForm } from "@/app/(admin)/writers/writer-form";
import { EntitySongsList, type EntitySongRow } from "@/components/admin/entity-songs-list";
import {
  formatWriterPros,
  formatWriterPublisherDisplay,
  type WriterMeta,
} from "@/lib/format-writer";

export const dynamic = "force-dynamic";

type WriterDetail = {
  id: string;
  name: string;
  publisher_id: string | null;
  publisher: { name: string } | null;
  writer_pros: { pro_id: string; pros: { name: string } | null }[];
  writer_publisher_pros: { pro_id: string; pros: { name: string } | null }[];
  song_writers: {
    split_percent: number;
    songs: { id: string; title: string; cover_art_url: string | null } | null;
  }[];
};

export default async function WriterDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: writer }, { data: publishers }, { data: pros }] = await Promise.all([
    supabase
      .from("writers")
      .select(
        `id, name, publisher_id, publisher:publisher_id(name),
         writer_pros(pro_id, pros(name)),
         writer_publisher_pros(pro_id, pros(name)),
         song_writers(split_percent, songs(id, title, cover_art_url))`,
      )
      .eq("id", id)
      .maybeSingle()
      .returns<WriterDetail | null>(),
    supabase.from("publishers").select("id, name").order("name"),
    supabase.from("pros").select("id, name").order("name"),
  ]);

  if (!writer) {
    notFound();
  }

  const writerMeta: WriterMeta = {
    id: writer.id,
    name: writer.name,
    proNames: writer.writer_pros.map((p) => p.pros?.name).filter((n): n is string => Boolean(n)),
    publisherName: writer.publisher?.name ?? null,
    publisherProNames: writer.writer_publisher_pros
      .map((p) => p.pros?.name)
      .filter((n): n is string => Boolean(n)),
  };

  const songs: EntitySongRow[] = writer.song_writers
    .filter((sw) => sw.songs)
    .map((sw) => ({
      id: sw.songs!.id,
      title: sw.songs!.title,
      cover_art_url: sw.songs!.cover_art_url,
      splitPercent: sw.split_percent,
    }));

  const updateWithId = updateWriter.bind(null, writer.id);
  const deleteWithId = deleteWriters.bind(null, [writer.id]);

  return (
    <div>
      <Link
        href="/writers"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Writers
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">{writer.name}</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-[var(--radius-control)] border border-console-warn/40 px-3 py-1.5 text-sm text-console-warn hover:bg-console-warn/10"
          >
            Delete
          </button>
        </form>
      </div>

      {/* PRD §6: labelled two-column metadata rows for PRO and Publisher. */}
      <dl className="mb-8 grid max-w-md grid-cols-[auto_1fr] gap-x-4 gap-y-2 rounded-[var(--radius-panel)] border border-console-border p-4 text-sm">
        <dt className="text-console-text-muted">PRO</dt>
        <dd className="text-console-text">{formatWriterPros(writerMeta)}</dd>
        <dt className="text-console-text-muted">Publisher</dt>
        <dd className="text-console-text">{formatWriterPublisherDisplay(writerMeta)}</dd>
      </dl>

      <WriterForm
        defaultValues={{
          name: writer.name,
          publisherId: writer.publisher_id,
          proIds: writer.writer_pros.map((p) => p.pro_id),
          publisherProIds: writer.writer_publisher_pros.map((p) => p.pro_id),
        }}
        publishers={publishers ?? []}
        pros={pros ?? []}
        action={updateWithId}
        submitLabel="Save changes"
      />

      <div className="mt-8 border-t border-console-border pt-6">
        <h2 className="mb-3 text-sm font-medium">Songs</h2>
        <EntitySongsList songs={songs} />
      </div>
    </div>
  );
}
