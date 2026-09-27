import { db } from "@/lib/db";

/** Read-only helpers shared by the public pages. Keeping them here avoids
 * scattering ad-hoc Prisma calls (and their `where` clauses for
 * active/published-only content) across every page file. */

export function getActiveSurgeon() {
  return db.surgeon.findFirst({
    where: { isActive: true },
    include: { images: { orderBy: { sortOrder: "asc" } }, videos: { orderBy: { sortOrder: "asc" } }, procedures: true },
    orderBy: { createdAt: "asc" }
  });
}

export function getSurgeonBySlug(slug: string) {
  return db.surgeon.findFirst({
    where: { slug, isActive: true },
    include: { images: { orderBy: { sortOrder: "asc" } }, videos: { orderBy: { sortOrder: "asc" } }, procedures: true }
  });
}

export function getActiveProcedures() {
  return db.procedure.findMany({ where: { isActive: true }, orderBy: { createdAt: "asc" } });
}

export function getProcedureBySlug(slug: string) {
  return db.procedure.findFirst({
    where: { slug, isActive: true },
    include: { faqs: { where: { isActive: true }, orderBy: { sortOrder: "asc" } }, surgeons: { where: { isActive: true } } }
  });
}

export function getPublishedBeforeAfter(procedureSlug?: string) {
  return db.beforeAfterCase.findMany({
    where: {
      publishStatus: "PUBLISHED",
      consentStatus: "GRANTED",
      ...(procedureSlug ? { procedure: { slug: procedureSlug } } : {})
    },
    include: { procedure: true, surgeon: true },
    orderBy: { createdAt: "desc" }
  });
}

export function getPublishedPosts(limit?: number) {
  return db.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: { publishedAt: "desc" },
    take: limit,
    include: { author: { select: { name: true } } }
  });
}

export function getPostBySlug(slug: string) {
  return db.blogPost.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: { author: { select: { name: true } } }
  });
}

export function getActiveFaqs(category?: string) {
  return db.fAQ.findMany({
    where: { isActive: true, ...(category ? { category } : {}) },
    orderBy: { sortOrder: "asc" }
  });
}

export function getPageContent(key: string, locale = "en") {
  return db.pageContent.findUnique({ where: { key_locale: { key, locale } } });
}
