import type { BeforeAfterCase, Procedure, Surgeon } from "@prisma/client";
import { AdminField, adminInput, SubmitButton, Card } from "@/components/admin/ui";
import { createBeforeAfter, updateBeforeAfter, deleteBeforeAfter } from "@/app/admin/_actions/before-after";

export function BeforeAfterForm({
  item,
  procedures,
  surgeons
}: {
  item?: BeforeAfterCase;
  procedures: Procedure[];
  surgeons: Surgeon[];
}) {
  const action = item ? updateBeforeAfter : createBeforeAfter;

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-6">
        {item && <input type="hidden" name="id" value={item.id} />}
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Before image URL">
              <input name="beforeImageUrl" required defaultValue={item?.beforeImageUrl} className={adminInput} />
            </AdminField>
            <AdminField label="After image URL">
              <input name="afterImageUrl" required defaultValue={item?.afterImageUrl} className={adminInput} />
            </AdminField>
            <AdminField label="Procedure">
              <select name="procedureId" defaultValue={item?.procedureId ?? ""} className={adminInput}>
                <option value="">—</option>
                {procedures.map((p) => (
                  <option key={p.id} value={p.id}>{p.title}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Surgeon">
              <select name="surgeonId" defaultValue={item?.surgeonId ?? ""} className={adminInput}>
                <option value="">—</option>
                {surgeons.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Patient age range" hint='e.g. "25–34" — never an exact age or name'>
              <input name="patientAgeRange" defaultValue={item?.patientAgeRange ?? ""} className={adminInput} />
            </AdminField>
            <AdminField label="Angle">
              <select name="angle" defaultValue={item?.angle ?? "FRONTAL"} className={adminInput}>
                {["FRONTAL", "PROFILE_LEFT", "PROFILE_RIGHT", "THREE_QUARTER", "OTHER"].map((a) => (
                  <option key={a} value={a}>{a.replace(/_/g, " ")}</option>
                ))}
              </select>
            </AdminField>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Case notes (optional)">
              <textarea name="caseNotes" rows={3} defaultValue={item?.caseNotes ?? ""} className={adminInput} />
            </AdminField>
            <AdminField label="Case notes (RU, optional)">
              <textarea name="caseNotesRu" rows={3} defaultValue={item?.caseNotesRu ?? ""} className={adminInput} />
            </AdminField>
          </div>
        </Card>

        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Consent status" hint="Only GRANTED cases can be published">
              <select name="consentStatus" defaultValue={item?.consentStatus ?? "PENDING"} className={adminInput}>
                {["PENDING", "GRANTED", "REVOKED"].map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Publish status">
              <select name="publishStatus" defaultValue={item?.publishStatus ?? "DRAFT"} className={adminInput}>
                {["DRAFT", "PUBLISHED", "ARCHIVED"].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </AdminField>
          </div>
        </Card>

        <SubmitButton>{item ? "Save changes" : "Create case"}</SubmitButton>
      </form>
      {item && (
        <form action={deleteBeforeAfter}>
          <input type="hidden" name="id" value={item.id} />
          <button className="text-sm text-red-600 hover:underline">Delete case</button>
        </form>
      )}
    </div>
  );
}
