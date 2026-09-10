"use server";

import { createClient } from "@/lib/supabase/server";
import { searchTrack, getAlbumCopyrightText } from "@/lib/spotify/client";

// PHASE 1/2 NOTE (still applies): publisher lookup/creation here uses the
// service-role admin client — same tracked shortcut as the rest of the
// admin CRUD, to be swapped to the session client once auth lands
// (Phase 6).
//
// Split into two independent actions (cover art vs. publisher) rather than
// one combined fetch — matches PRD §4, which describes them as separate
// operations, and lets an admin refresh one without touching the other.

export type SpotifyCoverResult =
  | { ok: true; coverArtUrl: string | null; spotifyTrackId: string }
  | { ok: false; error: string };

export async function fetchSpotifyCoverArt(
  title: string,
  artistNames: string[],
): Promise<SpotifyCoverResult> {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return { ok: false, error: "Enter a title before fetching from Spotify." };
  }

  try {
    const match = await searchTrack(trimmedTitle, artistNames);
    if (!match) {
      return { ok: false, error: "No matching track found on Spotify." };
    }
    return {
      ok: true,
      coverArtUrl: match.coverArtUrl,
      spotifyTrackId: match.trackId,
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Spotify search failed." };
  }
}

export type SpotifyPublisherResult =
  | { ok: true; publisher: { id: string; name: string }; created: boolean }
  | { ok: false; error: string };

export async function fetchSpotifyPublisher(
  title: string,
  artistNames: string[],
): Promise<SpotifyPublisherResult> {
  const trimmedTitle = title.trim();
  if (!trimmedTitle) {
    return { ok: false, error: "Enter a title before fetching from Spotify." };
  }

  let match;
  try {
    match = await searchTrack(trimmedTitle, artistNames);
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : "Spotify search failed." };
  }
  if (!match) {
    return { ok: false, error: "No matching track found on Spotify." };
  }

  let copyrightText: string | null = null;
  try {
    copyrightText = await getAlbumCopyrightText(match.albumId);
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Spotify album lookup failed.",
    };
  }

  if (!copyrightText) {
    return { ok: false, error: "Spotify has no copyright/publishing credit for this album." };
  }

  const supabase = await createClient();
  const { data: existing } = await supabase
    .from("publishers")
    .select("id, name")
    .ilike("name", copyrightText)
    .maybeSingle();

  if (existing) {
    return { ok: true, publisher: existing, created: false };
  }

  const { data: created, error } = await supabase
    .from("publishers")
    .insert({ name: copyrightText })
    .select("id, name")
    .single();

  if (error || !created) {
    return { ok: false, error: error?.message ?? "Could not create the publisher record." };
  }

  return { ok: true, publisher: created, created: true };
}
