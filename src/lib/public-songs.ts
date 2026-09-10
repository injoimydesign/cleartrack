import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

export type PublicSongTeaser = {
  id: string;
  title: string;
  cover_art_url: string | null;
  artistNames: string[];
};

type Row = {
  id: string;
  title: string;
  cover_art_url: string | null;
  song_artists: { artists: { name: string } | null }[];
};

/**
 * Narrow, deliberately public read for signed-out visitors — the landing
 * page's cover-art strip and Browse's signed-out card grid both use this.
 * RLS requires a session for songs/reference tables by design (song notes
 * and other admin fields shouldn't be world-readable), so this is the one
 * place `createAdminClient` is still used post-Phase-6 — and only for
 * these columns, never anything else. See ClearTrack-ARCHITECTURE.md.
 */
export async function getPublicRecentSongs(limit: number): Promise<PublicSongTeaser[]> {
  const admin = createAdminClient();
  const { data } = await admin
    .from("songs")
    .select("id, title, cover_art_url, song_artists(artists(name))")
    .order("created_at", { ascending: false })
    .limit(limit)
    .returns<Row[]>();

  return (data ?? []).map((row) => ({
    id: row.id,
    title: row.title,
    cover_art_url: row.cover_art_url,
    artistNames: row.song_artists
      .map((sa) => sa.artists?.name)
      .filter((n): n is string => Boolean(n)),
  }));
}
