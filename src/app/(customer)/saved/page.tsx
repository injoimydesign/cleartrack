import { createClient } from "@/lib/supabase/server";
import { SongCardGrid, type CustomerSongCard } from "@/components/customer/song-card-grid";

export const dynamic = "force-dynamic";

type Row = {
  songs: {
    id: string;
    title: string;
    cover_art_url: string | null;
    song_artists: { artists: { name: string } | null }[];
  } | null;
};

export default async function SavedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: folderRows } = await supabase
    .from("folders")
    .select("id")
    .eq("owner_id", user!.id);
  const folderIds = (folderRows ?? []).map((f) => f.id);

  let rows: Row[] = [];
  if (folderIds.length > 0) {
    const { data } = await supabase
      .from("folder_songs")
      .select("songs(id, title, cover_art_url, song_artists(artists(name)))")
      .in("folder_id", folderIds)
      .returns<Row[]>();
    rows = data ?? [];
  }

  const seen = new Set<string>();
  const songs: CustomerSongCard[] = [];
  for (const row of rows) {
    if (row.songs && !seen.has(row.songs.id)) {
      seen.add(row.songs.id);
      songs.push({
        id: row.songs.id,
        title: row.songs.title,
        cover_art_url: row.songs.cover_art_url,
        artistNames: row.songs.song_artists
          .map((sa) => sa.artists?.name)
          .filter((n): n is string => Boolean(n)),
      });
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-lg font-medium">Saved</h1>
      <SongCardGrid
        songs={songs}
        emptyMessage="Nothing saved yet — use the Save button on any song to add it to a folder."
        signedIn
      />
    </div>
  );
}
