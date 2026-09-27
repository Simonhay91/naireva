import { NextRequest, NextResponse } from "next/server";
import { consultationSchema, MAX_PHOTO_COUNT, MAX_PHOTO_BYTES, ACCEPTED_IMAGE_TYPES } from "@/lib/validation/consultation";
import { createLeadWithCase, type IncomingPhoto } from "@/lib/leads";
import { rateLimit, requestIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = requestIp(req.headers);
  const { allowed } = rateLimit(`consultation:${ip}`, 5, 10 * 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again shortly, or contact us directly." },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Invalid submission." }, { status: 400 });
  }

  const raw: Record<string, unknown> = {};
  for (const key of formData.keys()) {
    if (key === "photos") continue;
    const value = formData.get(key);
    if (typeof value === "string") raw[key] = value;
  }

  const parsed = consultationSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check the form and try again.", issues: parsed.error.flatten() }, { status: 422 });
  }

  if (parsed.data.honeypot) {
    // Silently accept-looking response for bots without doing any work.
    return NextResponse.json({ ok: true });
  }

  const photoFiles = formData.getAll("photos").filter((f): f is File => f instanceof File && f.size > 0);

  if (photoFiles.length > MAX_PHOTO_COUNT) {
    return NextResponse.json({ error: `Please upload at most ${MAX_PHOTO_COUNT} photos.` }, { status: 422 });
  }

  const photos: IncomingPhoto[] = [];
  for (const file of photoFiles) {
    if (file.size > MAX_PHOTO_BYTES) {
      return NextResponse.json({ error: "Each photo must be under 12MB." }, { status: 422 });
    }
    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json({ error: "Photos must be JPEG, PNG, WEBP or HEIC." }, { status: 422 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    photos.push({ buffer, contentType: file.type, originalName: file.name });
  }

  try {
    const { lead } = await createLeadWithCase(parsed.data, photos);
    return NextResponse.json({ ok: true, leadId: lead.id });
  } catch (err) {
    console.error("Failed to create lead from consultation form", err);
    return NextResponse.json({ error: "Something went wrong. Please try again or contact us directly." }, { status: 500 });
  }
}
