import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildAlternates } from "@/lib/i18n/seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  const { seo } = getDictionary(locale);
  return {
    title: seo.concierge.title,
    description: seo.concierge.description,
    alternates: buildAlternates(locale, "/concierge")
  };
}

export default function ConciergePage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.concierge;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: dict.common.home, href: "/" }, { label: t.breadcrumb }]}
        kicker={t.kicker}
        title={t.title}
        lead={t.lead}
      />
      <section className="section pt-0">
        <div className="wrap grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {t.services.map((s, i) => (
            <Reveal key={s.title} delay={i * 80}>
              <div className="h-full rounded-3xl border border-line bg-paper p-7">
                <h3 className="font-serif text-[24px] leading-tight">{s.title}</h3>
                <p className="mt-3 text-muted">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section bg-charcoal text-white">
        <div className="wrap max-w-2xl text-center">
          <p className="kicker !text-gold-light justify-center">{t.footerKicker}</p>
          <h2 className="font-serif text-[clamp(32px,5vw,52px)]">{t.footerTitle}</h2>
          <Link href="/consultation" className="btn-ghost mt-8 inline-flex">
            {t.footerCta}
          </Link>
        </div>
      </section>
    </>
  );
}
