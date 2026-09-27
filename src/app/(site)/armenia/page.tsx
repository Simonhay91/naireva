import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { ArmeniaTeaser } from "@/components/home/ArmeniaTeaser";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Armenia",
  description: "Armenia is part of the experience, not just the treatment location — Yerevan, culture and optional private experiences around recovery.",
  alternates: { canonical: "/armenia" }
};

export default function ArmeniaPage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.armeniaPage;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: dict.common.home, href: "/" }, { label: t.breadcrumb }]}
        kicker={t.kicker}
        title={
          <>
            {t.titleLine1}
            <br />
            {t.titleLine2}
          </>
        }
        lead={t.lead}
      />
      <section className="section pt-0">
        <div className="wrap grid grid-cols-1 gap-4 sm:grid-cols-3">
          {t.cards.map((c, i) => (
            <Reveal key={c.num} delay={i * 100}>
              <div className="h-full rounded-3xl border border-line bg-paper p-7">
                <span className="text-[11px] tracking-[0.16em] text-wine">{c.num}</span>
                <h3 className="mt-3 font-serif text-[26px]">{c.title}</h3>
                <p className="mt-2 text-muted">{c.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <ArmeniaTeaser dict={dict} />
    </>
  );
}
