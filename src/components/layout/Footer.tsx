import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Footer({ dict }: { dict: Dictionary }) {
  return (
    <footer className="grid grid-cols-1 gap-10 border-t border-line px-6 py-12 text-[#665f59] sm:px-10 md:grid-cols-3 lg:px-[5vw]">
      <div>
        <div className="text-[16px] font-semibold tracking-[0.28em] text-ink">NAIREVA</div>
        <p className="mt-3 max-w-xs text-sm">{dict.footer.tagline}</p>
      </div>
      <div>
        <h4 className="mb-3 font-semibold text-ink">{dict.footer.explore}</h4>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/procedures">{dict.nav.procedures}</Link>
          <Link href="/surgeon">{dict.nav.surgeon}</Link>
          <Link href="/transformations">{dict.nav.transformations}</Link>
          <Link href="/armenia">{dict.nav.armenia}</Link>
        </div>
      </div>
      <div>
        <h4 className="mb-3 font-semibold text-ink">{dict.footer.contact}</h4>
        <div className="flex flex-col gap-2 text-sm">
          <Link href="/consultation">{dict.nav.consultation}</Link>
          <Link href="/journal">{dict.nav.journal}</Link>
          <Link href="/faq">{dict.nav.faq}</Link>
          <Link href="/privacy">{dict.footer.privacy}</Link>
          <Link href="/terms">{dict.footer.terms}</Link>
        </div>
      </div>
      <div className="md:col-span-3 border-t border-line pt-6 text-xs">
        © {new Date().getFullYear()} NAIREVA. {dict.footer.rights}
      </div>
    </footer>
  );
}
