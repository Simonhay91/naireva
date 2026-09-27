import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Sign in" };

export default function AdminLoginPage({ searchParams }: { searchParams: { callbackUrl?: string } }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-6 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="text-[16px] font-semibold tracking-[0.28em]">NAIREVA</p>
          <p className="mt-1 text-xs uppercase tracking-wide text-gold">Team sign in</p>
        </div>
        <LoginForm callbackUrl={searchParams.callbackUrl ?? "/admin"} />
      </div>
    </div>
  );
}
