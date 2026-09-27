import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function ConciergeTeaser({ dict }: { dict: Dictionary }) {
  const { kicker, title, lead, items, cta } = dict.home.concierge;

  return (
    <section className="section bg-charcoal text-white">
      <div className="wrap">
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="kicker !text-gold-light">{kicker}</p>
            <h2 className="font-serif text-[clamp(34px,5.5vw,58px)]">{title}</h2>
          </div>
          <p className="text-lg text-[#aaa]">{lead}</p>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-[#39332f] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full bg-charcoal p-7">
                <h3 className="font-serif text-[22px] leading-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-[#aaa]">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Link href="/concierge" className="btn-ghost mt-10 inline-flex">
          {cta}
        </Link>
      </div>
    </section>
  );
}
