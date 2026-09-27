import { notFound } from "next/navigation";
import Link from "next/link";
import { getLeadDetail } from "@/lib/admin-queries";
import { listCoordinators, listActiveSurgeonsAdmin } from "@/lib/admin-queries";
import { Card, PageTitle, StatusBadge, adminInput, AdminField, SubmitButton } from "@/components/admin/ui";
import { CaseManagementPanel } from "@/components/admin/CaseManagementPanel";
import { updateLeadStatus, assignLead } from "@/app/admin/_actions/leads";
import { formatDate, humanizeEnum } from "@/lib/utils";

export const dynamic = "force-dynamic";

const LEAD_STATUSES = [
  "NEW", "CONTACTED", "QUALIFIED", "MEDICAL_REVIEW", "SURGEON_REVIEWED", "VIDEO_CALL_PENDING",
  "VIDEO_CALL_DONE", "OFFER_SENT", "CONFIRMED", "TRAVEL_PLANNED", "ARRIVED", "SURGERY_DONE",
  "RECOVERY", "COMPLETED", "LOST"
];

export default async function LeadDetailPage({ params }: { params: { id: string } }) {
  const [lead, coordinators, surgeons] = await Promise.all([
    getLeadDetail(params.id),
    listCoordinators(),
    listActiveSurgeonsAdmin()
  ]);
  if (!lead) notFound();

  const primaryCase = lead.cases[0];

  return (
    <div>
      <PageTitle
        title={`${lead.firstName} ${lead.lastName}`}
        action={<StatusBadge status={lead.status} />}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          <Card>
            <h3 className="mb-4 font-semibold">Contact</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Email</dt><dd>{lead.email}</dd></div>
              {lead.phone && <div className="flex justify-between"><dt className="text-muted">Phone</dt><dd>{lead.phone}</dd></div>}
              {lead.whatsapp && <div className="flex justify-between"><dt className="text-muted">WhatsApp</dt><dd>{lead.whatsapp}</dd></div>}
              {lead.telegram && <div className="flex justify-between"><dt className="text-muted">Telegram</dt><dd>{lead.telegram}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted">Preferred contact</dt><dd>{humanizeEnum(lead.preferredContact)}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Country / city</dt><dd>{[lead.city, lead.country].filter(Boolean).join(", ")}</dd></div>
              {lead.age && <div className="flex justify-between"><dt className="text-muted">Age</dt><dd>{lead.age}</dd></div>}
            </dl>
          </Card>

          <Card>
            <h3 className="mb-4 font-semibold">Attribution</h3>
            <dl className="space-y-2 text-sm">
              <div className="flex justify-between"><dt className="text-muted">Source</dt><dd>{lead.source ?? "—"}{lead.aiAssisted && " (AI consultant)"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">UTM source</dt><dd>{lead.utmSource ?? "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">UTM medium</dt><dd>{lead.utmMedium ?? "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">UTM campaign</dt><dd>{lead.utmCampaign ?? "—"}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Language</dt><dd>{lead.language}</dd></div>
              <div className="flex justify-between"><dt className="text-muted">Received</dt><dd>{formatDate(lead.createdAt)}</dd></div>
            </dl>
          </Card>

          <Card>
            <h3 className="mb-4 font-semibold">Status & assignment</h3>
            <form action={updateLeadStatus} className="mb-4 flex items-end gap-2">
              <input type="hidden" name="leadId" value={lead.id} />
              <AdminField label="Lead status">
                <select name="status" defaultValue={lead.status} className={adminInput}>
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                  ))}
                </select>
              </AdminField>
              <SubmitButton>Save</SubmitButton>
            </form>
            <form action={assignLead} className="flex items-end gap-2">
              <input type="hidden" name="leadId" value={lead.id} />
              <AdminField label="Assigned coordinator">
                <select name="assignedToId" defaultValue={lead.assignedToId ?? ""} className={adminInput}>
                  <option value="">Unassigned</option>
                  {coordinators.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </AdminField>
              <SubmitButton>Save</SubmitButton>
            </form>
          </Card>

          <Card>
            <h3 className="mb-4 font-semibold">Timeline</h3>
            <div className="space-y-4">
              {lead.activityLogs.map((log) => (
                <div key={log.id} className="border-l-2 border-line pl-4 text-sm">
                  <p>{log.message}</p>
                  <p className="mt-1 text-xs text-muted">
                    {log.user?.name ?? "System"} · {formatDate(log.createdAt)}
                  </p>
                </div>
              ))}
              {!lead.activityLogs.length && <p className="text-sm text-muted">No activity yet.</p>}
            </div>
          </Card>
        </div>

        <div>
          {primaryCase ? (
            <CaseManagementPanel medicalCase={primaryCase} surgeons={surgeons} />
          ) : (
            <Card>
              <p className="text-muted">No medical case linked to this lead yet.</p>
            </Card>
          )}
          {lead.cases.length > 1 && (
            <Card className="mt-4">
              <p className="mb-2 text-sm font-semibold">Other cases for this lead</p>
              <div className="flex flex-col gap-1 text-sm">
                {lead.cases.slice(1).map((c) => (
                  <Link key={c.id} href={`/admin/cases/${c.id}`} className="text-wine">
                    {c.procedure?.title ?? "Case"} — {formatDate(c.createdAt)}
                  </Link>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
