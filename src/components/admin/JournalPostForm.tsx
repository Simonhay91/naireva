import type { BlogPost } from "@prisma/client";
import { AdminField, adminInput, SubmitButton, Card } from "@/components/admin/ui";
import { createPost, updatePost, deletePost } from "@/app/admin/_actions/journal";

const CATEGORIES = ["RHINOPLASTY", "RECOVERY", "ARMENIA", "CONSULTATION", "TRAVEL", "AESTHETIC_SURGERY"];

export function JournalPostForm({ post }: { post?: BlogPost }) {
  const action = post ? updatePost : createPost;

  return (
    <div className="space-y-6">
      <form action={action} className="space-y-6">
        {post && <input type="hidden" name="id" value={post.id} />}
        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <AdminField label="Title">
              <input name="title" required defaultValue={post?.title} className={adminInput} />
            </AdminField>
            <AdminField label="Slug">
              <input name="slug" required defaultValue={post?.slug} className={adminInput} />
            </AdminField>
            <AdminField label="Category">
              <select name="category" defaultValue={post?.category ?? "AESTHETIC_SURGERY"} className={adminInput}>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c.replace(/_/g, " ")}</option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Hero image URL">
              <input name="heroImage" defaultValue={post?.heroImage ?? ""} className={adminInput} />
            </AdminField>
          </div>
          <div className="mt-4">
            <AdminField label="Excerpt">
              <textarea name="excerpt" required rows={2} defaultValue={post?.excerpt} className={adminInput} />
            </AdminField>
          </div>
        </Card>

        <Card>
          <AdminField label="Body" hint="Blank lines between paragraphs; ## for headings, - for bullet lists">
            <textarea name="body" required rows={16} defaultValue={post?.body} className={adminInput} />
          </AdminField>
        </Card>

        <Card>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AdminField label="Status">
              <select name="status" defaultValue={post?.status ?? "DRAFT"} className={adminInput}>
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </AdminField>
            <AdminField label="SEO title">
              <input name="seoTitle" defaultValue={post?.seoTitle ?? ""} className={adminInput} />
            </AdminField>
            <AdminField label="SEO description">
              <input name="seoDescription" defaultValue={post?.seoDescription ?? ""} className={adminInput} />
            </AdminField>
          </div>
        </Card>

        <Card>
          <details>
            <summary className="cursor-pointer text-sm font-semibold text-ink">
              Russian translation (optional — falls back to English above when empty)
            </summary>
            <div className="mt-4 space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AdminField label="Title (RU)">
                  <input name="titleRu" defaultValue={post?.titleRu ?? ""} className={adminInput} />
                </AdminField>
                <AdminField label="Excerpt (RU)">
                  <input name="excerptRu" defaultValue={post?.excerptRu ?? ""} className={adminInput} />
                </AdminField>
              </div>
              <AdminField label="Body (RU)">
                <textarea name="bodyRu" rows={12} defaultValue={post?.bodyRu ?? ""} className={adminInput} />
              </AdminField>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AdminField label="SEO title (RU)">
                  <input name="seoTitleRu" defaultValue={post?.seoTitleRu ?? ""} className={adminInput} />
                </AdminField>
                <AdminField label="SEO description (RU)">
                  <input name="seoDescriptionRu" defaultValue={post?.seoDescriptionRu ?? ""} className={adminInput} />
                </AdminField>
              </div>
            </div>
          </details>
        </Card>

        <SubmitButton>{post ? "Save changes" : "Create post"}</SubmitButton>
      </form>
      {post && (
        <form action={deletePost}>
          <input type="hidden" name="id" value={post.id} />
          <button className="text-sm text-red-600 hover:underline">Delete post</button>
        </form>
      )}
    </div>
  );
}
