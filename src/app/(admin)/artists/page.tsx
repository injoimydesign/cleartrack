import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { deleteArtists } from "./actions";
import { BulkList } from "@/components/admin/bulk-list";
import { ErrorBanner } from "@/components/admin/error-banner";

export const dynamic = "force-dynamic";

export default async function ArtistsPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("artists")
    .select("id, name")
    .order("name", { ascending: true });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">Artists</h1>
        <Link
          href="/artists/new"
          className="rounded-[var(--radius-pill)] bg-console-action px-4 py-1.5 text-sm font-medium text-console-text hover:brightness-125"
        >
          Add artist
        </Link>
      </div>

      {error && <ErrorBanner message={`Couldn't load artists: ${error.message}`} />}

      {!error && (
        <BulkList
          rows={(data ?? []).map((row) => ({ id: row.id, primary: row.name }))}
          detailHrefBase="/artists"
          onBulkDelete={deleteArtists}
          emptyLabel="No artists in the catalog yet."
        />
      )}
    </div>
  );
}
