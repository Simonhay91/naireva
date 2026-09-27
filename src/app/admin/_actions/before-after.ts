"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth, canManageLeads } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireManager() {
  const session = await auth();
  if (!session?.user || !canManageLeads(session.user.role)) throw new Error("Not authorized.");
}

function fromForm(formData: FormData) {
  return {
    procedureId: String(formData.get("procedureId") || "") || null,
    surgeonId: String(formData.get("surgeonId") || "") || null,
    patientAgeRange: String(formData.get("patientAgeRange") || "").trim() || null,
    caseNotes: String(formData.get("caseNotes") || "").trim() || null,
    caseNotesRu: String(formData.get("caseNotesRu") || "").trim() || null,
    beforeImageUrl: String(formData.get("beforeImageUrl") || "").trim(),
    afterImageUrl: String(formData.get("afterImageUrl") || "").trim(),
    angle: String(formData.get("angle") || "FRONTAL") as never,
    consentStatus: String(formData.get("consentStatus") || "PENDING") as never,
    publishStatus: String(formData.get("publishStatus") || "DRAFT") as never
  };
}

export async function createBeforeAfter(formData: FormData) {
  await requireManager();
  const item = await db.beforeAfterCase.create({ data: fromForm(formData) });
  revalidatePath("/admin/before-after");
  revalidatePath("/transformations");
  revalidatePath("/");
  redirect(`/admin/before-after/${item.id}`);
}

export async function updateBeforeAfter(formData: FormData) {
  await requireManager();
  const id = String(formData.get("id"));
  await db.beforeAfterCase.update({ where: { id }, data: fromForm(formData) });
  revalidatePath("/admin/before-after");
  revalidatePath(`/admin/before-after/${id}`);
  revalidatePath("/transformations");
  revalidatePath("/");
}

export async function deleteBeforeAfter(formData: FormData) {
  await requireManager();
  const id = String(formData.get("id"));
  await db.beforeAfterCase.delete({ where: { id } });
  revalidatePath("/admin/before-after");
  redirect("/admin/before-after");
}
