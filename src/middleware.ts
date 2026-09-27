import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { locales, defaultLocale, type Locale } from "./lib/i18n/dictionaries";
import { LOCALE_COOKIE } from "./lib/i18n/cookie";

const PREFIXED_LOCALES = locales.filter((l) => l !== defaultLocale) as Locale[];

/**
 * Forwards the current pathname as a request header so the root layout can
 * tell public (localized) pages apart from /admin (always English/LTR,
 * regardless of the visitor's `naireva_locale` cookie) without needing a
 * separate root layout per route group.
 *
 * Also gives non-English locales a real, crawlable URL prefix (/ru, /es, /ar)
 * without duplicating every page file: a request for /ru/procedures is
 * rewritten internally to /procedures with an `x-locale` header set to "ru",
 * so search engines get distinct, indexable per-locale URLs while English
 * keeps its existing unprefixed URLs unchanged.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const headers = new Headers(request.headers);
  headers.set("x-pathname", pathname);

  const segments = pathname.split("/");
  const maybeLocale = segments[1] as Locale | undefined;

  const nextSegment = segments[2];
  if (maybeLocale && PREFIXED_LOCALES.includes(maybeLocale) && nextSegment !== "admin" && nextSegment !== "api") {
    const rest = "/" + segments.slice(2).join("/");
    const url = request.nextUrl.clone();
    url.pathname = rest.replace(/\/+$/, "") || "/";
    headers.set("x-locale", maybeLocale);
    headers.set("x-pathname", url.pathname);
    const response = NextResponse.rewrite(url, { request: { headers } });
    response.cookies.set(LOCALE_COOKIE, maybeLocale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
    return response;
  }

  headers.set("x-locale", defaultLocale);
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|opengraph-image|icon).*)"]
};
