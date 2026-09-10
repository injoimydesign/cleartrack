import Link from "next/link";
import { createPublisher } from "@/app/(admin)/publishers/actions";
import { NameEntityForm } from "@/components/admin/name-entity-form";

export default function NewPublisherPage() {
  return (
    <div>
      <Link
        href="/publishers"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Publishers
      </Link>
      <h1 className="mb-6 text-lg font-medium">Add publisher</h1>
      <NameEntityForm
        action={createPublisher}
        submitLabel="Add publisher"
        placeholder="Publisher name"
      />
    </div>
  );
}
