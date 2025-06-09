// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";

const config = {
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.username,
              password: credentials.password,
            }),
          }
        );
        const user = await res.json();
        // console.log("Parsed user:", user);

        if (!res.ok || !user?.token) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          roles: user.roles,
          token: user.token,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.fullName = user.fullName;
        token.accessToken = user.token;
        token.email = user.email;
        token.roles = user.roles || [];
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.fullName = token.fullName as string | null;
        session.user.token = token.accessToken as string;
        session.user.email = token.email as string;
        session.user.roles = token.roles as string[];
      }

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
