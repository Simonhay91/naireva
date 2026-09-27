import type { Procedure } from "@prisma/client";
import { AdminField, adminInput, SubmitButton, Card } from "@/components/admin/ui";
import { createProcedure, updateProcedure, deleteProcedure } from "@/app/admin/_actions/procedures";

export function ProcedureForm({ procedure }: { procedure?: Procedure }) {
  const gallery = Array.isArray(procedure?.gallery) ? (procedure!.gallery as string[]) : [];
  const action = procedure ? updateProcedure : createProcedure;

  return (
    <div className="space-y-6">
    <form action={action} className="space-y-6">
      {procedure && <input type="hidden" name="id" value={procedure.id} />}
      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AdminField label="Title">
            <input name="title" required defaultValue={procedure?.title} className={adminInput} />
          </AdminField>
          <AdminField label="Slug" hint="Used in the URL, e.g. rhinoplasty">
            <input name="slug" required defaultValue={procedure?.slug} className={adminInput} />
          </AdminField>
          <AdminField label="Short description" hint="Shown on cards and previews">
            <input name="shortDescription" required defaultValue={procedure?.shortDescription} className={adminInput} />
          </AdminField>
          <AdminField label="Hero image URL">
            <input name="heroImage" defaultValue={procedure?.heroImage ?? ""} className={adminInput} />
          </AdminField>
        </div>
      </Card>

      <Card>
        <AdminField label="Full content" hint="Use blank lines between paragraphs; ## for headings, - for bullet lists">
          <textarea name="content" required rows={12} defaultValue={procedure?.content} className={adminInput} />
        </AdminField>
        <div className="mt-4">
          <AdminField label="Recovery overview (optional)">
            <textarea name="recoveryOverview" rows={4} defaultValue={procedure?.recoveryOverview ?? ""} className={adminInput} />
          </AdminField>
        </div>
        <div className="mt-4">
          <AdminField label="Gallery image URLs" hint="One per line">
            <textarea name="gallery" rows={4} defaultValue={gallery.join("\n")} className={adminInput} />
          </AdminField>
        </div>
      </Card>

      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AdminField label="SEO title">
            <input name="seoTitle" defaultValue={procedure?.seoTitle ?? ""} className={adminInput} />
          </AdminField>
          <AdminField label="SEO description">
            <input name="seoDescription" defaultValue={procedure?.seoDescription ?? ""} className={adminInput} />
          </AdminField>
        </div>
        <label className="mt-4 flex items-center gap-2 text-sm">
          <input type="checkbox" name="isActive" defaultChecked={procedure?.isActive ?? true} /> Active (visible on the public site)
        </label>
      </Card>

      <Card>
        <details>
          <summary className="cursor-pointer text-sm font-semibold text-ink">
            Russian translation (optional — falls back to English above when empty)
          </summary>
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AdminField label="Title (RU)">
                <input name="titleRu" defaultValue={procedure?.titleRu ?? ""} className={adminInput} />
              </AdminField>
              <AdminField label="Short description (RU)">
                <input name="shortDescriptionRu" defaultValue={procedure?.shortDescriptionRu ?? ""} className={adminInput} />
              </AdminField>
            </div>
            <AdminField label="Full content (RU)">
              <textarea name="contentRu" rows={10} defaultValue={procedure?.contentRu ?? ""} className={adminInput} />
            </AdminField>
            <AdminField label="Recovery overview (RU)">
              <textarea name="recoveryOverviewRu" rows={3} defaultValue={procedure?.recoveryOverviewRu ?? ""} className={adminInput} />
            </AdminField>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AdminField label="SEO title (RU)">
                <input name="seoTitleRu" defaultValue={procedure?.seoTitleRu ?? ""} className={adminInput} />
              </AdminField>
              <AdminField label="SEO description (RU)">
                <input name="seoDescriptionRu" defaultValue={procedure?.seoDescriptionRu ?? ""} className={adminInput} />
              </AdminField>
            </div>
          </div>
        </details>
      </Card>

      <SubmitButton>{procedure ? "Save changes" : "Create procedure"}</SubmitButton>
    </form>
    {procedure && (
      <form action={deleteProcedure}>
        <input type="hidden" name="id" value={procedure.id} />
        <button className="text-sm text-red-600 hover:underline">Delete procedure</button>
      </form>
    )}
    </div>
  );
}
