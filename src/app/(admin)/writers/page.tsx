import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteWriters } from "./actions";
import { BulkList } from "@/components/admin/bulk-list";
import { ErrorBanner } from "@/components/admin/error-banner";

export const dynamic = "force-dynamic";

type WriterListRow = {
  id: string;
  name: string;
  song_writers: { count: number }[];
};

export default async function WritersPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("writers")
    .select("id, name, song_writers(count)")
    .order("name", { ascending: true })
    .returns<WriterListRow[]>();

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">Writers</h1>
        <Link
          href="/writers/new"
          className="rounded-[var(--radius-pill)] bg-console-accent px-4 py-1.5 text-sm font-medium text-console-bg hover:bg-console-accent-strong"
        >
          Add writer
        </Link>
      </div>

      {error && <ErrorBanner message={`Couldn't load writers: ${error.message}`} />}

      {!error && (
        <BulkList
          rows={(data ?? []).map((writer) => {
            const count = writer.song_writers[0]?.count ?? 0;
            return {
              id: writer.id,
              primary: writer.name,
              meta: `${count} song${count === 1 ? "" : "s"}`,
            };
          })}
          detailHrefBase="/writers"
          onBulkDelete={deleteWriters}
          emptyLabel="No writers in the catalog yet."
        />
      )}
    </div>
  );
}
