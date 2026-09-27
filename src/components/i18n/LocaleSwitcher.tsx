"use client";

import { useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { locales, defaultLocale, type Locale } from "@/lib/i18n/dictionaries";
import { LOCALE_COOKIE } from "@/lib/i18n/cookie";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  es: "ES",
  ar: "AR"
};

/** Strips a leading /ru, /es or /ar prefix (see middleware.ts) to recover the unprefixed path. */
function stripLocalePrefix(pathname: string): string {
  const match = pathname.match(/^\/(ru|es|ar)(\/.*)?$/);
  if (!match) return pathname;
  return match[2] || "/";
}

export function LocaleSwitcher({ current, label = "Language" }: { current: Locale; label?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [pending, startTransition] = useTransition();

  function setLocale(locale: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    const bare = stripLocalePrefix(pathname);
    const target = locale === defaultLocale ? bare : `/${locale}${bare === "/" ? "" : bare}`;
    startTransition(() => router.push(target));
  }

  return (
    <select
      aria-label={label}
      disabled={pending}
      value={current}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className="rounded-full border border-line bg-transparent px-2.5 py-1 text-[11px] uppercase tracking-wide text-ink transition hover:border-ink focus:outline-none disabled:opacity-50"
    >
      {locales.map((l) => (
        <option key={l} value={l}>
          {LOCALE_LABELS[l]}
        </option>
      ))}
    </select>
  );
}
