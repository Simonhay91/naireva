import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/queries";
import { PageHero } from "@/components/ui/PageHero";
import { renderSimpleMarkdown } from "@/lib/simple-markdown";
import { formatDate } from "@/lib/utils";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { localized } from "@/lib/i18n/localized";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    alternates: { canonical: `/journal/${post.slug}` },
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
    author: post.author?.name ? { "@type": "Person", name: post.author.name } : { "@type": "Organization", name: "NAIREVA" }
  };

  const title = localized(locale, post.title, post.titleRu);
  const excerpt = localized(locale, post.excerpt, post.excerptRu);
  const body = localized(locale, post.body, post.bodyRu);

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
          {post.publishedAt && <p className="mt-3 text-xs text-[#9a938a]">{formatDate(post.publishedAt, locale === "ru" ? "ru-RU" : "en-US")}</p>}
          <div className="mt-2">{renderSimpleMarkdown(body)}</div>
        </div>
      </section>
    </>
  );
}
