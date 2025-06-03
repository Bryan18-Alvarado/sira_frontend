"use client";

import { signOut } from "next-auth/react";

export function signOutAndRedirect() {
  signOut({ callbackUrl: "/login" });
}
