export function CompareSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = "BEFORE",
  afterLabel = "AFTER",
  ariaLabel = "Compare before and after",
  className
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  ariaLabel?: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={className ?? "relative mx-auto grid h-[420px] w-full max-w-[1050px] grid-cols-2 gap-[2px] overflow-hidden rounded-3xl bg-white sm:h-[520px]"}
    >
      <div className="relative h-full w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={beforeSrc} alt={beforeLabel} className="absolute inset-0 h-full w-full select-none object-cover" draggable={false} />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em]">{beforeLabel}</span>
      </div>
      <div className="relative h-full w-full overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={afterSrc} alt={afterLabel} className="absolute inset-0 h-full w-full select-none object-cover" draggable={false} />
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-[10px] font-semibold tracking-[0.12em]">{afterLabel}</span>
      </div>
    </div>
  );
}
