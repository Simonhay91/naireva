import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function FinalCta({ dict }: { dict: Dictionary }) {
  const { kicker, title, lead, cta } = dict.home.finalCta;

  return (
    <section className="section text-center">
      <div className="wrap max-w-2xl">
        <p className="kicker justify-center">{kicker}</p>
        <h2 className="font-serif text-[clamp(36px,5.5vw,58px)]">{title}</h2>
        <p className="mt-5 text-lg text-muted">{lead}</p>
        <Link href="/consultation" className="btn-wine mt-8 inline-flex">
          {cta}
        </Link>
      </div>
    </section>
  );
}
