import { PageTitle } from "@/components/admin/ui";
import { JournalPostForm } from "@/components/admin/JournalPostForm";

export default function NewJournalPostPage() {
  return (
    <div>
      <PageTitle title="New journal post" />
      <JournalPostForm />
    </div>
  );
}
