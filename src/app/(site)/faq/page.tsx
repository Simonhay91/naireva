import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { getActiveFaqs } from "@/lib/queries";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localized } from "@/lib/i18n/localized";
import { buildAlternates } from "@/lib/i18n/seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  const { seo } = getDictionary(locale);
  return {
    title: seo.faq.title,
    description: seo.faq.description,
    alternates: buildAlternates(locale, "/faq")
  };
}

export default async function FaqPage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.faqPage;
  const faqs = await getActiveFaqs();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  };

  return (
    <>
      {faqs.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      )}
      <PageHero
        breadcrumb={[{ label: dict.common.home, href: "/" }, { label: t.breadcrumb }]}
        kicker={t.kicker}
        title={t.title}
      />
      <section className="section pt-0">
        <div className="wrap max-w-3xl divide-y divide-line">
          {faqs.map((faq) => (
            <details key={faq.id} className="group py-6">
              <summary className="cursor-pointer list-none font-serif text-xl text-ink marker:hidden">
                {localized(locale, faq.question, faq.questionRu)}
              </summary>
              <p className="mt-3 text-muted">{localized(locale, faq.answer, faq.answerRu)}</p>
            </details>
          ))}
          {!faqs.length && <p className="py-6 text-muted">{t.emptyState}</p>}
        </div>
      </section>
    </>
  );
}
