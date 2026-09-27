import { db } from "@/lib/db";

const caseInclude = {
  procedure: true,
  surgeon: true,
  photos: { orderBy: { createdAt: "asc" } },
  notes: { include: { author: { select: { name: true } } }, orderBy: { createdAt: "desc" } },
  videoConsultations: { orderBy: { scheduledAt: "desc" }, include: { surgeon: true } },
  trips: { orderBy: { createdAt: "desc" } }
} as const;

export function getLeadDetail(id: string) {
  return db.lead.findUnique({
    where: { id },
    include: {
      assignedTo: true,
      cases: { include: caseInclude, orderBy: { createdAt: "desc" } },
      activityLogs: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } }
    }
  });
}

export function getCaseDetail(id: string) {
  return db.medicalCase.findUnique({
    where: { id },
    include: {
      ...caseInclude,
      lead: true,
      activityLogs: { include: { user: { select: { name: true } } }, orderBy: { createdAt: "desc" } }
    }
  });
}

export function listCases() {
  return db.medicalCase.findMany({
    include: { lead: true, procedure: true, surgeon: true },
    orderBy: { createdAt: "desc" },
    take: 200
  });
}

export function listCoordinators() {
  return db.user.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
}

export function listActiveSurgeonsAdmin() {
  return db.surgeon.findMany({ orderBy: { name: "asc" } });
}
