import { locales, defaultLocale, type Locale } from "./dictionaries";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://naireva.com";

/** English stays unprefixed at its existing URLs; other locales get a crawlable /ru, /es, /ar prefix (see middleware.ts). */
export function localePath(locale: Locale, path: string): string {
  return locale === defaultLocale ? path : `/${locale}${path}`;
}

export function localeUrl(locale: Locale, path: string): string {
  return `${siteUrl}${localePath(locale, path)}`;
}

/**
 * Builds `alternates` for a page's metadata: a self-canonical for the current
 * locale plus hreflang `languages` for every locale the content actually
 * exists in. Pass `contentLocales` for DB-driven pages that only have
 * English/Russian columns today, so we don't advertise (and let Google index)
 * an Spanish/Arabic URL that silently renders English body copy.
 */
export function buildAlternates(currentLocale: Locale, path: string, contentLocales: Locale[] = locales) {
  const languages: Record<string, string> = { "x-default": localeUrl(defaultLocale, path) };
  for (const l of contentLocales) languages[l] = localeUrl(l, path);
  return {
    canonical: localeUrl(currentLocale, path),
    languages
  };
}
