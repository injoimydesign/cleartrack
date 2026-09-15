"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { setUserRole, removeUser, type AdminUserRow } from "@/app/(admin)/users/actions";

export function UsersListClient({
  initialUsers,
  currentUserId,
}: {
  initialUsers: AdminUserRow[];
  currentUserId: string;
}) {
  const [users, setUsers] = useState(initialUsers);
  const [isPending, startTransition] = useTransition();

  function toggleRole(u: AdminUserRow) {
    const nextRole = u.role === "admin" ? "member" : "admin";
    startTransition(async () => {
      try {
        await setUserRole(u.id, nextRole);
        setUsers((prev) => prev.map((x) => (x.id === u.id ? { ...x, role: nextRole } : x)));
        toast.success(`${u.email} is now ${nextRole}.`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Couldn't change role.");
      }
    });
  }

  function handleRemove(u: AdminUserRow) {
    if (!window.confirm(`Remove ${u.email}? This can't be undone.`)) return;
    startTransition(async () => {
      try {
        await removeUser(u.id);
        setUsers((prev) => prev.filter((x) => x.id !== u.id));
        toast.success(`${u.email} removed.`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Couldn't remove user.");
      }
    });
  }

  return (
    <div className="rounded-[var(--radius-panel)] border border-console-border divide-y divide-console-border">
      {users.map((u) => (
        <div key={u.id} className="flex items-center justify-between gap-3 px-4 py-2.5">
          <div className="min-w-0 flex-1">
            <Link
              href={`/users/${u.id}`}
              className="truncate text-sm text-console-accent hover:underline"
            >
              {u.display_name || u.email}
            </Link>
            <p className="truncate text-xs text-console-text-muted">{u.email}</p>
          </div>

          {u.locked && (
            <span className="rounded-[var(--radius-pill)] border border-console-warn/40 px-2 py-0.5 text-xs text-console-warn">
              Locked
            </span>
          )}

          <button
            type="button"
            onClick={() => toggleRole(u)}
            disabled={isPending}
            className={`rounded-[var(--radius-pill)] px-2.5 py-0.5 text-xs font-medium disabled:opacity-50 ${
              u.role === "admin"
                ? "bg-console-action text-console-text"
                : "border border-console-border text-console-text-muted hover:border-console-accent hover:text-console-accent"
            }`}
          >
            {u.role === "admin" ? "Admin" : "Member"}
          </button>

          {u.id !== currentUserId && (
            <button
              type="button"
              onClick={() => handleRemove(u)}
              disabled={isPending}
              className="text-xs text-console-text-muted hover:text-console-warn disabled:opacity-50"
            >
              Remove
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
