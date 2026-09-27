import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageTitle } from "@/components/admin/ui";
import { BeforeAfterForm } from "@/components/admin/BeforeAfterForm";

export const dynamic = "force-dynamic";

export default async function EditBeforeAfterPage({ params }: { params: { id: string } }) {
  const [item, procedures, surgeons] = await Promise.all([
    db.beforeAfterCase.findUnique({ where: { id: params.id } }),
    db.procedure.findMany({ orderBy: { title: "asc" } }),
    db.surgeon.findMany({ orderBy: { name: "asc" } })
  ]);
  if (!item) notFound();

  return (
    <div>
      <PageTitle title="Edit case" />
      <BeforeAfterForm item={item} procedures={procedures} surgeons={surgeons} />
    </div>
  );
}
