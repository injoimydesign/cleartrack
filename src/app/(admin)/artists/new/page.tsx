import Link from "next/link";
import { createArtist } from "@/app/(admin)/artists/actions";
import { NameEntityForm } from "@/components/admin/name-entity-form";

export default function NewArtistPage() {
  return (
    <div>
      <Link
        href="/artists"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Artists
      </Link>
      <h1 className="mb-6 text-lg font-medium">Add artist</h1>
      <NameEntityForm
        action={createArtist}
        submitLabel="Add artist"
        placeholder="Artist name"
      />
    </div>
  );
}
