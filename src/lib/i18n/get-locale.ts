import { cookies, headers } from "next/headers";
import { defaultLocale, locales, type Locale } from "./dictionaries";
import { LOCALE_COOKIE } from "./cookie";

/**
 * Server-side read only. Never infers a non-English default from geo/IP —
 * see spec §16. The `x-locale` header (set by middleware.ts from the /ru,
 * /es, /ar URL prefix) takes priority over the cookie so the URL a page was
 * actually requested at always wins — otherwise a stale cookie from an
 * earlier visit could make a page render in the wrong language for its own
 * canonical URL.
 */
export function getLocale(): Locale {
  const headerLocale = headers().get("x-locale");
  if (headerLocale && locales.includes(headerLocale as Locale)) return headerLocale as Locale;
  const cookie = cookies().get(LOCALE_COOKIE)?.value;
  if (cookie && locales.includes(cookie as Locale)) return cookie as Locale;
  return defaultLocale;
}
