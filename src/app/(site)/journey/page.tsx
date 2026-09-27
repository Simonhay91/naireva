import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Your Journey",
  description: "How a private aesthetic journey with NAIREVA actually works, from first request to your return home.",
  alternates: { canonical: "/journey" }
};

export default function JourneyPage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.journey;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: dict.common.home, href: "/" }, { label: t.breadcrumb }]}
        kicker={t.kicker}
        title={t.title}
        lead={t.lead}
      />
      <section className="bg-charcoal text-white">
        <div className="section wrap">
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl bg-[#39332f] sm:grid-cols-2 lg:grid-cols-3">
            {t.steps.map((s) => (
              <article key={s.num} className="bg-charcoal p-7">
                <b className="text-[11px] text-gold">{s.num}</b>
                <h3 className="mt-3 font-serif text-[26px]">{s.title}</h3>
                <p className="mt-2 text-sm text-[#ccc]">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section text-center">
        <div className="wrap">
          <Link href="/consultation" className="btn-wine inline-flex">
            {t.cta}
          </Link>
        </div>
      </section>
    </>
  );
}
