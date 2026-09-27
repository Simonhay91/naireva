import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProcedureBySlug } from "@/lib/queries";
import { PageHero } from "@/components/ui/PageHero";
import { renderSimpleMarkdown } from "@/lib/simple-markdown";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localized } from "@/lib/i18n/localized";
import { buildAlternates } from "@/lib/i18n/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const procedure = await getProcedureBySlug(params.slug);
  if (!procedure) return {};
  const locale = getLocale();
  return {
    title: procedure.seoTitle || procedure.title,
    description: procedure.seoDescription || procedure.shortDescription,
    // English + Russian only — this page's body only has *Ru translations today.
    alternates: buildAlternates(locale, `/procedures/${procedure.slug}`, ["en", "ru"])
  };
}

export default async function ProcedureDetailPage({ params }: { params: { slug: string } }) {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const procedure = await getProcedureBySlug(params.slug);
  if (!procedure) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: procedure.title,
    description: procedure.shortDescription,
    bodyLocation: "Nose",
    procedureType: "https://schema.org/PercutaneousProcedure"
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        breadcrumb={[
          { label: dict.common.home, href: "/" },
          { label: dict.procedures.breadcrumb, href: "/procedures" },
          { label: localized(locale, procedure.title, procedure.titleRu) }
        ]}
        kicker={`${localized(locale, procedure.title, procedure.titleRu)} · ${dict.nav.armenia}`}
        title={
          <>
            {dict.procedureDetail.titleLine1}
            <br />
            {dict.procedureDetail.titleLine2}
          </>
        }
        lead={localized(locale, procedure.shortDescription, procedure.shortDescriptionRu)}
      />
      <section className="section pt-0">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <aside className="h-fit border-t border-line text-sm text-[#6b655f] lg:sticky lg:top-28">
            {dict.procedureDetail.checklist.map((item) => (
              <div key={item} className="border-b border-line py-4">
                {item}
              </div>
            ))}
          </aside>
          <div className="max-w-[820px]">
            {renderSimpleMarkdown(localized(locale, procedure.content, procedure.contentRu))}
            <Link href="/consultation" className="btn-wine mt-10 inline-flex">
              {dict.common.requestConsultation}
            </Link>
          </div>
        </div>
      </section>

      {procedure.faqs.length > 0 && (
        <section className="section bg-paper">
          <div className="wrap max-w-3xl">
            <p className="kicker">{dict.procedureDetail.faqKicker}</p>
            <h2 className="font-serif text-[clamp(30px,4.5vw,44px)]">{dict.procedureDetail.faqTitle}</h2>
            <div className="mt-8 divide-y divide-line">
              {procedure.faqs.map((faq) => (
                <details key={faq.id} className="group py-5">
                  <summary className="cursor-pointer list-none font-medium text-ink marker:hidden">
                    {localized(locale, faq.question, faq.questionRu)}
                  </summary>
                  <p className="mt-3 text-muted">{localized(locale, faq.answer, faq.answerRu)}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
