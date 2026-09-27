"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CompareSlider } from "./CompareSlider";
import { cn } from "@/lib/utils";
import type { BeforeAfterCase, Procedure, Surgeon } from "@prisma/client";
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries";
import { localized } from "@/lib/i18n/localized";

type Item = BeforeAfterCase & { procedure: Procedure | null; surgeon: Surgeon | null };

export function GalleryGrid({ items, locale, dict }: { items: Item[]; locale: Locale; dict: Dictionary }) {
  const [filter, setFilter] = useState<string>("all");

  const procedures = useMemo(() => {
    const map = new Map<string, string>();
    items.forEach((i) => i.procedure && map.set(i.procedure.slug, localized(locale, i.procedure.title, i.procedure.titleRu)));
    return Array.from(map.entries());
  }, [items, locale]);

  const filtered = filter === "all" ? items : items.filter((i) => i.procedure?.slug === filter);

  if (!items.length) {
    return <p className="text-center text-muted">{dict.transformations.emptyState}</p>;
  }

  return (
    <div>
      {procedures.length > 1 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter("all")}
            className={cn("rounded-full border px-4 py-2 text-xs font-medium", filter === "all" ? "border-ink bg-ink text-white" : "border-line text-muted")}
          >
            {dict.transformations.filterAll}
          </button>
          {procedures.map(([slug, title]) => (
            <button
              key={slug}
              onClick={() => setFilter(slug)}
              className={cn("rounded-full border px-4 py-2 text-xs font-medium", filter === slug ? "border-ink bg-ink text-white" : "border-line text-muted")}
            >
              {title}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {filtered.map((item) => (
          <div key={item.id} className="rounded-3xl border border-line bg-paper p-4">
            <CompareSlider
              beforeSrc={item.beforeImageUrl}
              afterSrc={item.afterImageUrl}
              beforeLabel={dict.compareSlider.before}
              afterLabel={dict.compareSlider.after}
              ariaLabel={dict.compareSlider.ariaLabel}
              className="relative h-[300px] w-full overflow-hidden rounded-2xl bg-charcoal-soft sm:h-[360px]"
            />
            <div className="flex items-center justify-between px-1 pt-4">
              <div className="text-sm text-muted">
                {item.procedure && localized(locale, item.procedure.title, item.procedure.titleRu)}
                {item.patientAgeRange && ` · ${dict.transformationDetail.agePrefix} ${item.patientAgeRange}`}
              </div>
              <Link href={`/transformations/${item.id}`} className="text-xs font-semibold text-wine">
                {dict.transformations.viewCase}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
