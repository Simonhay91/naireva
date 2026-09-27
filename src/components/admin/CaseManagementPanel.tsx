import type { CaseNote, CasePhoto, MedicalCase, Procedure, Surgeon, Trip, VideoConsultation } from "@prisma/client";
import { Card, StatusBadge, adminInput, AdminField, SubmitButton, EmptyState } from "@/components/admin/ui";
import { CasePhotoGrid } from "@/components/admin/CasePhotoGrid";
import { formatDate } from "@/lib/utils";
import { addCaseNote, updateCaseStatus, assignCaseSurgeon, scheduleVideoConsultation, updateVideoConsultation, upsertTrip } from "@/app/admin/_actions/cases";

const CASE_STATUSES = [
  "NEW", "MEDICAL_REVIEW", "SURGEON_REVIEW", "AWAITING_VIDEO_CALL", "PLAN_CONFIRMED",
  "TRAVEL_PLANNED", "IN_TREATMENT", "RECOVERY", "COMPLETED", "CLOSED"
];

type FullCase = MedicalCase & {
  procedure: Procedure | null;
  surgeon: Surgeon | null;
  photos: CasePhoto[];
  notes: (CaseNote & { author: { name: string } })[];
  videoConsultations: (VideoConsultation & { surgeon: Surgeon | null })[];
  trips: Trip[];
};

export function CaseManagementPanel({ medicalCase, surgeons }: { medicalCase: FullCase; surgeons: Surgeon[] }) {
  const latestTrip = medicalCase.trips[0];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted">Case</p>
            <p className="mt-1 font-serif text-xl">{medicalCase.procedure?.title ?? "Procedure not specified"}</p>
          </div>
          <StatusBadge status={medicalCase.status} />
        </div>
        <p className="mt-4 text-sm text-ink/80">{medicalCase.goals}</p>
        {medicalCase.previousProcedures && (
          <p className="mt-2 text-sm text-muted"><b>Previous procedures:</b> {medicalCase.previousProcedures}</p>
        )}
        <div className="mt-2 grid grid-cols-2 gap-3 text-sm text-muted sm:grid-cols-3">
          {medicalCase.travelWindow && <p><b>Travel window:</b> {medicalCase.travelWindow}</p>}
          {medicalCase.budgetRange && <p><b>Budget:</b> {medicalCase.budgetRange}</p>}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <form action={updateCaseStatus} className="flex items-end gap-2">
            <input type="hidden" name="caseId" value={medicalCase.id} />
            <AdminField label="Case status">
              <select name="status" defaultValue={medicalCase.status} className={adminInput}>
                {CASE_STATUSES.map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                ))}
              </select>
            </AdminField>
            <SubmitButton>Save</SubmitButton>
          </form>

          <form action={assignCaseSurgeon} className="flex items-end gap-2">
            <input type="hidden" name="caseId" value={medicalCase.id} />
            <AdminField label="Assigned surgeon">
              <select name="surgeonId" defaultValue={medicalCase.surgeon?.id ?? ""} className={adminInput}>
                <option value="">Unassigned</option>
                {surgeons.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </AdminField>
            <SubmitButton>Save</SubmitButton>
          </form>
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 font-semibold">Case photos</h3>
        <CasePhotoGrid photos={medicalCase.photos} />
      </Card>

      <Card>
        <h3 className="mb-4 font-semibold">Internal notes</h3>
        <form action={addCaseNote} className="mb-5 flex gap-2">
          <input type="hidden" name="caseId" value={medicalCase.id} />
          <textarea name="note" required rows={2} placeholder="Add a note for the team…" className={`${adminInput} flex-1`} />
          <SubmitButton>Add</SubmitButton>
        </form>
        <div className="space-y-4">
          {medicalCase.notes.map((n) => (
            <div key={n.id} className="border-l-2 border-line pl-4 text-sm">
              <p>{n.note}</p>
              <p className="mt-1 text-xs text-muted">{n.author.name} · {formatDate(n.createdAt)}</p>
            </div>
          ))}
          {!medicalCase.notes.length && <p className="text-sm text-muted">No notes yet.</p>}
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 font-semibold">Surgeon video consultation</h3>
        <form action={scheduleVideoConsultation} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="hidden" name="caseId" value={medicalCase.id} />
          <AdminField label="Surgeon">
            <select name="surgeonId" defaultValue={medicalCase.surgeon?.id ?? ""} className={adminInput}>
              <option value="">Select surgeon</option>
              {surgeons.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Date & time">
            <input type="datetime-local" name="scheduledAt" required className={adminInput} />
          </AdminField>
          <AdminField label="Meeting URL (Zoom / Google Meet / other)">
            <input name="meetingUrl" placeholder="https://" className={adminInput} />
          </AdminField>
          <div className="flex items-end">
            <SubmitButton>Schedule call</SubmitButton>
          </div>
        </form>

        <div className="mt-6 space-y-4">
          {medicalCase.videoConsultations.map((vc) => (
            <div key={vc.id} className="rounded-xl border border-line p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium">{formatDate(vc.scheduledAt)} — {vc.surgeon?.name ?? "Surgeon TBD"}</p>
                  {vc.meetingUrl && (
                    <a href={vc.meetingUrl} target="_blank" rel="noreferrer" className="text-xs text-wine">
                      {vc.meetingUrl}
                    </a>
                  )}
                </div>
                <StatusBadge status={vc.status} />
              </div>
              <form action={updateVideoConsultation} className="mt-3 flex flex-wrap items-end gap-2">
                <input type="hidden" name="id" value={vc.id} />
                <input type="hidden" name="caseId" value={medicalCase.id} />
                <AdminField label="Status">
                  <select name="status" defaultValue={vc.status} className={adminInput}>
                    {["SCHEDULED", "COMPLETED", "CANCELLED", "RESCHEDULED", "NO_SHOW"].map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </AdminField>
                <AdminField label="Notes from the call">
                  <input name="notes" defaultValue={vc.notes ?? ""} className={`${adminInput} min-w-[220px]`} />
                </AdminField>
                <SubmitButton>Update</SubmitButton>
              </form>
            </div>
          ))}
          {!medicalCase.videoConsultations.length && <p className="text-sm text-muted">No video consultation scheduled yet.</p>}
        </div>
      </Card>

      <Card>
        <h3 className="mb-4 font-semibold">Trip</h3>
        <form action={upsertTrip} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="hidden" name="caseId" value={medicalCase.id} />
          {latestTrip && <input type="hidden" name="tripId" value={latestTrip.id} />}
          <AdminField label="Arrival date">
            <input type="date" name="arrivalDate" defaultValue={latestTrip?.arrivalDate?.toISOString().slice(0, 10) ?? ""} className={adminInput} />
          </AdminField>
          <AdminField label="Departure date">
            <input type="date" name="departureDate" defaultValue={latestTrip?.departureDate?.toISOString().slice(0, 10) ?? ""} className={adminInput} />
          </AdminField>
          <AdminField label="Flight info" hint="Optional">
            <input name="flightInfo" defaultValue={latestTrip?.flightInfo ?? ""} className={adminInput} />
          </AdminField>
          <div className="flex items-center gap-4 pt-6">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="airportTransfer" defaultChecked={latestTrip?.airportTransfer} /> Airport transfer
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="clinicTransfer" defaultChecked={latestTrip?.clinicTransfer} /> Clinic transfer
            </label>
          </div>
          <AdminField label="Hotel notes" hint="Optional — hotel is never bundled by default">
            <textarea name="hotelNotes" defaultValue={latestTrip?.hotelNotes ?? ""} rows={2} className={adminInput} />
          </AdminField>
          <AdminField label="Tour / partner notes" hint="Optional — only when appropriate for recovery">
            <textarea name="tourNotes" defaultValue={latestTrip?.tourNotes ?? ""} rows={2} className={adminInput} />
          </AdminField>
          <div className="sm:col-span-2">
            <SubmitButton>{latestTrip ? "Update trip" : "Create trip"}</SubmitButton>
          </div>
        </form>
      </Card>
    </div>
  );
}
