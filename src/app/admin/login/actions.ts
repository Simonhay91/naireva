"use server";

import { headers } from "next/headers";
import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";
import { rateLimit, requestIp } from "@/lib/rate-limit";

export async function loginAction(_prevState: { error?: string } | undefined, formData: FormData) {
  const ip = requestIp(headers());
  const { allowed } = rateLimit(`admin-login:${ip}`, 8, 10 * 60 * 1000);
  if (!allowed) {
    return { error: "Too many login attempts. Please wait a few minutes and try again." };
  }

  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const callbackUrl = String(formData.get("callbackUrl") ?? "/admin");

  try {
    await signIn("credentials", { email, password, redirectTo: callbackUrl });
    return {};
  } catch (err) {
    if (err instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw err;
  }
}
