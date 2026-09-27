import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { authConfig } from "@/lib/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const user = await db.user.findUnique({ where: { email: email.toLowerCase().trim() } });
        if (!user || !user.isActive) return null;

        const valid = await bcrypt.compare(password, user.passwordHash);
        if (!valid) return null;

        return { id: user.id, name: user.name, email: user.email, role: user.role };
      }
    })
  ]
});

export const ADMIN_ROLES = ["ADMIN", "COORDINATOR", "MEDICAL_TEAM", "SURGEON"] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

/** Roles allowed to change lead/case status and assignment; SURGEON is read + notes only. */
export function canManageLeads(role?: string) {
  return role === "ADMIN" || role === "COORDINATOR" || role === "MEDICAL_TEAM";
}

export function isAdmin(role?: string) {
  return role === "ADMIN";
}
