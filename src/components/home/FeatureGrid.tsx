import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function FeatureGrid({ dict }: { dict: Dictionary }) {
  const items = [
    { href: "/procedures", dark: true, ...dict.home.features.procedures },
    { href: "/transformations", dark: false, ...dict.home.features.transformations },
    { href: "/surgeon", dark: false, ...dict.home.features.surgeon },
    { href: "/armenia", dark: true, ...dict.home.features.armenia }
  ];

  return (
    <section className="section pt-0">
      <div className="wrap grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item, i) => (
          <Reveal key={item.href} delay={i * 80}>
            <Link
              href={item.href}
              className={
                item.dark
                  ? "flex min-h-[300px] flex-col justify-end rounded-3xl bg-charcoal-soft p-8 text-white transition hover:-translate-y-1"
                  : "flex min-h-[300px] flex-col justify-end rounded-3xl border border-line bg-paper p-8 transition hover:-translate-y-1"
              }
            >
              <p className={item.dark ? "kicker !text-gold-light" : "kicker"}>{item.kicker}</p>
              <h3 className="font-serif text-[30px]">{item.title}</h3>
              <p className={item.dark ? "mt-2 text-[#aaa]" : "mt-2 text-muted"}>{item.body}</p>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
