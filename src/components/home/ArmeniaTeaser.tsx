import Link from "next/link";
import { dictionaries, defaultLocale, type Dictionary } from "@/lib/i18n/dictionaries";

export function ArmeniaTeaser({ dict }: { dict?: Dictionary }) {
  const t = (dict ?? dictionaries[defaultLocale]).home.armeniaTeaser;

  return (
    <section
      className="relative mx-3 mb-20 flex min-h-[520px] items-end overflow-hidden rounded-3xl text-white sm:mx-5 lg:mx-[4vw]"
      style={{
        background:
          "linear-gradient(100deg, rgba(26,19,17,.95), rgba(26,19,17,.35)), radial-gradient(circle at 76% 30%, #a28a73, #6e584a 35%, #302725 72%)"
      }}
    >
      <div className="section max-w-[850px]">
        <p className="kicker !text-gold-light">{t.kicker}</p>
        <h2 className="font-serif text-[clamp(34px,5.5vw,58px)] leading-[1.05]">
          {t.titleLine1}
          <br />
          {t.titleLine2}
        </h2>
        <p className="mt-5 max-w-xl text-lg text-[#ddd]">{t.lead}</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {t.pills.map((p) => (
            <span key={p} className="rounded-full border border-white/30 px-3.5 py-2 text-xs">
              {p}
            </span>
          ))}
        </div>
        <Link href="/armenia" className="btn-ghost mt-8">
          {t.cta}
        </Link>
      </div>
    </section>
  );
}
