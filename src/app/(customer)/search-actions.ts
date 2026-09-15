"use server";

import { createClient } from "@/lib/supabase/server";
import { toPrefixTsQuery } from "@/lib/search";

export type TypeaheadResult = {
  id: string;
  title: string;
  cover_art_url: string | null;
  artistNames: string[];
};

type SongRow = {
  id: string;
  title: string;
  cover_art_url: string | null;
  song_artists: { artists: { name: string } | null }[];
};

/**
 * Powers the header search typeahead on the customer side. Customer routes
 * don't have artist/writer detail pages (those are admin-only), so unlike
 * the admin /search page, this always resolves to a flat list of SONGS —
 * matched either by the song's own title, or by an artist/writer whose
 * name matches, surfacing the songs credited to them.
 */
export async function typeaheadSearch(query: string): Promise<TypeaheadResult[]> {
  const tsQuery = toPrefixTsQuery(query);
  if (!tsQuery) return [];

  const supabase = await createClient();
  const selectSong = "id, title, cover_art_url, song_artists(artists(name))";

  const [byTitle, byArtist, byWriter] = await Promise.all([
    supabase.from("songs").select(selectSong).textSearch("search_vector", tsQuery).limit(6).returns<SongRow[]>(),
    supabase
      .from("artists")
      .select("songs:song_artists(songs(id, title, cover_art_url, song_artists(artists(name))))")
      .textSearch("search_vector", tsQuery)
      .limit(3)
      .returns<{ songs: { songs: SongRow | null }[] }[]>(),
    supabase
      .from("writers")
      .select("songs:song_writers(songs(id, title, cover_art_url, song_artists(artists(name))))")
      .textSearch("search_vector", tsQuery)
      .limit(3)
      .returns<{ songs: { songs: SongRow | null }[] }[]>(),
  ]);

  const seen = new Set<string>();
  const results: TypeaheadResult[] = [];

  function addRow(row: SongRow | null) {
    if (!row || seen.has(row.id) || results.length >= 8) return;
    seen.add(row.id);
    results.push({
      id: row.id,
      title: row.title,
      cover_art_url: row.cover_art_url,
      artistNames: row.song_artists.map((sa) => sa.artists?.name).filter((n): n is string => Boolean(n)),
    });
  }

  (byTitle.data ?? []).forEach(addRow);
  (byArtist.data ?? []).forEach((a) => a.songs.forEach((s) => addRow(s.songs)));
  (byWriter.data ?? []).forEach((w) => w.songs.forEach((s) => addRow(s.songs)));

  return results;
}
