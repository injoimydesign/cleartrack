import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteSong, updateSong } from "@/app/songs/actions";
import { SongForm } from "@/app/songs/song-form";

export const dynamic = "force-dynamic";

export default async function SongDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: song } = await supabase
    .from("songs")
    .select("id, title, cover_art_url, notes")
    .eq("id", id)
    .maybeSingle();

  if (!song) {
    notFound();
  }

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
        defaultValues={song}
        action={updateWithId}
        submitLabel="Save changes"
      />

      <div className="mt-10 border-t border-console-border pt-6">
        <p className="text-sm text-console-text-muted">
          Writers, labels, and splits attach here starting in Phase 2, once
          the reference-data pickers exist.
        </p>
      </div>
    </div>
  );
}
