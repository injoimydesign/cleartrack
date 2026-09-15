"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Popover as PopoverPrimitive } from "radix-ui";
import { FolderPlus, BookmarkCheck } from "lucide-react";
import { Checkbox } from "@/components/admin/checkbox";
import {
  createFolderAndAdd,
  getFolderMembership,
  toggleFolderSong,
} from "@/app/(customer)/folders/actions";

/**
 * PRD §7: "Save controls show 'Sign in to View' when signed out" — that
 * part is a real, functioning link. PRD §9: signed-in, this opens a
 * folder picker — select existing folders or create one on the spot,
 * both of which persist immediately (no separate save step).
 */
export function SaveControls({
  songId,
  signedIn,
  variant = "pill",
}: {
  songId: string;
  signedIn: boolean;
  /** "pill" — compact, used on song cards. "button" — full action-row button, used on the song detail page. */
  variant?: "pill" | "button";
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [folders, setFolders] = useState<{ id: string; name: string }[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [newFolderName, setNewFolderName] = useState("");
  const [isPending, startTransition] = useTransition();

  if (!signedIn) {
    return variant === "button" ? (
      <Link
        href="/auth"
        className="inline-flex h-[42px] items-center gap-2 rounded-[var(--radius-control)] px-4 text-sm text-console-text shadow-[inset_0_0_0_1px_var(--border-default)] hover:border-console-accent"
      >
        <FolderPlus size={15} aria-hidden />
        Sign in to View
      </Link>
    ) : (
      <Link
        href="/auth"
        className="inline-block rounded-[var(--radius-pill)] border border-console-border px-3 py-1 text-xs text-console-text-muted hover:border-console-accent hover:text-console-accent"
      >
        Sign in to View
      </Link>
    );
  }

  async function handleOpenChange(next: boolean) {
    setOpen(next);
    if (next && folders.length === 0) {
      setLoading(true);
      try {
        const result = await getFolderMembership(songId);
        setFolders(result.folders);
        setSelected(new Set(result.selectedFolderIds));
      } finally {
        setLoading(false);
      }
    }
  }

  function toggle(folderId: string) {
    const shouldContain = !selected.has(folderId);
    setSelected((prev) => {
      const next = new Set(prev);
      if (shouldContain) {
        next.add(folderId);
      } else {
        next.delete(folderId);
      }
      return next;
    });
    startTransition(async () => {
      try {
        await toggleFolderSong(folderId, songId, shouldContain);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Couldn't update folder.");
      }
    });
  }

  function handleCreateAndAdd() {
    const name = newFolderName.trim();
    if (!name) return;
    startTransition(async () => {
      try {
        const created = await createFolderAndAdd(name, songId);
        setFolders((prev) => [...prev, created]);
        setSelected((prev) => new Set(prev).add(created.id));
        setNewFolderName("");
        toast.success(`Saved to "${created.name}"`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Couldn't create folder.");
      }
    });
  }

  const savedCount = selected.size;

  return (
    <PopoverPrimitive.Root open={open} onOpenChange={handleOpenChange}>
      <PopoverPrimitive.Trigger asChild>
        {variant === "button" ? (
          <button
            type="button"
            className="inline-flex h-[42px] items-center gap-2 rounded-[var(--radius-control)] bg-console-action px-4 text-sm text-console-text shadow-[inset_0_0_0_1px_var(--border-default)] hover:brightness-125"
          >
            {savedCount > 0 ? <BookmarkCheck size={15} aria-hidden /> : <FolderPlus size={15} aria-hidden />}
            {savedCount > 0 ? "Saved to Folder" : "Save to Folder"}
          </button>
        ) : (
          <button
            type="button"
            className={`inline-block rounded-[var(--radius-pill)] border px-3 py-1 text-xs ${
              savedCount > 0
                ? "border-console-accent text-console-accent"
                : "border-console-border text-console-text-muted hover:border-console-accent hover:text-console-accent"
            }`}
          >
            {savedCount > 0 ? `Saved (${savedCount})` : "Save"}
          </button>
        )}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Content
          align="end"
          sideOffset={4}
          className="z-50 w-64 rounded-[var(--radius-control)] border border-console-border bg-console-panel p-3 shadow-lg"
        >
          <p className="mb-2 text-xs text-console-text-muted">Save to folder</p>

          {loading ? (
            <p className="py-3 text-center text-xs text-console-text-muted">Loading…</p>
          ) : (
            <div className="mb-3 max-h-40 space-y-1.5 overflow-y-auto">
              {folders.length === 0 && (
                <p className="text-xs text-console-text-muted">No folders yet.</p>
              )}
              {folders.map((folder) => (
                <label key={folder.id} className="flex items-center gap-2 text-sm">
                  <Checkbox
                    checked={selected.has(folder.id)}
                    onCheckedChange={() => toggle(folder.id)}
                    ariaLabel={`Add to ${folder.name}`}
                  />
                  <span className="truncate text-console-text">{folder.name}</span>
                </label>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <input
              type="text"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder="New folder…"
              className="min-w-0 flex-1 rounded-[var(--radius-control)] border border-console-border bg-console-bg px-2 py-1 text-xs text-console-text placeholder:text-console-text-muted"
            />
            <button
              type="button"
              onClick={handleCreateAndAdd}
              disabled={!newFolderName.trim() || isPending}
              className="rounded-[var(--radius-pill)] bg-console-action px-2.5 py-1 text-xs font-medium text-console-text hover:brightness-125 disabled:opacity-50"
            >
              Add
            </button>
          </div>
        </PopoverPrimitive.Content>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
}
