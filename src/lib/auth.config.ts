import type { NextAuthConfig } from "next-auth";

/**
 * Edge-safe subset of the NextAuth config: no Credentials provider (its
 * `authorize` needs Prisma, which isn't edge-runtime compatible), just the
 * pieces middleware needs to read the JWT session cookie and decide whether
 * a request is authenticated. The full config with the real provider lives
 * in auth.ts and runs in the Node runtime (API routes, server components).
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    }
  }
};
