import type { Dictionary } from "@/lib/i18n/dictionaries";

export function TrustBar({ dict }: { dict: Dictionary }) {
  return (
    <section className="mx-3 mt-3 overflow-hidden rounded-[28px] bg-[#2d2926] sm:mx-5 sm:rounded-[32px] lg:mx-[4vw]">
      <div className="grid grid-cols-2 gap-px bg-[#2d2926] lg:grid-cols-4">
        {dict.home.trust.map((item, i) => (
          <div key={item} className="bg-charcoal p-5 text-white sm:p-6">
            <b className="block text-[11px] tracking-[0.14em] text-gold">{String(i + 1).padStart(2, "0")}</b>
            <span className="mt-1 block text-[13px] text-[#d6d0ca]">{item}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
