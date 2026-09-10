"use client";

import { SearchableSelect, type SearchableOption } from "@/components/admin/searchable-select";

export type PickerRow = { id: string | null; splitPercent: string };

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0ZM12 9v4M12 17h.01" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SplitTotalBadge({ rows }: { rows: PickerRow[] }) {
  const total = rows.reduce((sum, r) => sum + (parseFloat(r.splitPercent) || 0), 0);
  const ok = Math.abs(total - 100) < 0.005;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-console-text-muted">Total</span>
      <span
        className={`rounded-[var(--radius-pill)] px-2 py-0.5 text-xs font-medium ${
          ok
            ? "bg-console-ok/15 text-console-ok"
            : "border border-console-warn/40 text-console-warn"
        }`}
      >
        {total.toFixed(2)}%
      </span>
      {!ok && (
        <span className="flex items-center gap-1 text-xs text-console-warn">
          <WarningIcon /> doesn&apos;t add up to 100% — you can still save
        </span>
      )}
    </div>
  );
}

export function RowPicker({
  rows,
  onChange,
  options,
  withSplit,
  createAction,
  onRequestCreate,
  addLabel,
  placeholder,
  rowInfo,
}: {
  rows: PickerRow[];
  onChange: (rows: PickerRow[]) => void;
  options: SearchableOption[];
  withSplit: boolean;
  createAction?: (name: string) => Promise<{ id: string; name: string }>;
  /** Escape hatch for richer creation (e.g. a modal) — see SearchableSelect. */
  onRequestCreate?: (name: string, rowIndex: number) => void;
  addLabel: string;
  placeholder: string;
  /** Optional extra line rendered under a row once it has a value selected
   * (used for the writer PRO/publisher info line). */
  rowInfo?: (id: string) => string | null;
}) {
  const selectedIds = rows.map((r) => r.id).filter((id): id is string => Boolean(id));

  function updateRow(index: number, patch: Partial<PickerRow>) {
    onChange(rows.map((r, i) => (i === index ? { ...r, ...patch } : r)));
  }

  function removeRow(index: number) {
    onChange(
      rows.length === 1 ? [{ id: null, splitPercent: "" }] : rows.filter((_, i) => i !== index),
    );
  }

  function addRow() {
    onChange([...rows, { id: null, splitPercent: "" }]);
  }

  return (
    <div className="grid gap-3">
      {rows.map((row, index) => {
        const info = row.id && rowInfo ? rowInfo(row.id) : null;
        const rowBody = (
          <div className="flex flex-wrap items-start gap-3">
            <div className="min-w-[200px] flex-1">
              <SearchableSelect
                options={options}
                value={row.id}
                exclude={selectedIds}
                onChange={(id) => updateRow(index, { id })}
                placeholder={placeholder}
                createAction={createAction}
                onRequestCreate={
                  onRequestCreate ? (name) => onRequestCreate(name, index) : undefined
                }
              />
            </div>
            {withSplit && (
              <div className="w-24">
                <input
                  inputMode="decimal"
                  value={row.splitPercent}
                  onChange={(e) => updateRow(index, { splitPercent: e.target.value })}
                  placeholder="% split"
                  className="w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-2 py-2 text-right text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => removeRow(index)}
              aria-label="Remove"
              className="rounded-[var(--radius-control)] p-2 text-console-text-muted hover:bg-console-warn/10 hover:text-console-warn"
            >
              <TrashIcon />
            </button>
          </div>
        );

        return rowInfo ? (
          <div key={index} className="rounded-[var(--radius-control)] border border-console-border p-3">
            {rowBody}
            {info && <p className="mt-2 break-words text-xs text-console-text-muted">{info}</p>}
          </div>
        ) : (
          <div key={index}>{rowBody}</div>
        );
      })}
      <button
        type="button"
        onClick={addRow}
        className="inline-flex w-fit items-center gap-1.5 rounded-[var(--radius-control)] border border-console-border px-3 py-1.5 text-sm text-console-text hover:border-console-accent hover:text-console-accent"
      >
        <PlusIcon /> {addLabel}
      </button>
    </div>
  );
}
