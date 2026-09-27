"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, isAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !isAdmin(session.user.role)) throw new Error("Not authorized.");
}

function linesToArray(value: FormDataEntryValue | null) {
  return String(value || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function fromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") || "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
    title: String(formData.get("title") || "").trim(),
    shortDescription: String(formData.get("shortDescription") || "").trim(),
    content: String(formData.get("content") || "").trim(),
    heroImage: String(formData.get("heroImage") || "").trim() || null,
    gallery: linesToArray(formData.get("gallery")),
    recoveryOverview: String(formData.get("recoveryOverview") || "").trim() || null,
    seoTitle: String(formData.get("seoTitle") || "").trim() || null,
    seoDescription: String(formData.get("seoDescription") || "").trim() || null,
    isActive: formData.get("isActive") === "on",

    titleRu: String(formData.get("titleRu") || "").trim() || null,
    shortDescriptionRu: String(formData.get("shortDescriptionRu") || "").trim() || null,
    contentRu: String(formData.get("contentRu") || "").trim() || null,
    recoveryOverviewRu: String(formData.get("recoveryOverviewRu") || "").trim() || null,
    seoTitleRu: String(formData.get("seoTitleRu") || "").trim() || null,
    seoDescriptionRu: String(formData.get("seoDescriptionRu") || "").trim() || null
  };
}

export async function createProcedure(formData: FormData) {
  await requireAdmin();
  const data = fromForm(formData);
  const procedure = await db.procedure.create({ data });
  revalidatePath("/admin/procedures");
  revalidatePath("/procedures");
  redirect(`/admin/procedures/${procedure.id}`);
}

export async function updateProcedure(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const data = fromForm(formData);
  await db.procedure.update({ where: { id }, data });
  revalidatePath("/admin/procedures");
  revalidatePath(`/admin/procedures/${id}`);
  revalidatePath("/procedures");
  revalidatePath(`/procedures/${data.slug}`);
  revalidatePath("/");
}

export async function deleteProcedure(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.procedure.delete({ where: { id } });
  revalidatePath("/admin/procedures");
  redirect("/admin/procedures");
}
