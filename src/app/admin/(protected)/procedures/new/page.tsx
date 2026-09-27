import { PageTitle } from "@/components/admin/ui";
import { ProcedureForm } from "@/components/admin/ProcedureForm";

export default function NewProcedurePage() {
  return (
    <div>
      <PageTitle title="New procedure" />
      <ProcedureForm />
    </div>
  );
}
