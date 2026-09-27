import { cookies } from "next/headers";
import { defaultLocale, locales, type Locale } from "./dictionaries";
import { LOCALE_COOKIE } from "./cookie";

/** Server-side read only. Never infers a non-English default from geo/IP — see spec §16. */
export function getLocale(): Locale {
  const cookie = cookies().get(LOCALE_COOKIE)?.value;
  if (cookie && locales.includes(cookie as Locale)) return cookie as Locale;
  return defaultLocale;
}
