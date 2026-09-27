"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const adminNav = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/cases", label: "Medical cases" },
  { href: "/admin/surgeons", label: "Surgeons" },
  { href: "/admin/procedures", label: "Procedures" },
  { href: "/admin/before-after", label: "Before / After" },
  { href: "/admin/journal", label: "Journal" },
  { href: "/admin/faq", label: "FAQ" }
];

export function Sidebar({ role, name }: { role: string; name: string }) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-full flex-col justify-between bg-charcoal p-6 text-white">
      <div>
        <Link href="/admin" className="text-[15px] font-semibold tracking-[0.28em]">
          NAIREVA
        </Link>
        <p className="mt-1 text-[11px] uppercase tracking-wide text-gold">Admin</p>

        <nav className="mt-10 flex flex-col gap-1">
          {adminNav.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2.5 text-sm transition",
                  active ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/10 pt-5">
        <p className="text-sm">{name}</p>
        <p className="text-xs text-white/50">{role}</p>
        <Link href="/admin/logout" className="mt-3 inline-block text-xs text-white/60 hover:text-white">
          Sign out
        </Link>
      </div>
    </aside>
  );
}
