import Image from "next/image";
import type { CasePhoto } from "@prisma/client";
import { getSignedReadUrl } from "@/lib/storage";
import { EmptyState } from "@/components/admin/ui";

export async function CasePhotoGrid({ photos }: { photos: CasePhoto[] }) {
  if (!photos.length) return <EmptyState>No photos uploaded for this case.</EmptyState>;

  const withUrls = await Promise.all(
    photos.map(async (p) => ({ ...p, url: await getSignedReadUrl(p.storageKey, 900) }))
  );

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {withUrls.map((p) => (
        <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className="group relative block aspect-square overflow-hidden rounded-xl bg-charcoal-soft">
          <Image src={p.url} alt="" fill unoptimized className="object-cover transition group-hover:opacity-90" />
        </a>
      ))}
    </div>
  );
}
