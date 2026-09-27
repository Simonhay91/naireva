import type { Surgeon, SurgeonImage, SurgeonVideo } from "@prisma/client";
import { AdminField, adminInput, SubmitButton, Card } from "@/components/admin/ui";
import { createSurgeon, updateSurgeon, deleteSurgeon } from "@/app/admin/_actions/surgeons";

type FullSurgeon = Surgeon & { images: SurgeonImage[]; videos: SurgeonVideo[] };

export function SurgeonForm({ surgeon }: { surgeon?: FullSurgeon }) {
  const education = Array.isArray(surgeon?.education) ? (surgeon!.education as { degree: string }[]) : [];
  const certifications = Array.isArray(surgeon?.certifications) ? (surgeon!.certifications as string[]) : [];
  const languages = Array.isArray(surgeon?.languages) ? (surgeon!.languages as string[]) : [];
  const action = surgeon ? updateSurgeon : createSurgeon;

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-6">
        {surgeon && <input type="hidden" name="id" value={surgeon.id} />}
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Name">
              <input name="name" required defaultValue={surgeon?.name} className={adminInput} />
            </AdminField>
            <AdminField label="Slug">
              <input name="slug" required defaultValue={surgeon?.slug} className={adminInput} />
            </AdminField>
            <AdminField label="Specialty">
              <input name="specialty" required defaultValue={surgeon?.specialty} className={adminInput} />
            </AdminField>
            <AdminField label="Clinic affiliation">
              <input name="clinicAffiliation" defaultValue={surgeon?.clinicAffiliation ?? ""} className={adminInput} />
            </AdminField>
            <AdminField label="Hero image URL">
              <input name="heroImage" defaultValue={surgeon?.heroImage ?? ""} className={adminInput} />
            </AdminField>
            <AdminField label="Instagram URL" hint="Stored for internal reference only — never shown publicly, by design.">
              <input name="instagramUrl" defaultValue={surgeon?.instagramUrl ?? ""} className={adminInput} />
            </AdminField>
          </div>
        </Card>

        <Card>
          <AdminField label="Biography" hint="Separate paragraphs with a blank line">
            <textarea name="biography" required rows={8} defaultValue={surgeon?.biography} className={adminInput} />
          </AdminField>
          <div className="mt-4">
            <AdminField label="Approach / experience (optional)">
              <textarea name="experience" rows={4} defaultValue={surgeon?.experience ?? ""} className={adminInput} />
            </AdminField>
          </div>
        </Card>

        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AdminField label="Education" hint="One entry per line">
              <textarea name="education" rows={4} defaultValue={education.map((e) => e.degree).join("\n")} className={adminInput} />
            </AdminField>
            <AdminField label="Certifications" hint="One per line">
              <textarea name="certifications" rows={4} defaultValue={certifications.join("\n")} className={adminInput} />
            </AdminField>
            <AdminField label="Languages" hint="One per line">
              <textarea name="languages" rows={4} defaultValue={languages.join("\n")} className={adminInput} />
            </AdminField>
          </div>
        </Card>

        <Card>
          <AdminField label="Gallery images" hint='One per line: "url" or "url | caption" — first line is used as the primary photo'>
            <textarea name="images" rows={4} defaultValue={surgeon?.images.map((i) => [i.url, i.caption].filter(Boolean).join(" | ")).join("\n")} className={adminInput} />
          </AdminField>
          <div className="mt-4">
            <AdminField label="Videos" hint='One per line: "url" or "url | title"'>
              <textarea name="videos" rows={3} defaultValue={surgeon?.videos.map((v) => [v.url, v.title].filter(Boolean).join(" | ")).join("\n")} className={adminInput} />
            </AdminField>
          </div>
        </Card>

        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="SEO title">
              <input name="seoTitle" defaultValue={surgeon?.seoTitle ?? ""} className={adminInput} />
            </AdminField>
            <AdminField label="SEO description">
              <input name="seoDescription" defaultValue={surgeon?.seoDescription ?? ""} className={adminInput} />
            </AdminField>
          </div>
          <label className="mt-4 flex items-center gap-2 text-sm">
            <input type="checkbox" name="isActive" defaultChecked={surgeon?.isActive ?? true} /> Active (visible on the public site)
          </label>
        </Card>

        <Card>
          <details>
            <summary className="cursor-pointer text-sm font-semibold text-ink">
              Russian translation (optional — falls back to English above when empty)
            </summary>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AdminField label="Specialty (RU)">
                  <input name="specialtyRu" defaultValue={surgeon?.specialtyRu ?? ""} className={adminInput} />
                </AdminField>
                <AdminField label="Clinic affiliation (RU)">
                  <input name="clinicAffiliationRu" defaultValue={surgeon?.clinicAffiliationRu ?? ""} className={adminInput} />
                </AdminField>
              </div>
              <AdminField label="Biography (RU)">
                <textarea name="biographyRu" rows={8} defaultValue={surgeon?.biographyRu ?? ""} className={adminInput} />
              </AdminField>
              <AdminField label="Approach / experience (RU)">
                <textarea name="experienceRu" rows={4} defaultValue={surgeon?.experienceRu ?? ""} className={adminInput} />
              </AdminField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AdminField label="SEO title (RU)">
                  <input name="seoTitleRu" defaultValue={surgeon?.seoTitleRu ?? ""} className={adminInput} />
                </AdminField>
                <AdminField label="SEO description (RU)">
                  <input name="seoDescriptionRu" defaultValue={surgeon?.seoDescriptionRu ?? ""} className={adminInput} />
                </AdminField>
              </div>
            </div>
          </details>
        </Card>

        <SubmitButton>{surgeon ? "Save changes" : "Create surgeon"}</SubmitButton>
      </form>
      {surgeon && (
        <form action={deleteSurgeon}>
          <input type="hidden" name="id" value={surgeon.id} />
          <button className="text-sm text-red-600 hover:underline">Delete surgeon</button>
        </form>
      )}
    </div>
  );
}
