import Link from "next/link";
import { createPro } from "@/app/(admin)/pros/actions";
import { NameEntityForm } from "@/components/admin/name-entity-form";

export default function NewProPage() {
  return (
    <div>
      <Link
        href="/pros"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← PROs
      </Link>
      <h1 className="mb-6 text-lg font-medium">Add pro</h1>
      <NameEntityForm
        action={createPro}
        submitLabel="Add pro"
        placeholder="PRO name (e.g. ASCAP)"
      />
    </div>
  );
}
