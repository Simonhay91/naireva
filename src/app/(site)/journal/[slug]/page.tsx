import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/queries";
import { PageHero } from "@/components/ui/PageHero";
import { renderSimpleMarkdown } from "@/lib/simple-markdown";
import { formatDate } from "@/lib/utils";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localized, localizedOrNull, intlLocale } from "@/lib/i18n/localized";
import { buildAlternates } from "@/lib/i18n/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  const locale = getLocale();
  // Auto-generated posts are written in all four languages (see
  // src/lib/journal/generate.ts) — the original three seed posts are
  // English/Russian only. Advertise es/ar hreflang only when that post
  // actually has Spanish/Arabic content, so we never invite indexing of an
  // es/ar URL that would silently fall back to English.
  const contentLocales = post.titleEs && post.titleAr ? undefined : (["en", "ru"] as const);
  return {
    title:
      localizedOrNull(locale, post.seoTitle, post.seoTitleRu, post.seoTitleEs, post.seoTitleAr) ??
      localized(locale, post.title, post.titleRu, post.titleEs, post.titleAr),
    description:
      localizedOrNull(locale, post.seoDescription, post.seoDescriptionRu, post.seoDescriptionEs, post.seoDescriptionAr) ??
      localized(locale, post.excerpt, post.excerptRu, post.excerptEs, post.excerptAr),
    alternates: buildAlternates(locale, `/journal/${post.slug}`, contentLocales ? [...contentLocales] : undefined),
    openGraph: { images: post.heroImage ? [post.heroImage] : undefined }
  };
}

export default async function JournalArticlePage({ params }: { params: { slug: string } }) {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt?.toISOString(),
    dateModified: (post.updatedAt ?? post.publishedAt)?.toISOString(),
    author: post.author?.name ? { "@type": "Person", name: post.author.name } : { "@type": "Organization", name: "NAIREVA" }
  };

  const title = localized(locale, post.title, post.titleRu, post.titleEs, post.titleAr);
  const excerpt = localized(locale, post.excerpt, post.excerptRu, post.excerptEs, post.excerptAr);
  const body = localized(locale, post.body, post.bodyRu, post.bodyEs, post.bodyAr);

  const wasUpdated = post.publishedAt && post.updatedAt.getTime() - post.publishedAt.getTime() > 60_000;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHero
        breadcrumb={[{ label: dict.journalPage.breadcrumb, href: "/journal" }, { label: dict.categories[post.category] }]}
        kicker={dict.categories[post.category]}
        title={title}
      />
      <section className="section pt-0">
        <div className="wrap max-w-[820px]">
          <p className="text-lg text-muted">{excerpt}</p>
          <p className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-xs text-[#9a938a]">
            {post.author?.name && <span>{dict.journalPage.byAuthor.replace("{name}", post.author.name)}</span>}
            {post.publishedAt && <span>{formatDate(post.publishedAt, intlLocale(locale))}</span>}
            {wasUpdated && <span>{dict.journalPage.updated.replace("{date}", formatDate(post.updatedAt, intlLocale(locale)))}</span>}
          </p>
          <div className="mt-2">{renderSimpleMarkdown(body)}</div>
        </div>
      </section>
    </>
  );
}
