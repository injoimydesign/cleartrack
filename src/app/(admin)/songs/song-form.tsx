"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { CoverArt } from "@/components/shared/cover-art";
import { SearchableSelect, type SearchableOption } from "@/components/admin/searchable-select";
import { RowPicker, SplitTotalBadge, type PickerRow } from "@/components/admin/row-picker";
import { createArtistInline } from "@/app/(admin)/artists/actions";
import { createLabelInline } from "@/app/(admin)/labels/actions";
import { createPublisherInline } from "@/app/(admin)/publishers/actions";
import { fetchSpotifyCoverArt, fetchSpotifyPublisher } from "@/app/(admin)/songs/spotify-actions";
import { formatWriterInfoLine, type WriterMeta } from "@/lib/format-writer";
import { NewWriterDialog } from "@/components/admin/new-writer-dialog";
import type { SelectOption } from "@/components/admin/multi-select-dropdown";

const fieldClasses =
  "w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent";

export function SongForm({
  defaultValues,
  referenceData,
  action,
  submitLabel,
}: {
  defaultValues?: {
    title: string;
    cover_art_url: string | null;
    notes: string | null;
    publisher: SearchableOption | null;
    spotify_track_id: string | null;
    artists: SearchableOption[];
    writers: { id: string; splitPercent: string }[];
    labels: { id: string; splitPercent: string }[];
  };
  referenceData: {
    artists: SearchableOption[];
    writers: WriterMeta[];
    labels: SearchableOption[];
    publishers: SearchableOption[];
    pros: SelectOption[];
  };
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  const [title, setTitle] = useState(defaultValues?.title ?? "");
  const [coverArtUrl, setCoverArtUrl] = useState(defaultValues?.cover_art_url ?? "");
  const [spotifyTrackId, setSpotifyTrackId] = useState(defaultValues?.spotify_track_id ?? "");
  const [publisherOptions, setPublisherOptions] = useState(referenceData.publishers);
  const [publisherId, setPublisherId] = useState<string | null>(
    defaultValues?.publisher?.id ?? null,
  );

  // Local copy so a writer created via the "New writer" modal shows up
  // immediately (options + info line) without a page refresh.
  const [writerMetaList, setWriterMetaList] = useState<WriterMeta[]>(referenceData.writers);
  const [pendingWriterCreate, setPendingWriterCreate] = useState<{
    name: string;
    rowIndex: number;
  } | null>(null);

  const [artistRows, setArtistRows] = useState<PickerRow[]>(
    defaultValues?.artists.length
      ? defaultValues.artists.map((a) => ({ id: a.id, splitPercent: "" }))
      : [{ id: null, splitPercent: "" }],
  );
  const [writerRows, setWriterRows] = useState<PickerRow[]>(
    defaultValues?.writers.length ? defaultValues.writers : [{ id: null, splitPercent: "" }],
  );
  const [labelRows, setLabelRows] = useState<PickerRow[]>(
    defaultValues?.labels.length ? defaultValues.labels : [{ id: null, splitPercent: "" }],
  );

  const [isFetchingCover, startFetchingCover] = useTransition();
  const [isFetchingPublisher, startFetchingPublisher] = useTransition();

  const artistNames = artistRows
    .map((r) => referenceData.artists.find((a) => a.id === r.id)?.name)
    .filter((n): n is string => Boolean(n));

  function handleFetchCoverArt() {
    startFetchingCover(async () => {
      const result = await fetchSpotifyCoverArt(title, artistNames);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setCoverArtUrl(result.coverArtUrl ?? "");
      setSpotifyTrackId(result.spotifyTrackId);
      toast.success("Cover art updated from Spotify.");
    });
  }

  function handleFetchPublisher() {
    startFetchingPublisher(async () => {
      const result = await fetchSpotifyPublisher(title, artistNames);
      if (!result.ok) {
        toast.error(result.error);
        return;
      }
      setPublisherOptions((prev) =>
        prev.some((p) => p.id === result.publisher.id) ? prev : [...prev, result.publisher],
      );
      setPublisherId(result.publisher.id);
      toast.success(
        result.created
          ? `Added publisher: ${result.publisher.name}`
          : `Matched: ${result.publisher.name}`,
      );
    });
  }

  const writerOptions: SearchableOption[] = writerMetaList.map((w) => ({
    id: w.id,
    name: w.name,
  }));

  return (
    <form action={action} className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <div className="grid gap-6">
        <section className="rounded-[var(--radius-panel)] border border-console-border bg-console-panel p-5">
          <h2 className="mb-4 text-base font-semibold">Song</h2>
          <div className="grid gap-4">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm text-console-text-muted">
                Title
              </label>
              <input
                id="title"
                name="title"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={fieldClasses}
                placeholder="Song title"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-console-text-muted">
                Song publisher
              </label>
              <SearchableSelect
                options={publisherOptions}
                value={publisherId}
                onChange={setPublisherId}
                placeholder="Select publisher…"
                createAction={createPublisherInline}
              />
              <button
                type="button"
                disabled={!title.trim() || isFetchingPublisher}
                onClick={handleFetchPublisher}
                className="mt-2 inline-flex items-center gap-1.5 rounded-[var(--radius-pill)] border border-console-accent px-3 py-1.5 text-sm font-medium text-console-accent hover:bg-console-action/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isFetchingPublisher && <Loader2 size={14} className="animate-spin" aria-hidden />}
                {isFetchingPublisher ? "Searching Spotify…" : "Fetch from Spotify"}
              </button>
              <input type="hidden" name="publisher_id" value={publisherId ?? ""} />
            </div>

            <div>
              <label htmlFor="cover_art_url" className="mb-1 block text-sm text-console-text-muted">
                Cover art
              </label>
              <div className="flex items-center gap-3">
                <CoverArt url={coverArtUrl || null} title={title || "Song"} />
                <div className="grid flex-1 gap-2">
                  <input
                    id="cover_art_url"
                    name="cover_art_url"
                    type="url"
                    value={coverArtUrl}
                    onChange={(e) => setCoverArtUrl(e.target.value)}
                    className={fieldClasses}
                    placeholder="Image URL, or fetch from Spotify"
                  />
                  <button
                    type="button"
                    disabled={!title.trim() || isFetchingCover}
                    onClick={handleFetchCoverArt}
                    className="inline-flex w-fit items-center gap-1.5 rounded-[var(--radius-pill)] border border-console-accent px-3 py-1.5 text-sm font-medium text-console-accent hover:bg-console-action/10 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isFetchingCover && <Loader2 size={14} className="animate-spin" aria-hidden />}
                    {isFetchingCover ? "Searching Spotify…" : "Fetch from Spotify"}
                  </button>
                </div>
              </div>
              <input type="hidden" name="spotify_track_id" value={spotifyTrackId} />
            </div>

            <div>
              <h3 className="mb-2 text-sm text-console-text-muted">Audio preview</h3>
              {spotifyTrackId ? (
                <iframe
                  src={`https://open.spotify.com/embed/track/${spotifyTrackId}`}
                  width="100%"
                  height="152"
                  style={{ borderRadius: "var(--radius-control)" }}
                  frameBorder={0}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify audio preview"
                />
              ) : (
                <p className="text-sm text-console-text-muted">No preview available.</p>
              )}
            </div>

            <div>
              <label htmlFor="notes" className="mb-1 block text-sm text-console-text-muted">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                defaultValue={defaultValues?.notes ?? ""}
                className={fieldClasses}
                placeholder="Anything a coordinator should know about clearing this song."
              />
            </div>
          </div>
        </section>

        <section className="rounded-[var(--radius-panel)] border border-console-border bg-console-panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">Writers &amp; splits</h2>
            <SplitTotalBadge rows={writerRows} />
          </div>
          <RowPicker
            rows={writerRows}
            onChange={setWriterRows}
            options={writerOptions}
            withSplit
            onRequestCreate={(name, rowIndex) => setPendingWriterCreate({ name, rowIndex })}
            addLabel="Add writer"
            placeholder="Select writer…"
            rowInfo={(id) => {
              const writer = writerMetaList.find((w) => w.id === id);
              return writer ? formatWriterInfoLine(writer) : null;
            }}
          />
          <input
            type="hidden"
            name="writers_json"
            value={JSON.stringify(
              writerRows
                .filter((r) => r.id)
                .map((r) => ({ id: r.id, splitPercent: parseFloat(r.splitPercent) || 0 })),
            )}
          />
        </section>

        <section className="rounded-[var(--radius-panel)] border border-console-border bg-console-panel p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-base font-semibold">Labels &amp; splits</h2>
            <SplitTotalBadge rows={labelRows} />
          </div>
          <RowPicker
            rows={labelRows}
            onChange={setLabelRows}
            options={referenceData.labels}
            withSplit
            createAction={createLabelInline}
            addLabel="Add label"
            placeholder="Select label…"
          />
          <input
            type="hidden"
            name="labels_json"
            value={JSON.stringify(
              labelRows
                .filter((r) => r.id)
                .map((r) => ({ id: r.id, splitPercent: parseFloat(r.splitPercent) || 0 })),
            )}
          />
        </section>
      </div>

      <div className="grid content-start gap-6">
        <section className="rounded-[var(--radius-panel)] border border-console-border bg-console-panel p-5">
          <h2 className="mb-4 text-base font-semibold">Artists</h2>
          <RowPicker
            rows={artistRows}
            onChange={setArtistRows}
            options={referenceData.artists}
            withSplit={false}
            createAction={createArtistInline}
            addLabel="Add artist"
            placeholder="Select artist…"
          />
          <input
            type="hidden"
            name="artist_ids"
            value={JSON.stringify(artistRows.filter((r) => r.id).map((r) => r.id))}
          />
        </section>

        <button
          type="submit"
          className="rounded-[var(--radius-pill)] bg-console-action px-5 py-2 text-sm font-medium text-console-text hover:brightness-125"
        >
          {submitLabel}
        </button>
      </div>

      {pendingWriterCreate && (
        <NewWriterDialog
          open
          initialName={pendingWriterCreate.name}
          publishers={publisherOptions}
          pros={referenceData.pros}
          onOpenChange={(nextOpen) => {
            if (!nextOpen) setPendingWriterCreate(null);
          }}
          onPublisherCreated={(publisher) =>
            setPublisherOptions((prev) =>
              prev.some((p) => p.id === publisher.id) ? prev : [...prev, publisher],
            )
          }
          onCreated={(writer) => {
            setWriterMetaList((prev) => [...prev, writer]);
            setWriterRows((rows) =>
              rows.map((r, i) =>
                i === pendingWriterCreate.rowIndex ? { ...r, id: writer.id } : r,
              ),
            );
            toast.success(`Added writer: ${writer.name}`);
            setPendingWriterCreate(null);
          }}
        />
      )}
    </form>
  );
}
