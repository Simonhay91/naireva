import Link from "next/link";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";
import { PageTitle, Card, StatusBadge } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const LEAD_STATUSES = [
  "NEW", "CONTACTED", "QUALIFIED", "MEDICAL_REVIEW", "SURGEON_REVIEWED", "VIDEO_CALL_PENDING",
  "VIDEO_CALL_DONE", "OFFER_SENT", "CONFIRMED", "TRAVEL_PLANNED", "ARRIVED", "SURGERY_DONE",
  "RECOVERY", "COMPLETED", "LOST"
];

export default async function LeadsPage({
  searchParams
}: {
  searchParams: { status?: string; source?: string; country?: string; q?: string };
}) {
  const where: Prisma.LeadWhereInput = {};
  if (searchParams.status) where.status = searchParams.status as never;
  if (searchParams.source) where.source = searchParams.source;
  if (searchParams.country) where.country = { contains: searchParams.country, mode: "insensitive" };
  if (searchParams.q) {
    where.OR = [
      { firstName: { contains: searchParams.q, mode: "insensitive" } },
      { lastName: { contains: searchParams.q, mode: "insensitive" } },
      { email: { contains: searchParams.q, mode: "insensitive" } }
    ];
  }

  const leads = await db.lead.findMany({
    where,
    include: { assignedTo: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
    take: 200
  });

  return (
    <div>
      <PageTitle title="Leads" />

      <Card className="mb-6">
        <form className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <input name="q" defaultValue={searchParams.q} placeholder="Search name or email" className="rounded-lg border border-line px-3 py-2 text-sm" />
          <input name="country" defaultValue={searchParams.country} placeholder="Country" className="rounded-lg border border-line px-3 py-2 text-sm" />
          <select name="status" defaultValue={searchParams.status ?? ""} className="rounded-lg border border-line px-3 py-2 text-sm">
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>
          <button className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-white">Filter</button>
        </form>
      </Card>

      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Country</th>
                <th className="px-5 py-3">Source</th>
                <th className="px-5 py-3">Assigned</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Received</th>
              </tr>
            </thead>
            <tbody>
              {leads.map((lead) => (
                <tr key={lead.id} className="border-t border-line hover:bg-[#faf8f5]">
                  <td className="px-5 py-3">
                    <Link href={`/admin/leads/${lead.id}`} className="font-medium hover:text-wine">
                      {lead.firstName} {lead.lastName}
                    </Link>
                    <div className="text-xs text-muted">{lead.email}</div>
                  </td>
                  <td className="px-5 py-3">{lead.country}</td>
                  <td className="px-5 py-3">
                    {lead.source ?? "—"}
                    {lead.aiAssisted && <span className="ml-1 text-xs text-wine">(AI)</span>}
                  </td>
                  <td className="px-5 py-3">{lead.assignedTo?.name ?? "Unassigned"}</td>
                  <td className="px-5 py-3">
                    <StatusBadge status={lead.status} />
                  </td>
                  <td className="px-5 py-3 text-muted">{formatDate(lead.createdAt)}</td>
                </tr>
              ))}
              {!leads.length && (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-muted">
                    No leads match these filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
