"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, isAdmin } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user || !isAdmin(session.user.role)) throw new Error("Not authorized.");
}

function lines(value: FormDataEntryValue | null) {
  return String(value || "")
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);
}

function fromForm(formData: FormData) {
  return {
    slug: String(formData.get("slug") || "").trim().toLowerCase().replace(/[^a-z0-9-]+/g, "-"),
    name: String(formData.get("name") || "").trim(),
    specialty: String(formData.get("specialty") || "").trim(),
    biography: String(formData.get("biography") || "").trim(),
    education: lines(formData.get("education")).map((degree) => ({ degree })),
    experience: String(formData.get("experience") || "").trim() || null,
    certifications: lines(formData.get("certifications")),
    clinicAffiliation: String(formData.get("clinicAffiliation") || "").trim() || null,
    languages: lines(formData.get("languages")),
    instagramUrl: String(formData.get("instagramUrl") || "").trim() || null,
    heroImage: String(formData.get("heroImage") || "").trim() || null,
    seoTitle: String(formData.get("seoTitle") || "").trim() || null,
    seoDescription: String(formData.get("seoDescription") || "").trim() || null,
    isActive: formData.get("isActive") === "on",

    specialtyRu: String(formData.get("specialtyRu") || "").trim() || null,
    biographyRu: String(formData.get("biographyRu") || "").trim() || null,
    experienceRu: String(formData.get("experienceRu") || "").trim() || null,
    clinicAffiliationRu: String(formData.get("clinicAffiliationRu") || "").trim() || null,
    seoTitleRu: String(formData.get("seoTitleRu") || "").trim() || null,
    seoDescriptionRu: String(formData.get("seoDescriptionRu") || "").trim() || null
  };
}

function parseImageLines(value: FormDataEntryValue | null) {
  return lines(value).map((line, i) => {
    const [url, caption] = line.split("|").map((s) => s.trim());
    return { url, caption: caption || null, sortOrder: i };
  });
}

export async function createSurgeon(formData: FormData) {
  await requireAdmin();
  const data = fromForm(formData);
  const images = parseImageLines(formData.get("images"));
  const videos = parseImageLines(formData.get("videos")).map((v) => ({ url: v.url, title: v.caption, sortOrder: v.sortOrder }));

  const surgeon = await db.surgeon.create({
    data: { ...data, images: { create: images }, videos: { create: videos } }
  });

  revalidatePath("/admin/surgeons");
  revalidatePath("/surgeon");
  redirect(`/admin/surgeons/${surgeon.id}`);
}

export async function updateSurgeon(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  const data = fromForm(formData);
  const images = parseImageLines(formData.get("images"));
  const videos = parseImageLines(formData.get("videos")).map((v) => ({ url: v.url, title: v.caption, sortOrder: v.sortOrder }));

  await db.$transaction([
    db.surgeonImage.deleteMany({ where: { surgeonId: id } }),
    db.surgeonVideo.deleteMany({ where: { surgeonId: id } }),
    db.surgeon.update({
      where: { id },
      data: { ...data, images: { create: images }, videos: { create: videos } }
    })
  ]);

  revalidatePath("/admin/surgeons");
  revalidatePath(`/admin/surgeons/${id}`);
  revalidatePath("/surgeon");
  revalidatePath(`/surgeon/${data.slug}`);
  revalidatePath("/");
}

export async function deleteSurgeon(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id"));
  await db.surgeon.delete({ where: { id } });
  revalidatePath("/admin/surgeons");
  redirect("/admin/surgeons");
}
