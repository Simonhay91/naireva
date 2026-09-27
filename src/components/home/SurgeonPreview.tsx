import Link from "next/link";
import Image from "next/image";
import type { Surgeon, SurgeonImage } from "@prisma/client";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function SurgeonPreview({ surgeon, dict }: { surgeon: (Surgeon & { images: SurgeonImage[] }) | null; dict: Dictionary }) {
  if (!surgeon) return null;
  const t = dict.home.surgeonPreview;

  const main = surgeon.images[0]?.url ?? surgeon.heroImage;
  const inset = surgeon.images[1]?.url;

  return (
    <section className="section">
      <div className="wrap grid grid-cols-1 overflow-hidden rounded-3xl border border-line lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[420px] lg:min-h-[560px]">
          {main && <Image src={main} alt={surgeon.name} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />}
          {inset && (
            <div className="absolute bottom-5 right-5 hidden aspect-square w-[28%] overflow-hidden rounded-2xl border-[5px] border-white shadow-xl sm:block">
              <Image src={inset} alt={dict.surgeon.teamPhotoAlt} fill className="object-cover" sizes="20vw" />
            </div>
          )}
        </div>
        <div className="bg-paper p-8 sm:p-12 lg:p-[6vw]">
          <p className="kicker">{t.kicker}</p>
          <h2 className="font-serif text-[clamp(32px,4.5vw,52px)]">{t.title}</h2>
          <p className="mt-5 max-w-lg text-lg text-muted">{t.leadTemplate.replace("{name}", surgeon.name)}</p>
          <Link href={`/surgeon/${surgeon.slug}`} className="btn-outline mt-8 inline-flex">
            {t.ctaTemplate.replace("{name}", surgeon.name)}
          </Link>
        </div>
      </div>
    </section>
  );
}
