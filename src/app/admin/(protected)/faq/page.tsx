import { db } from "@/lib/db";
import { Card, PageTitle, AdminField, adminInput, SubmitButton } from "@/components/admin/ui";
import { createFaq, updateFaq, deleteFaq } from "@/app/admin/_actions/faq";

export const dynamic = "force-dynamic";

export default async function AdminFaqPage() {
  const [faqs, procedures] = await Promise.all([
    db.fAQ.findMany({ orderBy: { sortOrder: "asc" } }),
    db.procedure.findMany({ orderBy: { title: "asc" } })
  ]);

  return (
    <div>
      <PageTitle title="FAQ" />

      <Card className="mb-8">
        <h3 className="mb-4 font-semibold">Add a question</h3>
        <form action={createFaq} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <AdminField label="Question">
            <input name="question" required className={adminInput} />
          </AdminField>
          <AdminField label="Category">
            <input name="category" defaultValue="general" className={adminInput} />
          </AdminField>
          <AdminField label="Answer" hint="">
            <textarea name="answer" required rows={3} className={`${adminInput} sm:col-span-2`} />
          </AdminField>
          <AdminField label="Related procedure (optional)">
            <select name="procedureId" className={adminInput}>
              <option value="">—</option>
              {procedures.map((p) => (
                <option key={p.id} value={p.id}>{p.title}</option>
              ))}
            </select>
          </AdminField>
          <AdminField label="Sort order">
            <input type="number" name="sortOrder" defaultValue={faqs.length} className={adminInput} />
          </AdminField>
          <AdminField label="Question (RU, optional)">
            <input name="questionRu" className={adminInput} />
          </AdminField>
          <AdminField label="Answer (RU, optional)">
            <textarea name="answerRu" rows={3} className={adminInput} />
          </AdminField>
          <div className="sm:col-span-2">
            <SubmitButton>Add question</SubmitButton>
          </div>
        </form>
      </Card>

      <div className="space-y-4">
        {faqs.map((faq) => (
          <Card key={faq.id}>
            <form action={updateFaq} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={faq.id} />
              <AdminField label="Question">
                <input name="question" defaultValue={faq.question} required className={adminInput} />
              </AdminField>
              <AdminField label="Category">
                <input name="category" defaultValue={faq.category} className={adminInput} />
              </AdminField>
              <AdminField label="Answer">
                <textarea name="answer" defaultValue={faq.answer} required rows={3} className={`${adminInput} sm:col-span-2`} />
              </AdminField>
              <AdminField label="Related procedure">
                <select name="procedureId" defaultValue={faq.procedureId ?? ""} className={adminInput}>
                  <option value="">—</option>
                  {procedures.map((p) => (
                    <option key={p.id} value={p.id}>{p.title}</option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Sort order">
                <input type="number" name="sortOrder" defaultValue={faq.sortOrder} className={adminInput} />
              </AdminField>
              <AdminField label="Question (RU, optional)">
                <input name="questionRu" defaultValue={faq.questionRu ?? ""} className={adminInput} />
              </AdminField>
              <AdminField label="Answer (RU, optional)">
                <textarea name="answerRu" defaultValue={faq.answerRu ?? ""} rows={3} className={adminInput} />
              </AdminField>
              <label className="flex items-center gap-2 text-sm sm:col-span-2">
                <input type="checkbox" name="isActive" defaultChecked={faq.isActive} /> Active
              </label>
              <div className="flex items-center gap-4 sm:col-span-2">
                <SubmitButton>Save</SubmitButton>
              </div>
            </form>
            <form action={deleteFaq} className="mt-2">
              <input type="hidden" name="id" value={faq.id} />
              <button className="text-xs text-red-600 hover:underline">Delete</button>
            </form>
          </Card>
        ))}
        {!faqs.length && <p className="text-muted">No FAQs yet.</p>}
      </div>
    </div>
  );
}
