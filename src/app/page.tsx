import Link from "next/link";

// Placeholder root route. The real public landing page (PRD §8) and the
// route restructure that moves the admin catalog under /songs behind auth
// both land in Phase 10 — this just points at the admin catalog for now
// so Phase 1 has somewhere to land after `npm run dev`.
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-console-bg text-console-text">
      <p className="font-mono text-sm text-console-accent">CLEARTRACK</p>
      <p className="text-sm text-console-text-muted">
        Public landing page arrives in Phase 10.
      </p>
      <Link href="/songs" className="text-sm text-console-accent hover:underline">
        Go to the catalog admin →
      </Link>
    </main>
  );
}
