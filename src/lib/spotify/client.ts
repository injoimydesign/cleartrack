import "server-only";

// PLATFORM NOTE (Sep 2026): Spotify deprecated the `preview_url` field on
// tracks in Nov 2024 — it's null for every app now, including this one.
// There is no official replacement for a custom 30-second-clip player, so
// this module deliberately does not attempt to fetch one. The "Audio
// preview" UI instead embeds Spotify's own official player iframe
// (https://open.spotify.com/embed/track/{id}), which still plays previews
// through Spotify's UI. See ClearTrack-ARCHITECTURE.md for the decision.

let cachedToken: { value: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now() + 10_000) {
    return cachedToken.value;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error("Spotify credentials are not configured (SPOTIFY_CLIENT_ID/SECRET).");
  }

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  if (!response.ok) {
    throw new Error(`Spotify auth failed: ${response.status} ${await response.text()}`);
  }

  const data = (await response.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    value: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };
  return cachedToken.value;
}

type SpotifyImage = { url: string; height: number | null; width: number | null };
type SpotifyTrack = {
  id: string;
  name: string;
  album: { id: string; images: SpotifyImage[] };
};
type SpotifySearchResponse = { tracks?: { items: SpotifyTrack[] } };
type SpotifyAlbumResponse = {
  copyrights: { text: string; type: "C" | "P" }[];
};

export type SpotifyTrackMatch = {
  trackId: string;
  albumId: string;
  coverArtUrl: string | null;
};

/** Searches by title + artist, preferring an exact (case-insensitive) title match. */
export async function searchTrack(
  title: string,
  artistNames: string[],
): Promise<SpotifyTrackMatch | null> {
  const token = await getAccessToken();
  const query = artistNames.length
    ? `track:${title} artist:${artistNames.join(" ")}`
    : `track:${title}`;

  const url = new URL("https://api.spotify.com/v1/search");
  url.searchParams.set("q", query);
  url.searchParams.set("type", "track");
  url.searchParams.set("limit", "10");

  const response = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!response.ok) {
    throw new Error(`Spotify search failed: ${response.status} ${await response.text()}`);
  }

  const data = (await response.json()) as SpotifySearchResponse;
  const items = data.tracks?.items ?? [];
  if (items.length === 0) return null;

  const exact = items.find((t) => t.name.toLowerCase() === title.trim().toLowerCase());
  const best = exact ?? items[0];

  return {
    trackId: best.id,
    albumId: best.album.id,
    coverArtUrl: best.album.images[0]?.url ?? null,
  };
}

/**
 * Pulls the album's copyright line, preferring the "C" (the copyright)
 * type over "P" (sound recording copyright) per PRD §4. Strips a leading
 * ©/℗ symbol and year, since that prefix isn't part of the publisher name
 * and would otherwise get stored/matched verbatim.
 */
export async function getAlbumCopyrightText(albumId: string): Promise<string | null> {
  const token = await getAccessToken();
  const response = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    throw new Error(`Spotify album lookup failed: ${response.status} ${await response.text()}`);
  }

  const data = (await response.json()) as SpotifyAlbumResponse;
  if (!data.copyrights || data.copyrights.length === 0) return null;

  const preferred =
    data.copyrights.find((c) => c.type === "C") ?? data.copyrights[0];

  return preferred.text
    .replace(/^[\u00A9\u2117]\s*/, "") // leading © or ℗
    .replace(/^\d{4}\s*/, "") // leading year
    .trim();
}
