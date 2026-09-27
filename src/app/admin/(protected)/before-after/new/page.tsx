import { db } from "@/lib/db";
import { PageTitle } from "@/components/admin/ui";
import { BeforeAfterForm } from "@/components/admin/BeforeAfterForm";

export const dynamic = "force-dynamic";

export default async function NewBeforeAfterPage() {
  const [procedures, surgeons] = await Promise.all([
    db.procedure.findMany({ orderBy: { title: "asc" } }),
    db.surgeon.findMany({ orderBy: { name: "asc" } })
  ]);

  return (
    <div>
      <PageTitle title="New before/after case" />
      <BeforeAfterForm procedures={procedures} surgeons={surgeons} />
    </div>
  );
}
