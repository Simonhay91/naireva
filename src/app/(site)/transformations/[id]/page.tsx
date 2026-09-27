import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageHero } from "@/components/ui/PageHero";
import { CompareSlider } from "@/components/before-after/CompareSlider";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localized } from "@/lib/i18n/localized";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transformation case",
  robots: { index: false } // individual cases are browsed from the gallery, not indexed as thin pages
};

export default async function TransformationCasePage({ params }: { params: { id: string } }) {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.transformationDetail;

  const item = await db.beforeAfterCase.findFirst({
    where: { id: params.id, publishStatus: "PUBLISHED", consentStatus: "GRANTED" },
    include: { procedure: true, surgeon: true }
  });
  if (!item) notFound();

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: dict.common.home, href: "/" },
          { label: dict.transformations.breadcrumb, href: "/transformations" },
          { label: t.breadcrumb }
        ]}
        kicker={item.procedure ? localized(locale, item.procedure.title, item.procedure.titleRu) : dict.transformations.kicker}
        title={t.title}
      />
      <section className="section pt-0">
        <div className="wrap max-w-4xl">
          <CompareSlider
            beforeSrc={item.beforeImageUrl}
            afterSrc={item.afterImageUrl}
            beforeLabel={dict.compareSlider.before}
            afterLabel={dict.compareSlider.after}
            ariaLabel={dict.compareSlider.ariaLabel}
          />
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="kicker">{t.procedureLabel}</p>
              <p>{item.procedure ? localized(locale, item.procedure.title, item.procedure.titleRu) : "—"}</p>
            </div>
            <div>
              <p className="kicker">{t.surgeonLabel}</p>
              <p>{item.surgeon?.name ?? "—"}</p>
            </div>
            <div>
              <p className="kicker">{t.patientLabel}</p>
              <p>{item.patientAgeRange ? `${t.agePrefix} ${item.patientAgeRange}` : t.ageWithheld}</p>
            </div>
          </div>
          {item.caseNotes && <p className="mt-8 text-lg text-muted">{localized(locale, item.caseNotes, item.caseNotesRu)}</p>}
          <p className="mt-6 text-xs text-[#777]">{t.disclaimer}</p>
          <Link href="/consultation" className="btn-wine mt-10 inline-flex">
            {dict.common.requestConsultation}
          </Link>
        </div>
      </section>
    </>
  );
}
