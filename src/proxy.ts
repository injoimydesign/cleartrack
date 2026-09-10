import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Every admin route needs a session — PRD §7: "Signed-out visitors can see
// the public landing page and the sign-in page only." There's no public
// landing page yet (that's Phase 8), so "/" stays open for now.
//
// /music is protected per PRD §7 ("clicking a song while signed out sends
// the visitor to the sign-in page"), but /browse is deliberately NOT in
// this list — PRD §8 wants signed-out visitors to see a (simpler) card
// grid there. That page branches its own rendering by session instead of
// being gated here.
const PROTECTED_PREFIXES = [
  "/songs",
  "/writers",
  "/labels",
  "/publishers",
  "/pros",
  "/artists",
  "/search",
  "/music",
  "/saved",
  "/folders",
  "/profile",
  "/users",
];

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Standard @supabase/ssr middleware pattern: refresh the session cookie
  // on every request. Without this, sessions can go stale since Server
  // Components can't write cookies themselves — only middleware, Route
  // Handlers, and Server Actions can.
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = PROTECTED_PREFIXES.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix),
  );

  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth";
    url.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
