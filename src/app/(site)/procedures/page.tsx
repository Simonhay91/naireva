import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
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
    title: seo.procedures.title,
    description: seo.procedures.description,
    alternates: buildAlternates(locale, "/procedures")
  };
}

export default async function ProceduresPage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.procedures;
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
        <div className="wrap grid grid-cols-1 gap-4 md:grid-cols-2">
          {procedures.map((proc, i) => (
            <Link
              key={proc.id}
              href={`/procedures/${proc.slug}`}
              className={
                i === 0
                  ? "flex min-h-[300px] flex-col justify-end rounded-3xl bg-charcoal-soft p-8 text-white transition hover:-translate-y-1"
                  : "flex min-h-[300px] flex-col justify-end rounded-3xl border border-line bg-paper p-8 transition hover:-translate-y-1"
              }
            >
              <p className={i === 0 ? "kicker !text-gold-light" : "kicker"}>{String(i + 1).padStart(2, "0")}</p>
              <h3 className="font-serif text-[30px]">{localized(locale, proc.title, proc.titleRu)}</h3>
              <p className={i === 0 ? "mt-2 text-[#aaa]" : "mt-2 text-muted"}>
                {localized(locale, proc.shortDescription, proc.shortDescriptionRu)}
              </p>
            </Link>
          ))}
          <div className="flex min-h-[300px] flex-col justify-end rounded-3xl border border-dashed border-line p-8">
            <p className="kicker">{t.comingLater.kicker}</p>
            <h3 className="font-serif text-[30px]">{t.comingLater.title}</h3>
            <p className="mt-2 text-muted">{t.comingLater.body}</p>
          </div>
        </div>
      </section>
    </>
  );
}
