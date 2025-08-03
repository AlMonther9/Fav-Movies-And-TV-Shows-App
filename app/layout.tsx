import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Toaster } from "@/components/ui/toaster";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import type { Session as NextAuthSession } from "next-auth";

interface Session extends NextAuthSession {
  expires: string;
}

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CyberLib - Digital Entertainment Collection",
  description:
    "Your personal collection of favorite movies and TV shows in a cyberpunk-themed interface",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = (await getServerSession(authOptions)) as
    | Session
    | null
    | undefined;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster />
        <AuthProvider session={session}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange={false}
          >
            {children}
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
