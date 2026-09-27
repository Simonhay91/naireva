"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { locales, type Locale } from "@/lib/i18n/dictionaries";
import { LOCALE_COOKIE } from "@/lib/i18n/cookie";

const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  es: "ES",
  ar: "AR"
};

export function LocaleSwitcher({ current, label = "Language" }: { current: Locale; label?: string }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function setLocale(locale: Locale) {
    document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}`;
    startTransition(() => router.refresh());
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
