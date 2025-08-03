"use client";

import type React from "react";

import { SessionProvider } from "next-auth/react";
import type { Session as NextAuthSession } from "next-auth";

interface Session extends NextAuthSession {
  expires: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
  session?: Session | null;
}

export function AuthProvider({ children, session }: AuthProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
