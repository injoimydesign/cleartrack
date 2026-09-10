"use client";

import { useState, useTransition } from "react";
import { Dialog as DialogPrimitive } from "radix-ui";
import { MultiSelectDropdown, type SelectOption } from "@/components/admin/multi-select-dropdown";
import { SearchableSelect, type SearchableOption } from "@/components/admin/searchable-select";
import { createWriterFull } from "@/app/(admin)/writers/actions";
import { createPublisherInline } from "@/app/(admin)/publishers/actions";
import type { WriterMeta } from "@/lib/format-writer";

const fieldClasses =
  "w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent";

export function NewWriterDialog({
  open,
  initialName,
  publishers,
  pros,
  onOpenChange,
  onCreated,
  onPublisherCreated,
}: {
  open: boolean;
  initialName: string;
  publishers: SearchableOption[];
  pros: SelectOption[];
  onOpenChange: (open: boolean) => void;
  onCreated: (writer: WriterMeta) => void;
  onPublisherCreated?: (publisher: SearchableOption) => void;
}) {
  const [name, setName] = useState(initialName);
  const [publisherId, setPublisherId] = useState<string | null>(null);
  const [proIds, setProIds] = useState<string[]>([]);
  const [publisherProIds, setPublisherProIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  async function createPublisherAndNotify(publisherName: string) {
    const created = await createPublisherInline(publisherName);
    onPublisherCreated?.(created);
    return created;
  }

  function handleSave() {
    const trimmed = name.trim();
    if (!trimmed) return;
    startTransition(async () => {
      const created = await createWriterFull({
        name: trimmed,
        publisherId,
        proIds,
        publisherProIds,
      });
      onCreated({
        id: created.id,
        name: created.name,
        proNames: pros.filter((p) => proIds.includes(p.id)).map((p) => p.name),
        publisherName: publishers.find((p) => p.id === publisherId)?.name ?? null,
        publisherProNames: pros
          .filter((p) => publisherProIds.includes(p.id))
          .map((p) => p.name),
      });
    });
  }

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-black/60" />
        <DialogPrimitive.Content className="fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-panel)] border border-console-border bg-console-panel p-6 shadow-xl focus:outline-none">
          <DialogPrimitive.Title className="text-base font-semibold">
            New writer
          </DialogPrimitive.Title>
          <DialogPrimitive.Description className="mt-1 text-sm text-console-text-muted">
            These details belong to the writer and follow them onto every
            song. Only the split % is entered per song.
          </DialogPrimitive.Description>

          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="new-writer-name" className="mb-1 block text-sm text-console-text-muted">
                Name
              </label>
              <input
                id="new-writer-name"
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClasses}
                placeholder="e.g. June Halloway"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-console-text-muted">
                Writer&apos;s PRO(s)
              </label>
              <MultiSelectDropdown
                options={pros}
                initialSelectedIds={[]}
                onSelectedChange={setProIds}
                placeholder="Select PROs…"
                searchPlaceholder="Search PROs…"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-console-text-muted">Publisher</label>
              <SearchableSelect
                options={publishers}
                value={publisherId}
                onChange={setPublisherId}
                placeholder="Select publisher…"
                createAction={createPublisherAndNotify}
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-console-text-muted">
                Publisher&apos;s PRO(s)
              </label>
              <MultiSelectDropdown
                options={pros}
                initialSelectedIds={[]}
                onSelectedChange={setPublisherProIds}
                placeholder="Select PROs…"
                searchPlaceholder="Search PROs…"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                className="rounded-[var(--radius-pill)] border border-console-border px-4 py-2 text-sm text-console-text hover:border-console-text-muted"
              >
                Cancel
              </button>
            </DialogPrimitive.Close>
            <button
              type="button"
              onClick={handleSave}
              disabled={!name.trim() || isPending}
              className="rounded-[var(--radius-pill)] bg-console-accent px-4 py-2 text-sm font-medium text-console-bg hover:bg-console-accent-strong disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isPending ? "Saving…" : "Save writer"}
            </button>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
