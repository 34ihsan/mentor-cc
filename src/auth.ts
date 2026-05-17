import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  debug: true,
  secret: process.env.AUTH_SECRET || "bba4a6ff-71ab-4dfc-a51f-e52586209036883bff8c-2488-478a-a7bc-ab818b84ed74",
  trustHost: true,
  callbacks: {
    ...authConfig.callbacks,
    async jwt(params) {
      // Run the base jwt callback from auth.config
      let token = await authConfig.callbacks.jwt(params);

      // Perform impersonation check strictly in Node.js runtime (never runs in middleware Edge runtime)
      if (token.role === "ADMIN") {
        try {
          const { cookies } = await import("next/headers");
          const cookieStore = await cookies();
          const impersonatedId = cookieStore.get("impersonated_user_id")?.value;
          const impersonatedRole = cookieStore.get("impersonated_user_role")?.value;
          
          if (impersonatedId && impersonatedId !== token.id) {
            token.isImpersonating = true;
            token.originalId = (token.originalId as string) || (token.id as string);
            token.id = impersonatedId;
            if (impersonatedRole) {
              token.role = impersonatedRole;
            }
          }
        } catch (e) {
          // cookies() might fail in some contexts, ignore
        }
      }

      return token;
    }
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        const email = (credentials.email as string).toLowerCase().trim();
        const password = credentials.password as string;

        console.log("Authorize attempt for:", email);

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            console.log("User not found or no password for:", email);
            return null;
          }

          const isPasswordValid = await compare(password, user.password);

          if (!isPasswordValid) {
            console.log("Invalid password for:", email);
            return null;
          }

          console.log("Authentication successful for:", email);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
});
