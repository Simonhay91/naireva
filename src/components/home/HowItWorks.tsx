import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function HowItWorks({ dict }: { dict: Dictionary }) {
  const { kicker, title, lead, steps } = dict.home.howItWorks;

  return (
    <section className="section">
      <div className="wrap">
        <p className="kicker">{kicker}</p>
        <div className="grid items-end gap-8 md:grid-cols-2">
          <h2 className="font-serif text-[clamp(38px,5.5vw,64px)]">{title}</h2>
          <p className="lead max-w-xl text-lg text-muted">{lead}</p>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 100}>
              <div className="h-full rounded-3xl border border-line bg-paper p-7">
                <span className="text-[11px] tracking-[0.16em] text-wine">{s.num}</span>
                <h3 className="mt-3 font-serif text-[26px]">{s.title}</h3>
                <p className="mt-2 text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
