"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, canManageLeads } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireManager() {
  const session = await auth();
  if (!session?.user || !canManageLeads(session.user.role)) throw new Error("Not authorized.");
  return session.user;
}

function fromForm(formData: FormData) {
  return {
    title: String(formData.get("title") || "").trim(),
    slug: String(formData.get("slug") || "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
    excerpt: String(formData.get("excerpt") || "").trim(),
    heroImage: String(formData.get("heroImage") || "").trim() || null,
    category: String(formData.get("category") || "AESTHETIC_SURGERY") as never,
    body: String(formData.get("body") || "").trim(),
    status: String(formData.get("status") || "DRAFT") as never,
    seoTitle: String(formData.get("seoTitle") || "").trim() || null,
    seoDescription: String(formData.get("seoDescription") || "").trim() || null,

    titleRu: String(formData.get("titleRu") || "").trim() || null,
    excerptRu: String(formData.get("excerptRu") || "").trim() || null,
    bodyRu: String(formData.get("bodyRu") || "").trim() || null,
    seoTitleRu: String(formData.get("seoTitleRu") || "").trim() || null,
    seoDescriptionRu: String(formData.get("seoDescriptionRu") || "").trim() || null,

    titleEs: String(formData.get("titleEs") || "").trim() || null,
    excerptEs: String(formData.get("excerptEs") || "").trim() || null,
    bodyEs: String(formData.get("bodyEs") || "").trim() || null,
    seoTitleEs: String(formData.get("seoTitleEs") || "").trim() || null,
    seoDescriptionEs: String(formData.get("seoDescriptionEs") || "").trim() || null,

    titleAr: String(formData.get("titleAr") || "").trim() || null,
    excerptAr: String(formData.get("excerptAr") || "").trim() || null,
    bodyAr: String(formData.get("bodyAr") || "").trim() || null,
    seoTitleAr: String(formData.get("seoTitleAr") || "").trim() || null,
    seoDescriptionAr: String(formData.get("seoDescriptionAr") || "").trim() || null
  };
}

export async function createPost(formData: FormData) {
  const user = await requireManager();
  const data = fromForm(formData);
  const post = await db.blogPost.create({
    data: { ...data, authorId: user.id, publishedAt: data.status === "PUBLISHED" ? new Date() : null }
  });
  revalidatePath("/admin/journal");
  revalidatePath("/journal");
  redirect(`/admin/journal/${post.id}`);
}

export async function updatePost(formData: FormData) {
  await requireManager();
  const id = String(formData.get("id"));
  const data = fromForm(formData);
  const existing = await db.blogPost.findUnique({ where: { id } });

  await db.blogPost.update({
    where: { id },
    data: {
      ...data,
      publishedAt: data.status === "PUBLISHED" ? existing?.publishedAt ?? new Date() : existing?.publishedAt ?? null
    }
  });

  revalidatePath("/admin/journal");
  revalidatePath(`/admin/journal/${id}`);
  revalidatePath("/journal");
  revalidatePath(`/journal/${data.slug}`);
}

export async function deletePost(formData: FormData) {
  await requireManager();
  const id = String(formData.get("id"));
  await db.blogPost.delete({ where: { id } });
  revalidatePath("/admin/journal");
  redirect("/admin/journal");
}
