"use server";

import { revalidatePath } from "next/cache";
import { auth, canManageLeads } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireManager() {
  const session = await auth();
  if (!session?.user || !canManageLeads(session.user.role)) throw new Error("Not authorized.");
}

function fromForm(formData: FormData) {
  return {
    question: String(formData.get("question") || "").trim(),
    answer: String(formData.get("answer") || "").trim(),
    category: String(formData.get("category") || "general").trim() || "general",
    procedureId: String(formData.get("procedureId") || "") || null,
    sortOrder: Number(formData.get("sortOrder") || 0),
    isActive: formData.get("isActive") === "on",
    questionRu: String(formData.get("questionRu") || "").trim() || null,
    answerRu: String(formData.get("answerRu") || "").trim() || null
  };
}

export async function createFaq(formData: FormData) {
  await requireManager();
  await db.fAQ.create({ data: fromForm(formData) });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function updateFaq(formData: FormData) {
  await requireManager();
  const id = String(formData.get("id"));
  await db.fAQ.update({ where: { id }, data: fromForm(formData) });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}

export async function deleteFaq(formData: FormData) {
  await requireManager();
  const id = String(formData.get("id"));
  await db.fAQ.delete({ where: { id } });
  revalidatePath("/admin/faq");
  revalidatePath("/faq");
}
