import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";

export default async function SongsPage() {
  const supabase = createAdminClient();
  const { data: songs, error } = await supabase
    .from("songs")
    .select("id, title, notes, updated_at")
    .order("updated_at", { ascending: false });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">Songs</h1>
        <Link
          href="/songs/new"
          className="rounded-[var(--radius-control)] bg-console-accent px-3 py-1.5 text-sm font-medium text-console-bg hover:bg-console-accent/90"
        >
          Add song
        </Link>
      </div>

      {error && (
        <p className="rounded-[var(--radius-panel)] border border-console-warn/40 bg-console-warn/10 px-4 py-3 text-sm text-console-warn">
          Couldn&apos;t load songs: {error.message}
        </p>
      )}

      {!error && songs && songs.length === 0 && (
        <div className="rounded-[var(--radius-panel)] border border-console-border px-6 py-10 text-center">
          <p className="text-sm text-console-text-muted">
            No songs in the catalog yet.
          </p>
          <Link
            href="/songs/new"
            className="mt-3 inline-block text-sm text-console-accent hover:underline"
          >
            Add the first one
          </Link>
        </div>
      )}

      {!error && songs && songs.length > 0 && (
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-console-border text-left text-console-text-muted">
              <th className="py-2 pr-4 font-normal">Title</th>
              <th className="py-2 pr-4 font-normal">Notes</th>
              <th className="py-2 pr-4 font-normal">Updated</th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song) => (
              <tr
                key={song.id}
                className="border-b border-console-border/60 hover:bg-console-panel"
              >
                <td className="py-2.5 pr-4">
                  <Link href={`/songs/${song.id}`} className="hover:text-console-accent">
                    {song.title}
                  </Link>
                </td>
                <td className="py-2.5 pr-4 text-console-text-muted">
                  {song.notes ?? "—"}
                </td>
                <td className="py-2.5 pr-4 font-mono text-xs text-console-text-muted">
                  {new Date(song.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
