import Link from "next/link";
import type { Dictionary } from "@/lib/i18n/dictionaries";

export function Hero({ dict }: { dict: Dictionary }) {
  return (
    <section className="px-3 pt-3 sm:px-5 lg:px-[4vw]">
      <div
        className="relative overflow-hidden rounded-[28px] text-white sm:min-h-[70vh] sm:rounded-[32px] lg:min-h-[78vh]"
        style={{
          background:
            "radial-gradient(circle at 77% 27%, rgba(217,190,158,.28), transparent 40%), linear-gradient(120deg,#171514 0%, #2d2521 46%, #766153 100%)"
        }}
      >
        {/* Mobile: content flows naturally (padding, no fixed height) so it can never get clipped —
            vh units are unreliable on mobile browsers with dynamic toolbars anyway.
            sm+: reverts to the bottom-anchored editorial layout inside the min-h card above. */}
        <div className="max-w-[780px] px-6 py-14 sm:absolute sm:inset-x-[7vw] sm:bottom-[8vh] sm:px-0 sm:py-0">
          <p className="kicker !text-gold-light">{dict.home.kicker}</p>
          <h1 className="font-serif text-[clamp(46px,9vw,122px)] leading-[1.02]">
            {dict.home.titleLine1}
            <br />
            {dict.home.titleLine2}
            <br />
            <em className="not-italic text-[#d2b795]">{dict.home.titleLine3}</em>
          </h1>
          <p className="mt-6 max-w-[560px] text-lg text-[#ded7cf]">{dict.home.subhead}</p>
          <div className="mt-8 flex flex-wrap gap-3.5">
            <Link href="/consultation" className="btn-wine">
              {dict.home.ctaPrimary}
            </Link>
            <Link href="/journey" className="btn-ghost">
              {dict.home.ctaSecondary}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
