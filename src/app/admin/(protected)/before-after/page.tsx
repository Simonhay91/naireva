import Link from "next/link";
import Image from "next/image";
import { db } from "@/lib/db";
import { Card, PageTitle, StatusBadge } from "@/components/admin/ui";

export const dynamic = "force-dynamic";

export default async function AdminBeforeAfterPage() {
  const items = await db.beforeAfterCase.findMany({
    include: { procedure: true },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div>
      <PageTitle
        title="Before / After"
        action={
          <Link href="/admin/before-after/new" className="rounded-full bg-wine px-5 py-2.5 text-sm font-semibold text-white">
            New case
          </Link>
        }
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} href={`/admin/before-after/${item.id}`}>
            <Card className="p-3">
              <div className="relative h-40 w-full overflow-hidden rounded-lg bg-charcoal-soft">
                <Image src={item.afterImageUrl} alt="" fill unoptimized className="object-cover" />
              </div>
              <div className="mt-3 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">{item.procedure?.title ?? "No procedure"}</p>
                  <p className="text-xs text-muted">{item.patientAgeRange ?? "Age withheld"}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={item.publishStatus} />
                  <StatusBadge status={item.consentStatus} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
        {!items.length && <p className="text-muted">No before/after cases yet.</p>}
      </div>
    </div>
  );
}
