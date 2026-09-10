import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { createSong } from "@/app/(admin)/songs/actions";
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

export default async function NewSongPage() {
  const supabase = createAdminClient();
  const [
    { data: artists },
    { data: writerRows },
    { data: labels },
    { data: publishers },
    { data: pros },
  ] = await Promise.all([
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
    supabase.from("pros").select("id, name").order("name"),
  ]);

  const writers: WriterMeta[] = (writerRows ?? []).map((w) => ({
    id: w.id,
    name: w.name,
    proNames: w.writer_pros.map((p) => p.pros?.name).filter((n): n is string => Boolean(n)),
    publisherName: w.publisher?.name ?? null,
    publisherProNames: w.writer_publisher_pros
      .map((p) => p.pros?.name)
      .filter((n): n is string => Boolean(n)),
  }));

  return (
    <div>
      <Link
        href="/songs"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Songs
      </Link>
      <h1 className="mb-6 text-lg font-medium">Add song</h1>
      <SongForm
        referenceData={{
          artists: artists ?? [],
          writers,
          labels: labels ?? [],
          publishers: publishers ?? [],
          pros: pros ?? [],
        }}
        action={createSong}
        submitLabel="Create song"
      />
    </div>
  );
}
