import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Sidebar } from "@/components/admin/Sidebar";
import { MobileAdminBar } from "@/components/admin/MobileAdminBar";

export const metadata: Metadata = {
  title: { default: "Admin", template: "%s — NAIREVA Admin" },
  robots: { index: false, follow: false }
};

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  const name = session.user.name ?? session.user.email ?? "Team member";

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#f6f4f1] font-sans text-ink lg:grid-cols-[260px_1fr]">
      <div className="hidden lg:block">
        <Sidebar role={session.user.role} name={name} />
      </div>
      <div className="min-w-0">
        <div className="sticky top-0 z-40 lg:hidden">
          <MobileAdminBar role={session.user.role} name={name} />
        </div>
        <main className="p-6 sm:p-10">{children}</main>
      </div>
    </div>
  );
}
