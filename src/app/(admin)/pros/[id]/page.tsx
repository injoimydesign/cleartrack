import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { deletePros, updatePro } from "@/app/(admin)/pros/actions";
import { NameEntityForm } from "@/components/admin/name-entity-form";

export const dynamic = "force-dynamic";

export default async function ProDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = createAdminClient();
  const { data: entity } = await supabase
    .from("pros")
    .select("id, name")
    .eq("id", id)
    .maybeSingle();

  if (!entity) {
    notFound();
  }

  const updateWithId = updatePro.bind(null, entity.id);
  const deleteWithId = deletePros.bind(null, [entity.id]);

  return (
    <div>
      <Link
        href="/pros"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← PROs
      </Link>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-lg font-medium">{entity.name}</h1>
        <form action={deleteWithId}>
          <button
            type="submit"
            className="rounded-[var(--radius-control)] border border-console-warn/40 px-3 py-1.5 text-sm text-console-warn hover:bg-console-warn/10"
          >
            Delete
          </button>
        </form>
      </div>

      <NameEntityForm
        defaultName={entity.name}
        action={updateWithId}
        submitLabel="Save changes"
        placeholder="PRO name (e.g. ASCAP)"
      />
    </div>
  );
}
