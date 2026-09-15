import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { CoverArt } from "@/components/shared/cover-art";
import { SaveControls } from "@/components/customer/save-controls";
import { DownloadReportButton } from "@/components/customer/download-report-button";
import { formatWriterPros, type WriterMeta } from "@/lib/format-writer";

export const dynamic = "force-dynamic";

type SongDetail = {
  id: string;
  title: string;
  cover_art_url: string | null;
  spotify_track_id: string | null;
  notes: string | null;
  publisher: { name: string } | null;
  song_artists: { artist_id: string; artists: { id: string; name: string } | null }[];
  song_writers: {
    split_percent: number;
    writers: {
      id: string;
      name: string;
      publisher: { name: string } | null;
      writer_pros: { pros: { name: string } | null }[];
      writer_publisher_pros: { pros: { name: string } | null }[];
    } | null;
  }[];
  song_labels: { split_percent: number; labels: { id: string; name: string } | null }[];
};

type RelatedSong = { id: string; title: string; cover_art_url: string | null };

function sumSplits(values: number[]) {
  return values.reduce((sum, v) => sum + v, 0);
}

export default async function CustomerSongPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: song } = await supabase
    .from("songs")
    .select(
      `id, title, cover_art_url, spotify_track_id, notes,
       publisher:publisher_id(name),
       song_artists(artist_id, artists(id, name)),
       song_writers(split_percent, writers(
         id, name, publisher:publisher_id(name),
         writer_pros(pros(name)), writer_publisher_pros(pros(name))
       )),
       song_labels(split_percent, labels(id, name))`,
    )
    .eq("id", id)
    .maybeSingle()
    .returns<SongDetail | null>();

  if (!song) {
    notFound();
  }

  const artistIds = song.song_artists.map((sa) => sa.artist_id);
  const artistNames = song.song_artists
    .filter((sa) => sa.artists)
    .map((sa) => sa.artists!.name);

  let related: RelatedSong[] = [];
  if (artistIds.length > 0) {
    const { data: relatedRows } = await supabase
      .from("song_artists")
      .select("songs(id, title, cover_art_url)")
      .in("artist_id", artistIds)
      .neq("song_id", song.id)
      .returns<{ songs: RelatedSong | null }[]>();

    const seen = new Set<string>();
    for (const row of relatedRows ?? []) {
      if (row.songs && !seen.has(row.songs.id)) {
        seen.add(row.songs.id);
        related.push(row.songs);
      }
    }
    related = related.slice(0, 10);
  }

  const writerRows = song.song_writers.filter((sw) => sw.writers);
  const labelRows = song.song_labels.filter((sl) => sl.labels);
  const writerTotal = sumSplits(writerRows.map((sw) => sw.split_percent));
  const labelTotal = sumSplits(labelRows.map((sl) => sl.split_percent));

  const reportData = {
    title: song.title,
    artistNames,
    writers: writerRows.map((sw) => {
      const w = sw.writers!;
      const meta: WriterMeta = {
        id: w.id,
        name: w.name,
        proNames: w.writer_pros.map((p) => p.pros?.name).filter((n): n is string => Boolean(n)),
        publisherName: w.publisher?.name ?? null,
        publisherProNames: [],
      };
      return {
        name: w.name,
        pro: formatWriterPros(meta),
        publisher: w.publisher?.name ?? "",
        splitPercent: sw.split_percent,
      };
    }),
    labels: labelRows.map((sl) => ({ name: sl.labels!.name, splitPercent: sl.split_percent })),
    notes: song.notes,
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        href="/browse"
        className="mb-6 inline-flex items-center gap-2 text-sm text-console-accent hover:underline"
      >
        <ArrowLeft size={14} aria-hidden />
        Back to catalog
      </Link>

      {/* Hero record card */}
      <div className="mb-6 flex items-center gap-6 rounded-[var(--radius-lg)] bg-console-panel p-6 shadow-[var(--shadow-card),inset_0_0_0_1px_var(--border-default)]">
        <CoverArt url={song.cover_art_url} title={song.title} size={16} />
        <div className="min-w-0 flex-1">
          <p className="mb-3 text-[10px] font-bold tracking-[1.5px] text-console-accent uppercase">
            Clearance information
          </p>
          <h1 className="truncate text-[42px] leading-tight font-bold text-console-text">
            {song.title}
          </h1>
          {artistNames.length > 0 && (
            <p className="mt-1 truncate text-xl text-console-text-muted">
              {artistNames.join(", ")}
            </p>
          )}
        </div>
        {song.spotify_track_id && (
          <iframe
            src={`https://open.spotify.com/embed/track/${song.spotify_track_id}`}
            width="270"
            height="80"
            style={{ borderRadius: "var(--radius-control)", flexShrink: 0 }}
            frameBorder={0}
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify audio preview"
          />
        )}
      </div>

      {/* Actions */}
      <div className="mb-8 flex gap-3">
        <SaveControls songId={song.id} signedIn variant="button" />
        <DownloadReportButton data={reportData} />
      </div>

      <div className="mb-8 h-px bg-console-border" />

      <div className="mb-1">
        <h2 className="text-2xl font-bold text-console-text">Splits</h2>
        <p className="mt-1 text-sm text-console-text-muted">
          Verified ownership and live clearance progress for this composition.
        </p>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        {/* Writers */}
        <div>
          <div className="mb-3 flex items-end justify-between">
            <h3 className="text-xl font-bold text-console-text">Writers</h3>
            <span className="text-sm text-console-text">Total ownership {writerTotal}%</span>
          </div>
          {writerRows.length === 0 ? (
            <p className="text-sm text-console-text-muted">No writers listed.</p>
          ) : (
            <div className="overflow-hidden rounded-[var(--radius-panel)] bg-console-panel shadow-[inset_0_0_0_1px_var(--border-default)]">
              <div className="flex h-12 items-center gap-3 bg-console-border/40 px-4">
                <span className="w-[230px] shrink-0 text-[10px] font-bold tracking-[1px] text-console-text-muted uppercase">
                  Writer
                </span>
                <span className="flex-1 text-[10px] font-bold tracking-[1px] text-console-text-muted uppercase">
                  Publisher
                </span>
                <span className="w-[70px] shrink-0 text-[10px] font-bold tracking-[1px] text-console-text-muted uppercase">
                  Split
                </span>
              </div>
              {writerRows.map((sw, i) => {
                const w = sw.writers!;
                const meta: WriterMeta = {
                  id: w.id,
                  name: w.name,
                  proNames: w.writer_pros.map((p) => p.pros?.name).filter((n): n is string => Boolean(n)),
                  publisherName: w.publisher?.name ?? null,
                  publisherProNames: [],
                };
                const pros = formatWriterPros(meta);
                return (
                  <div
                    key={w.id}
                    className={`flex items-center gap-3 px-4 py-3 ${i < writerRows.length - 1 ? "border-b border-console-border" : ""}`}
                  >
                    <div className="w-[230px] shrink-0">
                      <p className="text-sm text-console-text">{w.name}</p>
                      {pros !== "No PRO" && (
                        <p className="text-xs text-console-text-muted">{pros}</p>
                      )}
                    </div>
                    <span className="min-w-0 flex-1 truncate text-sm text-console-text">
                      {w.publisher ? `${w.publisher.name}${pros !== "No PRO" ? ` (${pros})` : ""}` : "—"}
                    </span>
                    <span className="w-[70px] shrink-0 text-xl font-bold text-console-accent">
                      {sw.split_percent}%
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Labels */}
        <div>
          <div className="mb-3 flex items-end justify-between">
            <h3 className="text-xl font-bold text-console-text">Labels</h3>
            <span className="text-sm text-console-text">Total ownership {labelTotal}%</span>
          </div>
          {labelRows.length === 0 ? (
            <p className="text-sm text-console-text-muted">No labels listed.</p>
          ) : (
            <div className="overflow-hidden rounded-[var(--radius-panel)] bg-console-panel shadow-[inset_0_0_0_1px_var(--border-default)]">
              <div className="flex h-12 items-center gap-3 bg-console-border/40 px-4">
                <span className="flex-1 text-[10px] font-bold tracking-[1px] text-console-text-muted uppercase">
                  Label
                </span>
                <span className="w-[70px] shrink-0 text-[10px] font-bold tracking-[1px] text-console-text-muted uppercase">
                  Split
                </span>
              </div>
              {labelRows.map((sl, i) => (
                <div
                  key={sl.labels!.id}
                  className={`flex items-center gap-3 px-4 py-3 ${i < labelRows.length - 1 ? "border-b border-console-border" : ""}`}
                >
                  <span className="min-w-0 flex-1 truncate text-sm text-console-text">
                    {sl.labels!.name}
                  </span>
                  <span className="w-[70px] shrink-0 text-xl font-bold text-console-accent">
                    {sl.split_percent}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {song.notes && (
        <div className="mt-8 rounded-[var(--radius-panel)] bg-console-panel p-6 shadow-[inset_0_0_0_1px_var(--border-default)]">
          <p className="text-xl font-bold text-console-warn">Project Notes</p>
          <p className="mt-3 text-sm leading-relaxed text-console-text">{song.notes}</p>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-3 text-sm font-medium text-console-text-muted">More by this artist</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/music/${r.id}`}
                className="w-32 shrink-0 rounded-[var(--radius-control)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-console-accent"
              >
                <CoverArt url={r.cover_art_url} title={r.title} size={16} />
                <p className="mt-1.5 truncate text-xs text-console-text">{r.title}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
