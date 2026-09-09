import Link from "next/link";
import { createSong } from "@/app/songs/actions";
import { SongForm } from "@/app/songs/song-form";

export default function NewSongPage() {
  return (
    <div>
      <Link
        href="/songs"
        className="mb-4 inline-block text-sm text-console-text-muted hover:text-console-accent"
      >
        ← Songs
      </Link>
      <h1 className="mb-6 text-lg font-medium">Add song</h1>
      <SongForm action={createSong} submitLabel="Add song" />
    </div>
  );
}
