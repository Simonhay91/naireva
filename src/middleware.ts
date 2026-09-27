import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Forwards the current pathname as a request header so the root layout can
 * tell public (localized) pages apart from /admin (always English/LTR,
 * regardless of the visitor's `naireva_locale` cookie) without needing a
 * separate root layout per route group.
 */
export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
