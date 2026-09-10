import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { renameFolder } from "@/app/(customer)/folders/actions";
import { SongCardGrid, type CustomerSongCard } from "@/components/customer/song-card-grid";

export const dynamic = "force-dynamic";

type FolderDetail = {
  id: string;
  name: string;
  folder_songs: {
    songs: {
      id: string;
      title: string;
      cover_art_url: string | null;
      song_artists: { artists: { name: string } | null }[];
    } | null;
  }[];
};

export default async function FolderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: folder } = await supabase
    .from("folders")
    .select("id, name, folder_songs(songs(id, title, cover_art_url, song_artists(artists(name))))")
    .eq("id", id)
    .maybeSingle()
    .returns<FolderDetail | null>();

  if (!folder) {
    notFound();
  }

  const songs: CustomerSongCard[] = folder.folder_songs
    .filter((fs) => fs.songs)
    .map((fs) => ({
      id: fs.songs!.id,
      title: fs.songs!.title,
      cover_art_url: fs.songs!.cover_art_url,
      artistNames: fs.songs!.song_artists
        .map((sa) => sa.artists?.name)
        .filter((n): n is string => Boolean(n)),
    }));

  const renameWithId = renameFolder.bind(null, folder.id);

  return (
    <div>
      <Link
        href="/folders"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Folders
      </Link>

      <form action={renameWithId} className="mb-6 flex items-center gap-3">
        <input
          name="name"
          defaultValue={folder.name}
          className="rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-lg font-medium text-console-text focus:border-console-accent"
        />
        <button
          type="submit"
          className="rounded-[var(--radius-pill)] border border-console-border px-3 py-1.5 text-sm text-console-text hover:border-console-accent hover:text-console-accent"
        >
          Rename
        </button>
      </form>

      <SongCardGrid songs={songs} emptyMessage="No songs in this folder yet." signedIn />
    </div>
  );
}
