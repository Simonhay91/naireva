import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { PageTitle } from "@/components/admin/ui";
import { JournalPostForm } from "@/components/admin/JournalPostForm";

export const dynamic = "force-dynamic";

export default async function EditJournalPostPage({ params }: { params: { id: string } }) {
  const post = await db.blogPost.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <div>
      <PageTitle title={post.title} />
      <JournalPostForm post={post} />
    </div>
  );
}
