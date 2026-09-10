import Link from "next/link";
import { createLabel } from "@/app/(admin)/labels/actions";
import { NameEntityForm } from "@/components/admin/name-entity-form";

export default function NewLabelPage() {
  return (
    <div>
      <Link
        href="/labels"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Labels
      </Link>
      <h1 className="mb-6 text-lg font-medium">Add label</h1>
      <NameEntityForm
        action={createLabel}
        submitLabel="Add label"
        placeholder="Label name"
      />
    </div>
  );
}
