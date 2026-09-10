"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { createFolder, deleteFolder } from "@/app/(customer)/folders/actions";

export type FolderRow = { id: string; name: string; songCount: number };

export function FoldersClient({ initialFolders }: { initialFolders: FolderRow[] }) {
  const [folders, setFolders] = useState(initialFolders);
  const [newName, setNewName] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleCreate() {
    const name = newName.trim();
    if (!name) return;
    startTransition(async () => {
      try {
        const created = await createFolder(name);
        setFolders((prev) => [...prev, { id: created.id, name: created.name, songCount: 0 }]);
        setNewName("");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Couldn't create folder.");
      }
    });
  }

  function handleDelete(id: string) {
    if (!window.confirm("Delete this folder? Songs in it won't be deleted, just removed from it.")) {
      return;
    }
    startTransition(async () => {
      try {
        await deleteFolder(id);
        setFolders((prev) => prev.filter((f) => f.id !== id));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Couldn't delete folder.");
      }
    });
  }

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder="New folder name…"
          className="flex-1 rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent"
        />
        <button
          type="button"
          onClick={handleCreate}
          disabled={!newName.trim() || isPending}
          className="rounded-[var(--radius-pill)] bg-console-accent px-4 py-2 text-sm font-medium text-console-bg hover:bg-console-accent-strong disabled:opacity-50"
        >
          Create folder
        </button>
      </div>

      {folders.length === 0 ? (
        <p className="rounded-[var(--radius-panel)] border border-console-border p-6 text-sm text-console-text-muted">
          No folders yet.
        </p>
      ) : (
        <div className="rounded-[var(--radius-panel)] border border-console-border divide-y divide-console-border">
          {folders.map((folder) => (
            <div key={folder.id} className="flex items-center justify-between px-4 py-2.5">
              <Link
                href={`/folders/${folder.id}`}
                className="truncate text-sm text-console-text hover:text-console-accent"
              >
                {folder.name}
              </Link>
              <div className="flex items-center gap-3">
                <span className="rounded-[var(--radius-pill)] bg-console-border/60 px-2.5 py-0.5 text-xs text-console-text-muted">
                  {folder.songCount} song{folder.songCount === 1 ? "" : "s"}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(folder.id)}
                  className="text-xs text-console-text-muted hover:text-console-warn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
