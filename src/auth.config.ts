import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnDashboard || isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }
      return true;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = (token.role as string) || "STUDENT";
        session.user.id = token.id as string;
        
        // Add impersonation info to session
        if (token.isImpersonating) {
            session.user.isImpersonating = true;
            session.user.originalId = token.originalId;
        }
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role || "STUDENT";
        token.id = user.id;
      }

      return token;
    },
  },
  providers: [], // Add empty providers array, will be populated in auth.ts
  trustHost: true,
  secret: process.env.AUTH_SECRET || "bba4a6ff-71ab-4dfc-a51f-e52586209036883bff8c-2488-478a-a7bc-ab818b84ed74",
  session: { strategy: "jwt" },
  cookies: {
    sessionToken: {
      name: `next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
    callbackUrl: {
      name: `next-auth.callback-url`,
      options: {
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
    csrfToken: {
      name: `next-auth.csrf-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: false,
      },
    },
  },
} satisfies NextAuthConfig;
