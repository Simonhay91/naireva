import Link from "next/link";
import { db } from "@/lib/db";
import { Card, PageTitle } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminProceduresPage() {
  const procedures = await db.procedure.findMany({ orderBy: { createdAt: "asc" } });

  return (
    <div>
      <PageTitle
        title="Procedures"
        action={
          <Link href="/admin/procedures/new" className="rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-white">
            New procedure
          </Link>
        }
      />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Slug</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {procedures.map((p) => (
                <tr key={p.id} className="border-t border-line hover:bg-[#faf8f5]">
                  <td className="px-5 py-3">
                    <Link href={`/admin/procedures/${p.id}`} className="font-medium hover:text-wine">{p.title}</Link>
                  </td>
                  <td className="px-5 py-3 text-muted">/{p.slug}</td>
                  <td className="px-5 py-3">{p.isActive ? "Active" : "Inactive"}</td>
                </tr>
              ))}
              {!procedures.length && (
                <tr><td colSpan={3} className="px-5 py-10 text-center text-muted">No procedures yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
