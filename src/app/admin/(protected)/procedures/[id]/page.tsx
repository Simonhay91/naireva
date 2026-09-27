import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageTitle } from "@/components/admin/ui";
import { ProcedureForm } from "@/components/admin/ProcedureForm";

export const dynamic = "force-dynamic";

export default async function EditProcedurePage({ params }: { params: { id: string } }) {
  const procedure = await db.procedure.findUnique({ where: { id: params.id } });
  if (!procedure) notFound();

  return (
    <div>
      <PageTitle title={procedure.title} />
      <ProcedureForm procedure={procedure} />
    </div>
  );
}
