import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { humanizeEnum } from "@/lib/utils";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-2xl border border-line bg-white p-6", className)}>{children}</div>;
}

export function PageTitle({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <h1 className="font-serif text-3xl text-ink">{title}</h1>
      {action}
    </div>
  );
}

export function StatCard({ label, value, hint }: { label: string; value: string | number; hint?: string }) {
  return (
    <Card>
      <p className="text-xs uppercase tracking-wide text-muted">{label}</p>
      <p className="mt-2 font-serif text-4xl">{value}</p>
      {hint && <p className="mt-1 text-xs text-muted">{hint}</p>}
    </Card>
  );
}

const STATUS_COLORS: Record<string, string> = {
  NEW: "bg-blue-50 text-blue-700",
  CONTACTED: "bg-indigo-50 text-indigo-700",
  QUALIFIED: "bg-purple-50 text-purple-700",
  MEDICAL_REVIEW: "bg-amber-50 text-amber-700",
  SURGEON_REVIEWED: "bg-amber-50 text-amber-700",
  SURGEON_REVIEW: "bg-amber-50 text-amber-700",
  VIDEO_CALL_PENDING: "bg-orange-50 text-orange-700",
  AWAITING_VIDEO_CALL: "bg-orange-50 text-orange-700",
  VIDEO_CALL_DONE: "bg-teal-50 text-teal-700",
  OFFER_SENT: "bg-cyan-50 text-cyan-700",
  CONFIRMED: "bg-emerald-50 text-emerald-700",
  PLAN_CONFIRMED: "bg-emerald-50 text-emerald-700",
  TRAVEL_PLANNED: "bg-emerald-50 text-emerald-700",
  ARRIVED: "bg-green-50 text-green-700",
  SURGERY_DONE: "bg-green-50 text-green-700",
  IN_TREATMENT: "bg-green-50 text-green-700",
  RECOVERY: "bg-lime-50 text-lime-700",
  COMPLETED: "bg-stone-100 text-stone-700",
  CLOSED: "bg-stone-100 text-stone-700",
  LOST: "bg-red-50 text-red-700",
  SCHEDULED: "bg-amber-50 text-amber-700",
  CANCELLED: "bg-red-50 text-red-700",
  NO_SHOW: "bg-red-50 text-red-700",
  RESCHEDULED: "bg-orange-50 text-orange-700",
  DRAFT: "bg-stone-100 text-stone-700",
  PUBLISHED: "bg-emerald-50 text-emerald-700",
  ARCHIVED: "bg-stone-100 text-stone-500",
  PENDING: "bg-amber-50 text-amber-700",
  GRANTED: "bg-emerald-50 text-emerald-700",
  REVOKED: "bg-red-50 text-red-700"
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold", STATUS_COLORS[status] ?? "bg-stone-100 text-stone-700")}>
      {humanizeEnum(status)}
    </span>
  );
}

export const adminInput =
  "w-full rounded-lg border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:border-wine focus:ring-1 focus:ring-wine";

export function AdminField({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-muted">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function SubmitButton({ children }: { children: ReactNode }) {
  return (
    <button type="submit" className="rounded-full bg-wine px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-wine-dark">
      {children}
    </button>
  );
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <div className="rounded-2xl border border-dashed border-line p-10 text-center text-muted">{children}</div>;
}
