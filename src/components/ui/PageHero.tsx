import Link from "next/link";
import type { ReactNode } from "react";

export function PageHero({
  breadcrumb,
  kicker,
  title,
  lead
}: {
  breadcrumb: { label: string; href?: string }[];
  kicker: string;
  title: ReactNode;
  lead?: string;
}) {
  return (
    <section className="section pb-12 pt-16 md:pb-16">
      <div className="wrap">
        <div className="mb-5 text-xs text-[#857d75]">
          {breadcrumb.map((b, i) => (
            <span key={i}>
              {b.href ? <Link href={b.href} className="hover:text-wine">{b.label}</Link> : b.label}
              {i < breadcrumb.length - 1 && <span className="mx-1.5">/</span>}
            </span>
          ))}
        </div>
        <p className="kicker">{kicker}</p>
        <h1 className="font-serif text-[clamp(38px,7vw,84px)] leading-[1.02]">{title}</h1>
        {lead && <p className="lead mt-6 max-w-2xl text-lg text-muted">{lead}</p>}
      </div>
    </section>
  );
}
