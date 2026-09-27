"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LOCALE_COOKIE } from "@/lib/i18n/cookie";
import type { Dictionary, Locale } from "@/lib/i18n/dictionaries";

const LANG_PREFIXES: { locale: Exclude<Locale, "en">; prefixes: string[] }[] = [
  { locale: "ru", prefixes: ["ru", "hy", "kk", "uz", "be", "ky", "tg"] },
  { locale: "es", prefixes: ["es"] },
  { locale: "ar", prefixes: ["ar"] }
];

/**
 * Client-only, non-authoritative suggestion — never changes rendered locale
 * on its own. Reads navigator.language, and if it matches a supported
 * locale and no explicit choice is stored yet, offers a one-tap switch.
 * Spec §16: "Do NOT force locale purely from IP without user control."
 */
export function LocaleSuggestionBanner({ current, banner }: { current: Locale; banner: Dictionary["localeBanner"] }) {
  const router = useRouter();
  const [suggested, setSuggested] = useState<Exclude<Locale, "en"> | null>(null);

  useEffect(() => {
    if (current !== "en") return;
    if (document.cookie.includes(`${LOCALE_COOKIE}=`)) return;
    if (sessionStorage.getItem("naireva_locale_prompt_dismissed")) return;

    const lang = navigator.language?.toLowerCase() ?? "";
    const match = LANG_PREFIXES.find(({ prefixes }) => prefixes.some((p) => lang.startsWith(p)));
    if (match) setSuggested(match.locale);
  }, [current]);

  if (!suggested) return null;
  const text = banner[suggested];

  function accept() {
    document.cookie = `${LOCALE_COOKIE}=${suggested}; path=/; max-age=${60 * 60 * 24 * 365}`;
    setSuggested(null);
    router.refresh();
  }

  function dismiss() {
    sessionStorage.setItem("naireva_locale_prompt_dismissed", "1");
    setSuggested(null);
  }

  return (
    <div className="fixed bottom-5 left-1/2 z-[60] w-[92%] max-w-md -translate-x-1/2 rounded-2xl border border-line bg-paper px-5 py-4 shadow-[0_18px_50px_rgba(23,21,19,0.18)]">
      <p className="text-sm text-ink">{text.question}</p>
      <div className="mt-3 flex gap-3">
        <button onClick={accept} className="rounded-full bg-wine px-4 py-2 text-xs font-semibold text-white">
          {text.accept}
        </button>
        <button onClick={dismiss} className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-ink">
          {text.dismiss}
        </button>
      </div>
    </div>
  );
}
