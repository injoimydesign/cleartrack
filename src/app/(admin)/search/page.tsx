import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { toPrefixTsQuery } from "@/lib/search";
import { CoverArt } from "@/components/shared/cover-art";

export const dynamic = "force-dynamic";

type NameHit = { id: string; name: string };
type SongHit = { id: string; title: string; cover_art_url: string | null };

function ResultSection({
  title,
  count,
  children,
}: {
  title: string;
  count: number;
  children: React.ReactNode;
}) {
  if (count === 0) return null;
  return (
    <section>
      <h2 className="mb-2 text-sm font-medium text-console-text-muted">
        {title} <span className="font-mono">({count})</span>
      </h2>
      <div className="rounded-[var(--radius-panel)] border border-console-border divide-y divide-console-border">
        {children}
      </div>
    </section>
  );
}

function NameHitRow({ href, name }: { href: string; name: string }) {
  return (
    <Link
      href={href}
      className="block truncate px-4 py-2.5 text-sm text-console-text hover:bg-console-border/30"
    >
      {name}
    </Link>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const tsQuery = toPrefixTsQuery(q);

  let songs: SongHit[] = [];
  let artists: NameHit[] = [];
  let writers: NameHit[] = [];
  let labels: NameHit[] = [];
  let publishers: NameHit[] = [];

  if (tsQuery) {
    const supabase = await createClient();
    const [songsRes, artistsRes, writersRes, labelsRes, publishersRes] = await Promise.all([
      supabase
        .from("songs")
        .select("id, title, cover_art_url")
        .textSearch("search_vector", tsQuery)
        .limit(20),
      supabase.from("artists").select("id, name").textSearch("search_vector", tsQuery).limit(20),
      supabase.from("writers").select("id, name").textSearch("search_vector", tsQuery).limit(20),
      supabase.from("labels").select("id, name").textSearch("search_vector", tsQuery).limit(20),
      supabase
        .from("publishers")
        .select("id, name")
        .textSearch("search_vector", tsQuery)
        .limit(20),
    ]);
    songs = songsRes.data ?? [];
    artists = artistsRes.data ?? [];
    writers = writersRes.data ?? [];
    labels = labelsRes.data ?? [];
    publishers = publishersRes.data ?? [];
  }

  const totalHits =
    songs.length + artists.length + writers.length + labels.length + publishers.length;

  return (
    <div>
      <h1 className="mb-1 text-lg font-medium">Search</h1>
      <p className="mb-6 text-sm text-console-text-muted">
        {q ? <>Results for &ldquo;{q}&rdquo;</> : "Search songs, artists, writers, labels, and publishers."}
      </p>

      {q && totalHits === 0 && (
        <div className="rounded-[var(--radius-panel)] border border-console-border px-6 py-10 text-center text-sm text-console-text-muted">
          No results for &ldquo;{q}&rdquo;.
        </div>
      )}

      <div className="grid gap-6">
        <ResultSection title="Songs" count={songs.length}>
          {songs.map((song) => (
            <Link
              key={song.id}
              href={`/songs/${song.id}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-console-border/30"
            >
              <CoverArt url={song.cover_art_url} title={song.title} size={12} />
              <span className="truncate text-sm text-console-text">{song.title}</span>
            </Link>
          ))}
        </ResultSection>

        <ResultSection title="Artists" count={artists.length}>
          {artists.map((artist) => (
            <NameHitRow key={artist.id} href={`/artists/${artist.id}`} name={artist.name} />
          ))}
        </ResultSection>

        <ResultSection title="Writers" count={writers.length}>
          {writers.map((writer) => (
            <NameHitRow key={writer.id} href={`/writers/${writer.id}`} name={writer.name} />
          ))}
        </ResultSection>

        <ResultSection title="Labels" count={labels.length}>
          {labels.map((label) => (
            <NameHitRow key={label.id} href={`/labels/${label.id}`} name={label.name} />
          ))}
        </ResultSection>

        <ResultSection title="Publishers" count={publishers.length}>
          {publishers.map((publisher) => (
            <NameHitRow
              key={publisher.id}
              href={`/publishers/${publisher.id}`}
              name={publisher.name}
            />
          ))}
        </ResultSection>
      </div>
    </div>
  );
}
