"use server";

import { revalidatePath } from "next/cache";
import { auth, canManageLeads } from "@/lib/auth";
import { db } from "@/lib/db";

async function requireManager() {
  const session = await auth();
  if (!session?.user || !canManageLeads(session.user.role)) {
    throw new Error("Not authorized.");
  }
  return session.user;
}

export async function updateLeadStatus(formData: FormData) {
  const user = await requireManager();
  const leadId = String(formData.get("leadId"));
  const status = String(formData.get("status"));

  await db.lead.update({ where: { id: leadId }, data: { status: status as never } });
  await db.activityLog.create({
    data: { leadId, type: "STATUS_CHANGE", message: `Status changed to ${status}`, userId: user.id }
  });

  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
}

export async function assignLead(formData: FormData) {
  const user = await requireManager();
  const leadId = String(formData.get("leadId"));
  const assignedToId = String(formData.get("assignedToId") || "") || null;

  await db.lead.update({ where: { id: leadId }, data: { assignedToId } });
  await db.activityLog.create({
    data: {
      leadId,
      type: "ASSIGNED",
      message: assignedToId ? "Lead assigned to a coordinator." : "Lead unassigned.",
      userId: user.id
    }
  });

  revalidatePath(`/admin/leads/${leadId}`);
  revalidatePath("/admin/leads");
}
