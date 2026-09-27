import Image from "next/image";
import Link from "next/link";
import type { Surgeon, SurgeonImage, SurgeonVideo, Procedure } from "@prisma/client";
import { PageHero } from "@/components/ui/PageHero";
import { GalleryLightbox } from "@/components/surgeon/GalleryLightbox";
import type { Locale, Dictionary } from "@/lib/i18n/dictionaries";
import { localized } from "@/lib/i18n/localized";

type FullSurgeon = Surgeon & { images: SurgeonImage[]; videos: SurgeonVideo[]; procedures: Procedure[] };

export function SurgeonProfile({ surgeon, locale, dict }: { surgeon: FullSurgeon; locale: Locale; dict: Dictionary }) {
  const t = dict.surgeon;
  const education = Array.isArray(surgeon.education) ? (surgeon.education as { degree: string; institution: string; year?: string }[]) : [];
  const certifications = Array.isArray(surgeon.certifications) ? (surgeon.certifications as string[]) : [];
  const languages = Array.isArray(surgeon.languages) ? (surgeon.languages as string[]) : [];
  const main = surgeon.images[0]?.url ?? surgeon.heroImage;
  const inset = surgeon.images[1]?.url;
  const gallery = surgeon.images.slice(2);

  const specialty = localized(locale, surgeon.specialty, surgeon.specialtyRu);
  const clinicAffiliation = localized(locale, surgeon.clinicAffiliation ?? "", surgeon.clinicAffiliationRu);
  const biography = localized(locale, surgeon.biography, surgeon.biographyRu);
  const experience = surgeon.experience ? localized(locale, surgeon.experience, surgeon.experienceRu) : null;

  return (
    <>
      <PageHero
        breadcrumb={[{ label: dict.common.home, href: "/" }, { label: t.breadcrumb }]}
        kicker={t.kicker}
        title={surgeon.name}
        lead={`${specialty}${clinicAffiliation ? ` · ${clinicAffiliation}` : ""}`}
      />

      <section className="section pt-0">
        <div className="wrap grid grid-cols-1 overflow-hidden rounded-3xl border border-line lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative min-h-[420px] lg:min-h-[620px]">
            {main && <Image src={main} alt={surgeon.name} fill className="object-cover" sizes="(min-width: 1024px) 45vw, 100vw" />}
            {inset && (
              <div className="absolute bottom-5 right-5 hidden aspect-square w-[28%] overflow-hidden rounded-2xl border-[5px] border-white shadow-xl sm:block">
                <Image src={inset} alt={t.teamPhotoAlt} fill className="object-cover" sizes="20vw" />
              </div>
            )}
          </div>
          <div className="bg-paper p-8 sm:p-12 lg:p-[6vw]">
            <p className="kicker">{t.consultationKicker}</p>
            <h2 className="font-serif text-[clamp(30px,4vw,44px)]">{t.consultationTitle}</h2>
            <p className="mt-5 text-lg text-muted">{t.consultationLead}</p>
            <div className="mt-8 border-t border-line">
              {t.steps.map((item, i) => (
                <div key={item} className="grid grid-cols-[50px_1fr] border-b border-line py-4">
                  <span className="text-xs text-wine">{String(i + 1).padStart(2, "0")}</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <p className="kicker">{t.biographyKicker}</p>
            <div className="mt-3 space-y-4 text-[17px] leading-[1.75] text-[#504b46]">
              {biography.split(/\n{2,}/).map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {experience && (
              <>
                <p className="kicker mt-10">{t.approachKicker}</p>
                <p className="mt-3 text-[17px] leading-[1.75] text-[#504b46]">{experience}</p>
              </>
            )}
          </div>

          <div className="space-y-10">
            {education.length > 0 && (
              <div>
                <p className="kicker">{t.educationKicker}</p>
                <div className="mt-3 divide-y divide-line border-t border-line">
                  {education.map((e, i) => (
                    <div key={i} className="flex items-baseline justify-between gap-4 py-3 text-sm">
                      <span>
                        {e.degree}
                        {e.institution ? ` — ${e.institution}` : ""}
                      </span>
                      {e.year && <span className="text-muted">{e.year}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications.length > 0 && (
              <div>
                <p className="kicker">{t.certificationsKicker}</p>
                <ul className="mt-3 space-y-2 text-sm">
                  {certifications.map((c) => (
                    <li key={c} className="flex gap-2">
                      <span className="text-wine">—</span> {c}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {languages.length > 0 && (
              <div>
                <p className="kicker">{t.languagesKicker}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {languages.map((l) => (
                    <span key={l} className="rounded-full border border-line px-3 py-1.5 text-xs">
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {surgeon.procedures.length > 0 && (
              <div>
                <p className="kicker">{t.proceduresKicker}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {surgeon.procedures.map((p) => (
                    <Link key={p.id} href={`/procedures/${p.slug}`} className="rounded-full border border-line px-3 py-1.5 text-xs hover:border-wine hover:text-wine">
                      {localized(locale, p.title, p.titleRu)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </section>

      {gallery.length > 0 && (
        <section className="section pt-0">
          <div className="wrap">
            <p className="kicker">{t.galleryKicker}</p>
            <GalleryLightbox images={gallery} fallbackAlt={surgeon.name} />
          </div>
        </section>
      )}

      <section className="section pt-0">
        <div className="wrap text-center">
          <Link href="/consultation" className="btn-wine inline-flex">
            {dict.common.requestConsultation}
          </Link>
        </div>
      </section>
    </>
  );
}
