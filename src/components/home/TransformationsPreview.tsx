import Link from "next/link";
import { CompareSlider } from "@/components/before-after/CompareSlider";
import type { BeforeAfterCase } from "@prisma/client";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function TransformationsPreview({ item, dict }: { item: BeforeAfterCase | null; dict: Dictionary }) {
  if (!item) return null;
  const t = dict.home.transformationsPreview;

  return (
    <section className="section">
      <div className="wrap">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="kicker">{t.kicker}</p>
            <h2 className="font-serif text-[clamp(34px,5.5vw,58px)]">{t.title}</h2>
          </div>
          <Link href="/transformations" className="btn-outline">
            {t.cta}
          </Link>
        </div>
        <CompareSlider
          beforeSrc={item.beforeImageUrl}
          afterSrc={item.afterImageUrl}
          beforeLabel={dict.compareSlider.before}
          afterLabel={dict.compareSlider.after}
          ariaLabel={dict.compareSlider.ariaLabel}
        />
        <p className="mt-4 text-center text-xs text-[#777]">{t.disclaimer}</p>
      </div>
    </section>
  );
}
