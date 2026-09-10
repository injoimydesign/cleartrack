"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/admin/checkbox";

export type BulkListRow = {
  id: string;
  primary: string;
  secondary?: string;
  meta?: string;
};

/**
 * Shared list table for every admin catalog page (Songs, Artists, Writers,
 * Labels, Publishers, PROs) — PRD §3 asks for row checkboxes, "select all",
 * and a bulk action bar on every one of them, so this lives once here
 * rather than being rebuilt per entity.
 */
export function BulkList({
  rows,
  detailHrefBase,
  onBulkDelete,
  emptyLabel = "Nothing here yet.",
}: {
  rows: BulkListRow[];
  detailHrefBase: string;
  onBulkDelete: (ids: string[]) => Promise<void>;
  emptyLabel?: string;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [isPending, startTransition] = useTransition();

  const allSelected = rows.length > 0 && selected.size === rows.length;
  const hasSecondary = rows.some((r) => r.secondary !== undefined);
  const hasMeta = rows.some((r) => r.meta !== undefined);

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));
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
    if (
      !window.confirm(
        `Delete ${count} selected item${count === 1 ? "" : "s"}? This can't be undone.`,
      )
    ) {
      return;
    }
    const ids = Array.from(selected);
    startTransition(async () => {
      await onBulkDelete(ids);
      setSelected(new Set());
    });
  }

  if (rows.length === 0) {
    return (
      <div className="rounded-[var(--radius-panel)] border border-console-border px-6 py-10 text-center text-sm text-console-text-muted">
        {emptyLabel}
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
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b border-console-border text-left text-console-text-muted">
            <th className="w-8 py-2">
              <Checkbox checked={allSelected} onCheckedChange={toggleAll} ariaLabel="Select all" />
            </th>
            <th className="py-2 pr-4 font-normal">Name</th>
            {hasSecondary && <th className="py-2 pr-4 font-normal">Details</th>}
            {hasMeta && <th className="py-2 pr-4 font-normal" />}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-console-border/60 hover:bg-console-panel"
            >
              <td className="py-2.5">
                <Checkbox
                  checked={selected.has(row.id)}
                  onCheckedChange={() => toggleOne(row.id)}
                  ariaLabel={`Select ${row.primary}`}
                />
              </td>
              <td className="max-w-xs truncate py-2.5 pr-4" title={row.primary}>
                <Link
                  href={`${detailHrefBase}/${row.id}`}
                  className="font-medium text-console-accent hover:underline"
                >
                  {row.primary}
                </Link>
              </td>
              {hasSecondary && (
                <td className="py-2.5 pr-4 text-console-text-muted">
                  {row.secondary ?? "—"}
                </td>
              )}
              {hasMeta && (
                <td className="py-2.5 pr-4">
                  <span className="inline-block rounded-[var(--radius-pill)] bg-console-border/60 px-2.5 py-0.5 text-xs text-console-text-muted">
                    {row.meta}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
