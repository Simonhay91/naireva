import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Privacy",
  alternates: { canonical: "/privacy" },
  robots: { index: false }
};

export default function PrivacyPage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.privacyPage;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: dict.common.home, href: "/" }, { label: t.breadcrumb }]}
        kicker={t.kicker}
        title={t.title}
        lead={t.lead}
      />
      <section className="section pt-0">
        <div className="wrap max-w-3xl space-y-8 text-[17px] leading-[1.75] text-[#504b46]">
          <div className="rounded-2xl border border-wine/30 bg-wine/5 p-6 text-sm text-wine">
            <strong>{t.noticeTitle}</strong> {t.notice}
          </div>

          {t.sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-serif text-2xl">{s.title}</h2>
              <p className="mt-3">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
