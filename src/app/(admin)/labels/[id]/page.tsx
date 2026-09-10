import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteLabels, updateLabel } from "@/app/(admin)/labels/actions";
import { NameEntityForm } from "@/components/admin/name-entity-form";
import { EntitySongsList, type EntitySongRow } from "@/components/admin/entity-songs-list";

export const dynamic = "force-dynamic";

type LabelDetail = {
  id: string;
  name: string;
  song_labels: {
    split_percent: number;
    songs: { id: string; title: string; cover_art_url: string | null } | null;
  }[];
};

export default async function LabelDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entity } = await supabase
    .from("labels")
    .select("id, name, song_labels(split_percent, songs(id, title, cover_art_url))")
    .eq("id", id)
    .maybeSingle()
    .returns<LabelDetail | null>();

  if (!entity) {
    notFound();
  }

  const songs: EntitySongRow[] = entity.song_labels
    .filter((sl) => sl.songs)
    .map((sl) => ({
      id: sl.songs!.id,
      title: sl.songs!.title,
      cover_art_url: sl.songs!.cover_art_url,
      splitPercent: sl.split_percent,
    }));

  const updateWithId = updateLabel.bind(null, entity.id);
  const deleteWithId = deleteLabels.bind(null, [entity.id]);

  return (
    <div>
      <Link
        href="/labels"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Labels
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">{entity.name}</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-[var(--radius-control)] border border-console-warn/40 px-3 py-1.5 text-sm text-console-warn hover:bg-console-warn/10"
          >
            Delete
          </button>
        </form>
      </div>

      <NameEntityForm
        defaultName={entity.name}
        action={updateWithId}
        submitLabel="Save changes"
        placeholder="Label name"
      />

      <div className="mt-8 border-t border-console-border pt-6">
        <h2 className="mb-3 text-sm font-medium">Songs</h2>
        <EntitySongsList songs={songs} />
      </div>
    </div>
  );
}
