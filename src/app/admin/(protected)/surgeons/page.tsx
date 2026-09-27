import Link from "next/link";
import { db } from "@/lib/db";
import { Card, PageTitle } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminSurgeonsPage() {
  const surgeons = await db.surgeon.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <PageTitle
        title="Surgeons"
        action={
          <Link href="/admin/surgeons/new" className="rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-white">
            New surgeon
          </Link>
        }
      />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Name</th>
                <th className="px-5 py-3">Specialty</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {surgeons.map((s) => (
                <tr key={s.id} className="border-t border-line hover:bg-[#faf8f5]">
                  <td className="px-5 py-3">
                    <Link href={`/admin/surgeons/${s.id}`} className="font-medium hover:text-wine">{s.name}</Link>
                  </td>
                  <td className="px-5 py-3 text-muted">{s.specialty}</td>
                  <td className="px-5 py-3">{s.isActive ? "Active" : "Inactive"}</td>
                </tr>
              ))}
              {!surgeons.length && (
                <tr><td colSpan={3} className="px-5 py-10 text-center text-muted">No surgeons yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
