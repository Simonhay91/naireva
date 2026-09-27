import Link from "next/link";
import { db } from "@/lib/db";
import { PageTitle, StatCard, Card, StatusBadge } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [newLeads, activeCases, upcomingCalls, confirmed, arrived, completed, recentLeads] = await Promise.all([
    db.lead.count({ where: { status: "NEW" } }),
    db.medicalCase.count({ where: { status: { notIn: ["COMPLETED", "CLOSED"] } } }),
    db.videoConsultation.count({ where: { status: "SCHEDULED", scheduledAt: { gte: new Date() } } }),
    db.lead.count({ where: { status: "CONFIRMED" } }),
    db.lead.count({ where: { status: "ARRIVED" } }),
    db.lead.count({ where: { status: "COMPLETED" } }),
    db.lead.findMany({ orderBy: { createdAt: "desc" }, take: 8 })
  ]);

  return (
    <div>
      <PageTitle title="Dashboard" />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatCard label="New leads" value={newLeads} />
        <StatCard label="Active cases" value={activeCases} />
        <StatCard label="Upcoming video calls" value={upcomingCalls} />
        <StatCard label="Confirmed" value={confirmed} />
        <StatCard label="Arrived" value={arrived} />
        <StatCard label="Completed" value={completed} />
      </div>

      <div className="mt-8">
        <Card className="p-0">
          <div className="flex items-center justify-between border-b border-line p-5">
            <h2 className="font-semibold">Recent leads</h2>
            <Link href="/admin/leads" className="text-sm text-wine">
              View all →
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-wide text-muted">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Country</th>
                  <th className="px-5 py-3">Source</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Received</th>
                </tr>
              </thead>
              <tbody>
                {recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-t border-line hover:bg-[#faf8f5]">
                    <td className="px-5 py-3">
                      <Link href={`/admin/leads/${lead.id}`} className="font-medium hover:text-wine">
                        {lead.firstName} {lead.lastName}
                      </Link>
                    </td>
                    <td className="px-5 py-3">{lead.country}</td>
                    <td className="px-5 py-3">{lead.source ?? "—"}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={lead.status} />
                    </td>
                    <td className="px-5 py-3 text-muted">{formatDate(lead.createdAt)}</td>
                  </tr>
                ))}
                {!recentLeads.length && (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-muted">
                      No leads yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
