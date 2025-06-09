import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      fullName?: string | null;
      email?: string | null;
      token?: string;
      roles?: string[];
    };
  }

  interface User {
    id: string;
    fullName?: string | null;
    token?: string;
    roles?: string[];
  }

  interface JWT {
    id?: string;
    accessToken?: string;
    email?: string;
    // roles?: string[];
  }
}
