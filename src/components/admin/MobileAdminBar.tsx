"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { adminNav } from "./Sidebar";

export function MobileAdminBar({ role, name }: { role: string; name: string }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="bg-charcoal text-white">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/admin" className="text-[14px] font-semibold tracking-[0.28em]">
          NAIREVA
        </Link>
        <button
          aria-label="Menu"
          onClick={() => setOpen((v) => !v)}
          className="relative flex h-9 w-9 items-center justify-center"
        >
          <span
            className={cn(
              "absolute h-px w-5 bg-white transition-transform duration-300",
              open ? "rotate-45" : "-translate-y-[6px]"
            )}
          />
          <span className={cn("absolute h-px w-5 bg-white transition-opacity duration-300", open && "opacity-0")} />
          <span
            className={cn(
              "absolute h-px w-5 bg-white transition-transform duration-300",
              open ? "-rotate-45" : "translate-y-[6px]"
            )}
          />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 px-6 pb-6">
          <nav className="flex flex-col gap-1 pt-4">
            {adminNav.map((item) => {
              const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
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
          <div className="mt-4 border-t border-white/10 pt-4">
            <p className="text-sm">{name}</p>
            <p className="text-xs text-white/50">{role}</p>
            <Link href="/admin/logout" className="mt-3 inline-block text-xs text-white/60 hover:text-white">
              Sign out
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
