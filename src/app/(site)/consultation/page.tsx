import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { ConsultationForm } from "@/components/consultation/ConsultationForm";
import { getActiveProcedures } from "@/lib/queries";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localized } from "@/lib/i18n/localized";
import { buildAlternates } from "@/lib/i18n/seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  const { seo } = getDictionary(locale);
  return {
    title: seo.consultation.title,
    description: seo.consultation.description,
    alternates: buildAlternates(locale, "/consultation")
  };
}

export default async function ConsultationPage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.consultationPage;
  const procedures = await getActiveProcedures();

  return (
    <>
      <PageHero
        breadcrumb={[{ label: dict.common.home, href: "/" }, { label: t.breadcrumb }]}
        kicker={t.kicker}
        title={t.title}
        lead={t.lead}
      />
      <section className="section pt-0">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <h2 className="font-serif text-3xl">{t.formHeading}</h2>
            <p className="mt-4 max-w-sm text-muted">{t.formLead}</p>
          </div>
          <div className="relative">
            <ConsultationForm
              procedures={procedures.map((p) => ({ slug: p.slug, title: localized(locale, p.title, p.titleRu) }))}
              dict={dict}
            />
          </div>
        </div>
      </section>
    </>
  );
}
