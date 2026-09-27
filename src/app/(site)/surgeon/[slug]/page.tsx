import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSurgeonBySlug } from "@/lib/queries";
import { SurgeonProfile } from "@/components/surgeon/SurgeonProfile";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const surgeon = await getSurgeonBySlug(params.slug);
  if (!surgeon) return {};
  return {
    title: surgeon.seoTitle || surgeon.name,
    description: surgeon.seoDescription || surgeon.specialty,
    alternates: { canonical: `/surgeon/${surgeon.slug}` }
  };
}

export default async function SurgeonBySlugPage({ params }: { params: { slug: string } }) {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const surgeon = await getSurgeonBySlug(params.slug);
  if (!surgeon) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    name: surgeon.name,
    medicalSpecialty: surgeon.specialty,
    ...(surgeon.clinicAffiliation ? { affiliation: surgeon.clinicAffiliation } : {})
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <SurgeonProfile surgeon={surgeon} locale={locale} dict={dict} />
    </>
  );
}
