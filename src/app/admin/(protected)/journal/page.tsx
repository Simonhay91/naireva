import Link from "next/link";
import { db } from "@/lib/db";
import { Card, PageTitle, StatusBadge } from "@/components/admin/ui";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminJournalPage() {
  const posts = await db.blogPost.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <PageTitle
        title="Journal"
        action={
          <Link href="/admin/journal/new" className="rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-white">
            New post
          </Link>
        }
      />
      <Card className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="px-5 py-3">Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Updated</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((p) => (
                <tr key={p.id} className="border-t border-line hover:bg-[#faf8f5]">
                  <td className="px-5 py-3">
                    <Link href={`/admin/journal/${p.id}`} className="font-medium hover:text-wine">{p.title}</Link>
                  </td>
                  <td className="px-5 py-3 text-muted">{p.category.replace(/_/g, " ")}</td>
                  <td className="px-5 py-3"><StatusBadge status={p.status} /></td>
                  <td className="px-5 py-3 text-muted">{formatDate(p.updatedAt)}</td>
                </tr>
              ))}
              {!posts.length && (
                <tr><td colSpan={4} className="px-5 py-10 text-center text-muted">No posts yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
