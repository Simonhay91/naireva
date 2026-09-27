import { PageTitle } from "@/components/admin/ui";
import { SurgeonForm } from "@/components/admin/SurgeonForm";

export default function NewSurgeonPage() {
  return (
    <div>
      <PageTitle title="New surgeon" />
      <SurgeonForm />
    </div>
  );
}
