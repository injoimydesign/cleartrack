import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { deleteArtists, updateArtist } from "@/app/(admin)/artists/actions";
import { NameEntityForm } from "@/components/admin/name-entity-form";
import { EntitySongsList, type EntitySongRow } from "@/components/admin/entity-songs-list";

export const dynamic = "force-dynamic";

type ArtistDetail = {
  id: string;
  name: string;
  song_artists: { songs: { id: string; title: string; cover_art_url: string | null } | null }[];
};

export default async function ArtistDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: entity } = await supabase
    .from("artists")
    .select("id, name, song_artists(songs(id, title, cover_art_url))")
    .eq("id", id)
    .maybeSingle()
    .returns<ArtistDetail | null>();

  if (!entity) {
    notFound();
  }

  const songs: EntitySongRow[] = entity.song_artists
    .filter((sa) => sa.songs)
    .map((sa) => ({
      id: sa.songs!.id,
      title: sa.songs!.title,
      cover_art_url: sa.songs!.cover_art_url,
    }));

  const updateWithId = updateArtist.bind(null, entity.id);
  const deleteWithId = deleteArtists.bind(null, [entity.id]);

  return (
    <div>
      <Link
        href="/artists"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Artists
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
        placeholder="Artist name"
      />

      <div className="mt-8 border-t border-console-border pt-6">
        <h2 className="mb-3 text-sm font-medium">Songs</h2>
        <EntitySongsList songs={songs} />
      </div>
    </div>
  );
}
