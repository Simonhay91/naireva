"use server";

import { revalidatePath } from "next/cache";
import { auth, canManageLeads } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireSession() {
  const session = await auth();
  if (!session?.user) throw new Error("Not authorized.");
  return session.user;
}

async function requireManager() {
  const user = await requireSession();
  if (!canManageLeads(user.role)) throw new Error("Not authorized.");
  return user;
}

export async function addCaseNote(formData: FormData) {
  const user = await requireSession();
  const caseId = String(formData.get("caseId"));
  const note = String(formData.get("note") || "").trim();
  if (!note) return;

  await db.caseNote.create({ data: { caseId, authorId: user.id, note } });
  await db.activityLog.create({ data: { caseId, type: "NOTE_ADDED", message: "A note was added to the case.", userId: user.id } });

  revalidatePath(`/admin/cases/${caseId}`);
}

export async function updateCaseStatus(formData: FormData) {
  const user = await requireManager();
  const caseId = String(formData.get("caseId"));
  const status = String(formData.get("status"));

  await db.medicalCase.update({ where: { id: caseId }, data: { status: status as never } });
  await db.activityLog.create({ data: { caseId, type: "CASE_STATUS_CHANGE", message: `Case status changed to ${status}`, userId: user.id } });

  revalidatePath(`/admin/cases/${caseId}`);
}

export async function assignCaseSurgeon(formData: FormData) {
  const user = await requireManager();
  const caseId = String(formData.get("caseId"));
  const surgeonId = String(formData.get("surgeonId") || "") || null;

  await db.medicalCase.update({ where: { id: caseId }, data: { surgeonId } });
  await db.activityLog.create({ data: { caseId, type: "SURGEON_ASSIGNED", message: "Surgeon assigned to case.", userId: user.id } });

  revalidatePath(`/admin/cases/${caseId}`);
}

export async function scheduleVideoConsultation(formData: FormData) {
  const user = await requireManager();
  const caseId = String(formData.get("caseId"));
  const surgeonId = String(formData.get("surgeonId") || "") || null;
  const scheduledAt = String(formData.get("scheduledAt"));
  const meetingUrl = String(formData.get("meetingUrl") || "") || null;

  await db.videoConsultation.create({
    data: { caseId, surgeonId, scheduledAt: new Date(scheduledAt), meetingUrl, status: "SCHEDULED" }
  });
  await db.medicalCase.update({ where: { id: caseId }, data: { status: "AWAITING_VIDEO_CALL" } });
  await db.lead.updateMany({
    where: { cases: { some: { id: caseId } } },
    data: { status: "VIDEO_CALL_PENDING" }
  });
  await db.activityLog.create({ data: { caseId, type: "VIDEO_SCHEDULED", message: `Video consultation scheduled for ${scheduledAt}.`, userId: user.id } });

  revalidatePath(`/admin/cases/${caseId}`);
}

export async function updateVideoConsultation(formData: FormData) {
  const user = await requireManager();
  const id = String(formData.get("id"));
  const caseId = String(formData.get("caseId"));
  const status = String(formData.get("status"));
  const notes = String(formData.get("notes") || "") || null;

  await db.videoConsultation.update({ where: { id }, data: { status: status as never, notes } });

  if (status === "COMPLETED") {
    await db.medicalCase.update({ where: { id: caseId }, data: { status: "PLAN_CONFIRMED" } });
    await db.lead.updateMany({ where: { cases: { some: { id: caseId } } }, data: { status: "VIDEO_CALL_DONE" } });
  }

  await db.activityLog.create({ data: { caseId, type: "VIDEO_UPDATED", message: `Video consultation marked ${status}.`, userId: user.id } });

  revalidatePath(`/admin/cases/${caseId}`);
}

export async function upsertTrip(formData: FormData) {
  const user = await requireManager();
  const caseId = String(formData.get("caseId"));
  const existingId = String(formData.get("tripId") || "");

  const data = {
    arrivalDate: formData.get("arrivalDate") ? new Date(String(formData.get("arrivalDate"))) : null,
    departureDate: formData.get("departureDate") ? new Date(String(formData.get("departureDate"))) : null,
    flightInfo: String(formData.get("flightInfo") || "") || null,
    airportTransfer: formData.get("airportTransfer") === "on",
    clinicTransfer: formData.get("clinicTransfer") === "on",
    hotelNotes: String(formData.get("hotelNotes") || "") || null,
    tourNotes: String(formData.get("tourNotes") || "") || null,
    coordinatorId: user.id
  };

  if (existingId) {
    await db.trip.update({ where: { id: existingId }, data });
  } else {
    await db.trip.create({ data: { ...data, caseId } });
    await db.medicalCase.update({ where: { id: caseId }, data: { status: "TRAVEL_PLANNED" } });
    await db.lead.updateMany({ where: { cases: { some: { id: caseId } } }, data: { status: "TRAVEL_PLANNED" } });
  }

  await db.activityLog.create({ data: { caseId, type: "TRIP_SAVED", message: "Trip details saved.", userId: user.id } });

  revalidatePath(`/admin/cases/${caseId}`);
}
