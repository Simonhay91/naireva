import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function WhyChooseNaireva({ dict }: { dict: Dictionary }) {
  const { kicker, title, lead, items } = dict.home.whyChoose;

  return (
    <section className="section">
      <div className="wrap">
        <div className="mb-10 grid gap-6 md:grid-cols-2 md:items-end">
          <div>
            <p className="kicker">{kicker}</p>
            <h2 className="font-serif text-[clamp(34px,5.5vw,58px)]">{title}</h2>
          </div>
          <p className="text-lg text-muted">{lead}</p>
        </div>
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="h-full bg-paper p-7">
                <span className="text-xs tracking-[0.14em] text-wine">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-serif text-[20px] leading-tight">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
