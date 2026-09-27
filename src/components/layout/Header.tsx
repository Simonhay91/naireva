"use client";

import { useState } from "react";
import Link from "next/link";
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries";
import { LocaleSwitcher } from "@/components/i18n/LocaleSwitcher";
import { cn } from "@/lib/utils";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: "/procedures", label: dict.nav.procedures },
    { href: "/surgeon", label: dict.nav.surgeon },
    { href: "/transformations", label: dict.nav.transformations },
    { href: "/journey", label: dict.nav.journey },
    { href: "/armenia", label: dict.nav.armenia },
    { href: "/concierge", label: dict.nav.concierge },
    { href: "/journal", label: dict.nav.journal }
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-ivory/95 backdrop-blur-md">
      <div className="flex h-[72px] items-center justify-between px-6 sm:px-10 lg:px-[5vw]">
        <Link href="/" className="text-[17px] font-semibold tracking-[0.28em]">
          NAIREVA
        </Link>

        <nav className="hidden items-center gap-7 text-[13px] text-ink/70 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-wine">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <LocaleSwitcher current={locale} label={dict.common.language} />
          <Link href="/consultation" className="border-b border-ink pb-1 text-[13px] font-medium">
            {dict.nav.consultation}
          </Link>
        </div>

        <button
          aria-label={dict.common.menu}
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-9 w-9 items-center justify-center lg:hidden"
        >
          <span
            className={cn(
              "absolute h-px w-5 bg-ink transition-transform duration-300",
              open ? "rotate-45" : "-translate-y-[6px]"
            )}
          />
          <span className={cn("absolute h-px w-5 bg-ink transition-opacity duration-300", open && "opacity-0")} />
          <span
            className={cn(
              "absolute h-px w-5 bg-ink transition-transform duration-300",
              open ? "-rotate-45" : "translate-y-[6px]"
            )}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-ivory px-6 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col gap-5 text-[15px]">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center justify-between">
            <LocaleSwitcher current={locale} label={dict.common.language} />
            <Link
              href="/consultation"
              onClick={() => setOpen(false)}
              className="btn-wine"
            >
              {dict.nav.consultation}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
