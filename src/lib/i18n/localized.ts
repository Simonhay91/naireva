import type { Locale } from "./dictionaries";

/**
 * Picks the translated value for DB-driven content (Procedure, Surgeon,
 * BlogPost, FAQ, BeforeAfterCase) when a column for the current locale has
 * been filled in, otherwise falls back to the English field. Every `*Ru`
 * (and, once added, `*Es`/`*Ar`) column in prisma/schema.prisma is nullable
 * for exactly this reason — a missing translation degrades to English
 * instead of showing blank content. `es`/`ar` are optional positional
 * params so every existing 3-arg call site keeps degrading to English
 * until its model actually grows Es/Ar columns.
 */
export function localized(locale: Locale, en: string, ru?: string | null, es?: string | null, ar?: string | null): string {
  if (locale === "ru" && ru) return ru;
  if (locale === "es" && es) return es;
  if (locale === "ar" && ar) return ar;
  return en;
}

const INTL_LOCALES: Record<Locale, string> = { en: "en-US", ru: "ru-RU", es: "es-ES", ar: "ar-SA" };

/** Maps our app Locale to an Intl-compatible tag for date/number formatting. */
export function intlLocale(locale: Locale): string {
  return INTL_LOCALES[locale];
}

export function localizedOrNull(
  locale: Locale,
  en?: string | null,
  ru?: string | null,
  es?: string | null,
  ar?: string | null
): string | null {
  if (locale === "ru" && ru) return ru;
  if (locale === "es" && es) return es;
  if (locale === "ar" && ar) return ar;
  return en ?? null;
}
