import Link from "next/link";
import { createAdminClient } from "@/lib/supabase/admin";
import { deleteLabels } from "./actions";
import { BulkList } from "@/components/admin/bulk-list";
import { ErrorBanner } from "@/components/admin/error-banner";

export const dynamic = "force-dynamic";

export default async function LabelsPage() {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("labels")
    .select("id, name")
    .order("name", { ascending: true });

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">Labels</h1>
        <Link
          href="/labels/new"
          className="rounded-[var(--radius-pill)] bg-console-accent px-4 py-1.5 text-sm font-medium text-console-bg hover:bg-console-accent-strong"
        >
          Add label
        </Link>
      </div>

      {error && <ErrorBanner message={`Couldn't load labels: ${error.message}`} />}

      {!error && (
        <BulkList
          rows={(data ?? []).map((row) => ({ id: row.id, primary: row.name }))}
          detailHrefBase="/labels"
          onBulkDelete={deleteLabels}
          emptyLabel="No labels in the catalog yet."
        />
      )}
    </div>
  );
}
