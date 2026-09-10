"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/admin/checkbox";
import { CoverArt } from "@/components/shared/cover-art";
import { sumSplits } from "@/lib/sum-splits";

export type SongListRow = {
  id: string;
  title: string;
  cover_art_url: string | null;
  artistNames: string[];
  writers: { name: string; split_percent: number }[];
  labels: { name: string; split_percent: number }[];
};

function splitClass(total: number) {
  return Math.abs(total - 100) < 0.005 ? "text-console-ok" : "text-console-warn";
}

export function SongListPanel({
  songs,
  emptyMessage,
  onBulkDelete,
}: {
  songs: SongListRow[];
  emptyMessage: string;
  onBulkDelete: (ids: string[]) => Promise<void>;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const allSelected = songs.length > 0 && selected.size === songs.length;

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(songs.map((s) => s.id)));
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleBulkDelete() {
    if (selected.size === 0) return;
    const count = selected.size;
    if (!window.confirm(`Delete ${count} selected song${count === 1 ? "" : "s"}? This can't be undone.`)) {
      return;
    }
    const ids = Array.from(selected);
    startTransition(async () => {
      await onBulkDelete(ids);
      setSelected(new Set());
    });
  }

  if (songs.length === 0) {
    return (
      <div className="rounded-[var(--radius-panel)] border border-console-border px-6 py-10 text-center text-sm text-console-text-muted">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div>
      {selected.size > 0 && (
        <div className="mb-3 flex items-center justify-between rounded-[var(--radius-control)] border border-console-accent/40 bg-console-accent/10 px-3 py-2 text-sm">
          <span>{selected.size} selected</span>
          <button
            type="button"
            onClick={handleBulkDelete}
            disabled={isPending}
            className="rounded-[var(--radius-control)] border border-console-warn/40 px-3 py-1 text-console-warn hover:bg-console-warn/10 disabled:opacity-50"
          >
            {isPending ? "Deleting…" : "Delete selected"}
          </button>
        </div>
      )}

      <div className="rounded-[var(--radius-panel)] border border-console-border divide-y divide-console-border">
        <label className="flex items-center gap-3 px-4 py-2.5 text-xs text-console-text-muted">
          <Checkbox checked={allSelected} onCheckedChange={toggleAll} ariaLabel="Select all songs" />
          Select all
        </label>

        {songs.map((song) => {
          const writerTotal = sumSplits(song.writers.map((w) => ({ split_percent: w.split_percent })));
          const labelTotal = sumSplits(song.labels.map((l) => ({ split_percent: l.split_percent })));
          return (
            <div key={song.id} className="flex items-center transition-colors hover:bg-console-border/30">
              <div className="pl-4">
                <Checkbox
                  checked={selected.has(song.id)}
                  onCheckedChange={() => toggleOne(song.id)}
                  ariaLabel={`Select ${song.title}`}
                />
              </div>
              <Link
                href={`/songs/${song.id}`}
                className="flex min-w-0 flex-1 items-center gap-4 px-4 py-3"
              >
                <CoverArt url={song.cover_art_url} title={song.title} size={12} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-console-text">{song.title}</p>
                  <p className="truncate text-sm text-console-text-muted">
                    {song.artistNames.join(", ") || "No artist yet"}
                    {" · "}
                    {song.writers.map((w) => w.name).join(", ") || "No writers yet"}
                  </p>
                </div>
                <div className="hidden max-w-56 flex-wrap justify-end gap-1 lg:flex">
                  {song.labels.map((l) => (
                    <span
                      key={l.name}
                      className="rounded-[var(--radius-pill)] bg-console-border/60 px-2.5 py-0.5 text-xs text-console-text-muted"
                    >
                      {l.name}
                    </span>
                  ))}
                </div>
                <div className="hidden w-32 shrink-0 text-right text-xs md:block">
                  <p className={splitClass(writerTotal)}>writers {writerTotal.toFixed(0)}%</p>
                  <p className={splitClass(labelTotal)}>labels {labelTotal.toFixed(0)}%</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
