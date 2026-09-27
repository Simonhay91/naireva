import type { MetadataRoute } from "next";
import { db } from "@/lib/db";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://naireva.com";

export const dynamic = "force-dynamic";

const staticRoutes = [
  "",
  "/procedures",
  "/rhinoplasty",
  "/surgeon",
  "/transformations",
  "/journey",
  "/armenia",
  "/concierge",
  "/journal",
  "/consultation",
  "/faq",
  "/privacy",
  "/terms"
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [procedures, posts] = await Promise.all([
    db.procedure.findMany({ where: { isActive: true }, select: { slug: true, updatedAt: true } }),
    db.blogPost.findMany({ where: { status: "PUBLISHED" }, select: { slug: true, updatedAt: true } })
  ]);

  const entries: MetadataRoute.Sitemap = staticRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.7
  }));

  procedures.forEach((p) => entries.push({ url: `${siteUrl}/procedures/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "monthly", priority: 0.8 }));
  posts.forEach((p) => entries.push({ url: `${siteUrl}/journal/${p.slug}`, lastModified: p.updatedAt, changeFrequency: "monthly", priority: 0.5 }));

  return entries;
}
