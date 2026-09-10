import Link from "next/link";
import { signIn, signUp } from "@/app/auth/actions";

const fieldClasses =
  "w-full rounded-[var(--radius-control)] border border-console-border bg-console-bg px-3 py-2 text-sm text-console-text placeholder:text-console-text-muted focus:border-console-accent";

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{
    mode?: string;
    error?: string;
    notice?: string;
    redirectTo?: string;
  }>;
}) {
  const { mode: modeParam, error, notice, redirectTo } = await searchParams;
  const mode = modeParam === "sign-up" ? "sign-up" : "sign-in";

  return (
    <div className="flex min-h-screen items-center justify-center bg-console-bg px-4">
      <div className="w-full max-w-sm rounded-[var(--radius-panel)] border border-console-border bg-console-panel p-6">
        <p className="mb-1 font-mono text-sm text-console-accent">CLEARTRACK</p>
        <h1 className="mb-6 text-lg font-semibold text-console-text">
          {mode === "sign-up" ? "Create an account" : "Sign in"}
        </h1>

        {notice && (
          <p className="mb-4 rounded-[var(--radius-control)] border border-console-ok/40 bg-console-ok/10 px-3 py-2 text-sm text-console-ok">
            {notice}
          </p>
        )}
        {error && (
          <p className="mb-4 rounded-[var(--radius-control)] border border-console-warn/40 bg-console-warn/10 px-3 py-2 text-sm text-console-warn">
            {error}
          </p>
        )}

        {mode === "sign-up" ? (
          <form action={signUp} className="space-y-4">
            <div>
              <label htmlFor="display_name" className="mb-1 block text-sm text-console-text-muted">
                Display name (optional)
              </label>
              <input
                id="display_name"
                name="display_name"
                className={fieldClasses}
                placeholder="Jamie Rivera"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-console-text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={fieldClasses}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm text-console-text-muted">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                minLength={6}
                className={fieldClasses}
                placeholder="At least 6 characters"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-[var(--radius-pill)] bg-console-accent px-4 py-2 text-sm font-medium text-console-bg hover:bg-console-accent-strong"
            >
              Create account
            </button>
          </form>
        ) : (
          <form action={signIn} className="space-y-4">
            <input type="hidden" name="redirect_to" value={redirectTo ?? ""} />
            <div>
              <label htmlFor="email" className="mb-1 block text-sm text-console-text-muted">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={fieldClasses}
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-1 block text-sm text-console-text-muted">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={fieldClasses}
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-[var(--radius-pill)] bg-console-accent px-4 py-2 text-sm font-medium text-console-bg hover:bg-console-accent-strong"
            >
              Sign in
            </button>
          </form>
        )}

        <p className="mt-5 text-center text-sm text-console-text-muted">
          {mode === "sign-up" ? (
            <>
              Already have an account?{" "}
              <Link href="/auth?mode=sign-in" className="text-console-accent hover:underline">
                Sign in
              </Link>
            </>
          ) : (
            <>
              New here?{" "}
              <Link href="/auth?mode=sign-up" className="text-console-accent hover:underline">
                Create an account
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
