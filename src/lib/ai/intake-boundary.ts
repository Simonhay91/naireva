import { db } from "@/lib/db";
import { createLeadWithCase, type IncomingPhoto } from "@/lib/leads";
import { consultationSchema } from "@/lib/validation/consultation";

/**
 * The API boundary a future AI consultant calls once (and only once) it has
 * gathered enough structured information. See ./README.md for the rules
 * this is not allowed to bypass.
 */
export async function submitAiIntake(
  conversationId: string,
  structuredData: unknown,
  photos: IncomingPhoto[] = []
) {
  const parsed = consultationSchema.safeParse(structuredData);
  if (!parsed.success) {
    return { ok: false as const, error: parsed.error.flatten() };
  }

  const { lead, medicalCase } = await createLeadWithCase(parsed.data, photos, {
    aiAssisted: true,
    source: "ai_consultant"
  });

  await db.conversation.update({
    where: { id: conversationId },
    data: { leadId: lead.id, status: "HANDED_OFF" }
  });

  await db.intakeSummary.create({
    data: {
      conversationId,
      caseId: medicalCase.id,
      structuredData: parsed.data,
      missingFields: []
    }
  });

  return { ok: true as const, lead, medicalCase };
}
