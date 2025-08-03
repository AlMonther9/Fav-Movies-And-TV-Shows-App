"use client";

import { Film, Tv, Zap } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/auth/user-menu";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AppHeader() {
  const { data: session } = useSession();

  return (
    <div className="relative overflow-hidden border-b border-cyan-500/20 dark:border-cyan-500/20 bg-white/80 dark:bg-black/50 backdrop-blur-sm transition-colors duration-500">
      {/* Animated glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/5 dark:via-cyan-500/5 to-transparent animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="text-center space-y-4">
          {/* Controls - positioned absolutely */}
          <div className="absolute top-4 right-4 flex items-center gap-3">
            <ThemeToggle />
            {session ? (
              <UserMenu />
            ) : (
              <div className="flex gap-2">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-cyan-500/30 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/10 transition-all duration-300 bg-transparent"
                >
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button
                  asChild
                  size="sm"
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-600 dark:to-purple-600 hover:from-cyan-500 hover:to-purple-500 dark:hover:from-cyan-500 dark:hover:to-purple-500 text-white border-0"
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Logo/Icon with animation */}
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="relative">
              <Film className="w-8 h-8 text-cyan-500 dark:text-cyan-400 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-cyan-500/20 dark:bg-cyan-400/20 rounded-full blur-md animate-ping" />
            </div>
            <Zap className="w-6 h-6 text-purple-500 dark:text-purple-400 animate-bounce" />
            <div className="relative">
              <Tv className="w-8 h-8 text-pink-500 dark:text-pink-400 animate-pulse" />
              <div className="absolute inset-0 w-8 h-8 bg-pink-500/20 dark:bg-pink-400/20 rounded-full blur-md animate-ping" />
            </div>
          </div>

          {/* Main title with cyberpunk styling */}
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent animate-pulse">
            CYBER
            <span className="text-gray-900 dark:text-white">FLIX</span>
          </h1>

          {/* Subtitle with glow effect */}
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed transition-colors duration-300">
            Your personal collection of{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold glow-text">
              digital entertainment
            </span>{" "}
            in the{" "}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">
              neon-lit future
            </span>
          </p>

          {/* User greeting */}
          {session && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back,{" "}
              <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                {session.user.name}
              </span>
              !
            </p>
          )}

          {/* Animated underline */}
          <div className="flex justify-center mt-6">
            <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-cyan-600 dark:via-cyan-400 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
