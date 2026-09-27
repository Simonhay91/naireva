import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getActiveSurgeon } from "@/lib/queries";
import { SurgeonProfile } from "@/components/surgeon/SurgeonProfile";
import { getLocale } from "@/lib/i18n/get-locale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { buildAlternates } from "@/lib/i18n/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const surgeon = await getActiveSurgeon();
  if (!surgeon) return {};
  const locale = getLocale();
  return {
    title: surgeon.seoTitle || surgeon.name,
    description: surgeon.seoDescription || surgeon.specialty,
    // English + Russian only — the bio only has *Ru translations today.
    alternates: buildAlternates(locale, "/surgeon", ["en", "ru"])
  };
}

export default async function SurgeonPage() {
  const locale = getLocale();
  const dict = getDictionary(locale);
  const surgeon = await getActiveSurgeon();
  if (!surgeon) notFound();
  return <SurgeonProfile surgeon={surgeon} locale={locale} dict={dict} />;
}
