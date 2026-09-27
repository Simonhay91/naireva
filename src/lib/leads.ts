import { db } from "@/lib/db";
import { putObject, makeStorageKey } from "@/lib/storage";
import { notifyTeamOfNewLead } from "@/lib/email";
import { notifyTeamOfNewLeadTelegram } from "@/lib/telegram";
import type { ConsultationInput } from "@/lib/validation/consultation";

export interface IncomingPhoto {
  buffer: Buffer;
  contentType: string;
  originalName: string;
}

/**
 * Single entry point for turning an intake (public form today, AI consultant
 * conversation later — see src/lib/ai/intake-boundary.ts) into a Lead +
 * MedicalCase. Keeping this in one place means both paths get the same
 * attribution handling, activity logging and team notification.
 */
export async function createLeadWithCase(
  input: ConsultationInput,
  photos: IncomingPhoto[],
  opts: { aiAssisted?: boolean; source?: string } = {}
) {
  const [firstName, ...rest] = input.fullName.trim().split(/\s+/);
  const lastName = rest.join(" ") || "-";

  const procedure = input.procedureSlug
    ? await db.procedure.findUnique({ where: { slug: input.procedureSlug } })
    : null;

  const lead = await db.lead.create({
    data: {
      firstName,
      lastName,
      country: input.country,
      city: input.city || null,
      age: input.age ?? null,
      email: input.email,
      phone: input.phone || null,
      whatsapp: input.whatsapp || null,
      telegram: input.telegram || null,
      preferredContact: input.preferredContact,
      status: "NEW",
      source: opts.source ?? input.source ?? "website",
      aiAssisted: opts.aiAssisted ?? false,
      referrer: input.referrer || null,
      landingPage: input.landingPage || null,
      utmSource: input.utmSource || null,
      utmMedium: input.utmMedium || null,
      utmCampaign: input.utmCampaign || null,
      utmTerm: input.utmTerm || null,
      utmContent: input.utmContent || null,
      language: input.language || "en",
      consentAccepted: input.consentAccepted
    }
  });

  const medicalCase = await db.medicalCase.create({
    data: {
      leadId: lead.id,
      procedureId: procedure?.id,
      goals: input.goals,
      previousProcedures: input.previousProcedures || null,
      travelWindow: input.preferredTravelDates || null,
      budgetRange: input.budgetRange || null,
      medicalNotes: input.notes || null,
      status: "NEW"
    }
  });

  if (photos.length) {
    await Promise.all(
      photos.map(async (photo) => {
        const key = makeStorageKey(`cases/${medicalCase.id}`, photo.originalName);
        await putObject(key, photo.buffer, photo.contentType);
        return db.casePhoto.create({
          data: {
            caseId: medicalCase.id,
            storageKey: key,
            isPrivate: true
          }
        });
      })
    );
  }

  await db.activityLog.create({
    data: {
      leadId: lead.id,
      caseId: medicalCase.id,
      type: "LEAD_CREATED",
      message: `New lead submitted via ${opts.aiAssisted ? "AI consultant" : "private consultation form"}.`
    }
  });

  notifyTeamOfNewLead({
    leadId: lead.id,
    fullName: input.fullName,
    country: input.country,
    procedure: procedure?.title,
    preferredContact: input.preferredContact
  }).catch((err) => console.error("Failed to send new-lead notification email", err));

  notifyTeamOfNewLeadTelegram({
    leadId: lead.id,
    fullName: input.fullName,
    country: input.country,
    procedure: procedure?.title,
    phone: input.phone,
    whatsapp: input.whatsapp,
    telegramHandle: input.telegram,
    email: input.email
  }).catch((err) => console.error("Failed to send new-lead Telegram notification", err));

  return { lead, medicalCase };
}
