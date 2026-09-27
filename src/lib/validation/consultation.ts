import { z } from "zod";

export const preferredContactValues = ["EMAIL", "PHONE", "WHATSAPP", "TELEGRAM"] as const;

export const consultationSchema = z.object({
  // Step 1 — contact
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  country: z.string().trim().min(2, "Please select your country").max(80),
  city: z.string().trim().max(80).optional().or(z.literal("")),
  age: z.preprocess(
    (v) => (v === "" || v === undefined || v === null ? undefined : v),
    z.coerce.number().int().min(16).max(100).optional()
  ),
  preferredContact: z.enum(preferredContactValues),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  whatsapp: z.string().trim().max(40).optional().or(z.literal("")),
  telegram: z.string().trim().max(60).optional().or(z.literal("")),

  // Step 2 — procedure & goals
  procedureSlug: z.string().trim().max(80).optional().or(z.literal("")),
  goals: z.string().trim().min(10, "Tell us a little more about what you'd like to change").max(2000),
  previousProcedures: z.string().trim().max(1000).optional().or(z.literal("")),
  preferredTravelDates: z.string().trim().max(200).optional().or(z.literal("")),
  budgetRange: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),

  // Step 4 — consent
  // Deliberately not z.coerce.boolean(): FormData sends this as a string, and
  // Boolean("false") is true in JS — coercing naively would let an
  // explicitly-unconsented direct API request through.
  consentAccepted: z
    .preprocess((v) => v === true || v === "true" || v === "on", z.boolean())
    .refine((v) => v === true, "Consent is required to submit your request"),

  // Attribution (populated client-side, never user-editable)
  source: z.string().trim().max(120).optional().or(z.literal("")),
  referrer: z.string().trim().max(500).optional().or(z.literal("")),
  landingPage: z.string().trim().max(500).optional().or(z.literal("")),
  utmSource: z.string().trim().max(120).optional().or(z.literal("")),
  utmMedium: z.string().trim().max(120).optional().or(z.literal("")),
  utmCampaign: z.string().trim().max(120).optional().or(z.literal("")),
  utmTerm: z.string().trim().max(120).optional().or(z.literal("")),
  utmContent: z.string().trim().max(120).optional().or(z.literal("")),
  language: z.string().trim().max(10).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional().or(z.literal("")) // bot trap, must stay empty
});

export type ConsultationInput = z.infer<typeof consultationSchema>;

export const MAX_PHOTO_COUNT = 8;
export const MAX_PHOTO_BYTES = 12 * 1024 * 1024; // 12MB per file
export const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];
