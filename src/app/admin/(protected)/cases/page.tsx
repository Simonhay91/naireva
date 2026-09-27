import Link from "next/link";
import { listCases } from "@/lib/admin-queries";
import { Card, PageTitle, StatusBadge } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function CasesPage() {
  const cases = await listCases();

  return (
    <div>
      <PageTitle title="Medical cases" />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Procedure</th>
                <th className="px-5 py-3">Surgeon</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Created</th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c) => (
                <tr key={c.id} className="border-t border-line hover:bg-[#faf8f5]">
                  <td className="px-5 py-3">
                    <Link href={`/admin/cases/${c.id}`} className="font-medium hover:text-wine">
                      {c.lead.firstName} {c.lead.lastName}
                    </Link>
                  </td>
                  <td className="px-5 py-3">{c.procedure?.title ?? "—"}</td>
                  <td className="px-5 py-3">{c.surgeon?.name ?? "Unassigned"}</td>
                  <td className="px-5 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-5 py-3 text-muted">{formatDate(c.createdAt)}</td>
                </tr>
              ))}
              {!cases.length && (
                <tr>
                  <td colSpan={5} className="px-5 py-10 text-center text-muted">No medical cases yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
