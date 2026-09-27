import type { Metadata } from "next";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { getActiveSurgeon, getPublishedBeforeAfter, getPublishedPosts } from "@/lib/queries";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { FeatureGrid } from "@/components/home/FeatureGrid";
import { TransformationsPreview } from "@/components/home/TransformationsPreview";
import { SurgeonPreview } from "@/components/home/SurgeonPreview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ConciergeTeaser } from "@/components/home/ConciergeTeaser";
import { WhyChooseNaireva } from "@/components/home/WhyChooseNaireva";
import { ArmeniaTeaser } from "@/components/home/ArmeniaTeaser";
import { JournalPreview } from "@/components/home/JournalPreview";
import { FinalCta } from "@/components/home/FinalCta";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Private Aesthetic Journeys in Armenia",
  alternates: { canonical: "/" }
};

export default async function HomePage() {
  const locale = getLocale();
  const dict = getDictionary(locale);

  const [surgeon, beforeAfter, posts] = await Promise.all([
    getActiveSurgeon(),
    getPublishedBeforeAfter(),
    getPublishedPosts(3)
  ]);

  return (
    <>
      <Hero dict={dict} />
      <TrustBar dict={dict} />

      <section className="section pb-4">
        <div className="wrap grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="kicker">{dict.home.intro.kicker}</p>
            <h2 className="font-serif text-[clamp(36px,5.8vw,64px)] leading-[1.05]">
              {dict.home.intro.titleLine1}
              <br />
              {dict.home.intro.titleLine2}
            </h2>
          </div>
          <p className="lead max-w-xl text-lg text-muted">{dict.home.intro.lead}</p>
        </div>
      </section>

      <FeatureGrid dict={dict} />
      <TransformationsPreview item={beforeAfter[0] ?? null} dict={dict} />
      <SurgeonPreview surgeon={surgeon} dict={dict} />
      <HowItWorks dict={dict} />
      <ConciergeTeaser dict={dict} />
      <JournalPreview posts={posts} locale={locale} dict={dict} />
      <ArmeniaTeaser dict={dict} />
      <WhyChooseNaireva dict={dict} />
      <FinalCta dict={dict} />
    </>
  );
}
