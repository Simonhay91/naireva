import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageTitle } from "@/components/admin/ui";
import { SurgeonForm } from "@/components/admin/SurgeonForm";

export const dynamic = "force-dynamic";

export default async function EditSurgeonPage({ params }: { params: { id: string } }) {
  const surgeon = await db.surgeon.findUnique({ where: { id: params.id }, include: { images: true, videos: true } });
  if (!surgeon) notFound();

  return (
    <div>
      <PageTitle title={surgeon.name} />
      <SurgeonForm surgeon={surgeon} />
    </div>
  );
}
