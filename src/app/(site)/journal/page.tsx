import type { Metadata } from "next";
import { PageHero } from "@/components/ui/PageHero";
import { JournalCard } from "@/components/journal/JournalCard";
import { getPublishedPosts } from "@/lib/queries";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildAlternates } from "@/lib/i18n/seo";

export const dynamic = "force-dynamic";

export function generateMetadata(): Metadata {
  const locale = getLocale();
  const { seo } = getDictionary(locale);
  return {
    title: seo.journal.title,
    description: seo.journal.description,
    alternates: buildAlternates(locale, "/journal")
  };
}

export default async function JournalPage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const t = dict.journalPage;
  const posts = await getPublishedPosts();

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
          {posts.map((post, i) => (
            <JournalCard key={post.id} post={post} index={i} locale={locale} dict={dict} />
          ))}
          {!posts.length && <p className="text-muted">{t.emptyState}</p>}
        </div>
      </section>
    </>
  );
}
