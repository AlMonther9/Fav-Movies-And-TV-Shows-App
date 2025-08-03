"use client";

import type React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
}

export function AuthGuard({
  children,
  requireAuth = true,
  redirectTo,
}: AuthGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (requireAuth && !session) {
      router.push(redirectTo || "/auth/signin");
      return;
    }

    if (!requireAuth && session && redirectTo) {
      router.push(redirectTo);
      return;
    }
  }, [session, status, router, requireAuth, redirectTo]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black">
        <div className="text-center space-y-4">
          <LoadingSpinner />
          <p className="text-gray-600 dark:text-gray-400">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (requireAuth && !session) {
    return null; // Will redirect
  }

  if (!requireAuth && session && redirectTo) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
