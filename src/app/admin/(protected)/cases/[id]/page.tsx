import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseDetail, listActiveSurgeonsAdmin } from "@/lib/admin-queries";
import { Card, PageTitle, StatusBadge } from "@/components/admin/ui";
import { CaseManagementPanel } from "@/components/admin/CaseManagementPanel";

export const dynamic = "force-dynamic";

export default async function CaseDetailPage({ params }: { params: { id: string } }) {
  const [medicalCase, surgeons] = await Promise.all([getCaseDetail(params.id), listActiveSurgeonsAdmin()]);
  if (!medicalCase) notFound();

  return (
    <div>
      <PageTitle
        title={`Case — ${medicalCase.lead.firstName} ${medicalCase.lead.lastName}`}
        action={<StatusBadge status={medicalCase.status} />}
      />
      <Card className="mb-6">
        <Link href={`/admin/leads/${medicalCase.lead.id}`} className="text-sm text-wine">
          ← Back to lead
        </Link>
      </Card>
      <CaseManagementPanel medicalCase={medicalCase} surgeons={surgeons} />
    </div>
  );
}
