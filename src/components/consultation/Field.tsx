import type { ReactNode } from "react";

export function Field({ label, full, children }: { label: string; full?: boolean; children: ReactNode }) {
  return (
    <label className={`flex flex-col gap-2 text-[11px] uppercase tracking-[0.05em] text-[#665f59] ${full ? "sm:col-span-2" : ""}`}>
      {label}
      {children}
    </label>
  );
}

export const inputClass =
  "border-0 border-b border-[#bfb5aa] bg-transparent px-0.5 py-3.5 font-sans text-[15px] normal-case tracking-normal text-ink outline-none transition focus:border-wine";
