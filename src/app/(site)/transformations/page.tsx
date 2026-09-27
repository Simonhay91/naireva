import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryGrid } from "@/components/before-after/GalleryGrid";
import { getPublishedBeforeAfter } from "@/lib/queries";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Transformations",
  description: "Real, consented patient before-and-after cases from the surgical team. Individual outcomes vary.",
  alternates: { canonical: "/transformations" }
};

export default async function TransformationsPage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.transformations;
  const items = await getPublishedBeforeAfter();

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
        <div className="wrap">
          <GalleryGrid items={items} locale={locale} dict={dict} />
          <p className="mt-10 text-center text-xs text-[#777]">{t.disclaimer}</p>
        </div>
      </section>
    </>
  );
}
