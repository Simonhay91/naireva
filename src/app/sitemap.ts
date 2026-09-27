import type { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { locales, type Locale } from "@/lib/i18n/dictionaries";
import { localeUrl } from "@/lib/i18n/seo";

export const dynamic = "force-dynamic";

// Fully authored in all four locales (site chrome + static copy) — safe to
// list a crawlable URL per locale for each of these.
const chromeRoutes = [
  "",
  "/procedures",
  "/rhinoplasty",
  "/transformations",
  "/journey",
  "/armenia",
  "/concierge",
  "/journal",
  "/consultation",
  "/faq"
];

// DB-driven content that currently only has English + Russian columns —
// Spanish/Arabic would render the same English body text, so we don't list
// (or invite indexing of) a separate es/ar URL for these until that content
// exists. /surgeon/[slug] is a duplicate of /surgeon and is intentionally
// left out entirely — see its own canonical in surgeon/[slug]/page.tsx.
// /privacy and /terms are `robots: { index: false }` by design and excluded
// from the sitemap for the same reason — no point listing a noindex page.
const contentLocales: Locale[] = ["en", "ru"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [procedures, posts] = await Promise.all([
    db.procedure.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    db.blogPost.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } })
  ]);

  const entries: MetadataRoute.Sitemap = [];

  chromeRoutes.forEach((path) => {
    locales.forEach((locale) => {
      entries.push({
        url: localeUrl(locale, path),
        changeFrequency: "weekly",
        priority: path === "" ? 1 : 0.7
      });
    });
  });

  contentLocales.forEach((locale) => {
    entries.push({ url: localeUrl(locale, "/surgeon"), changeFrequency: "weekly", priority: 0.7 });

    procedures.forEach((p) =>
      entries.push({
        url: localeUrl(locale, `/procedures/${p.slug}`),
        lastModified: p.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8
      })
    );

    posts.forEach((p) =>
      entries.push({
        url: localeUrl(locale, `/journal/${p.slug}`),
        lastModified: p.updatedAt,
        changeFrequency: "monthly",
        priority: 0.5
      })
    );
  });

  return entries;
}
