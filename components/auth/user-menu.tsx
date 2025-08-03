"use client";

import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User, LogOut, Settings, Shield, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function UserMenu() {
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  if (!session?.user) {
    return null;
  }

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut({ callbackUrl: "/auth/signin" });
      toast({
        title: "👋 Signed Out",
        description: "You've been successfully signed out of CyberLib",
        className:
          "border-blue-500/50 bg-white/90 dark:bg-black/90 text-blue-600 dark:text-blue-100",
      });
    } catch (error) {
      toast({
        title: "⚠️ Error",
        description: "Failed to sign out. Please try again.",
        className:
          "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full border-2 border-cyan-500/30 dark:border-cyan-500/30 hover:border-cyan-500/50 dark:hover:border-cyan-500/50 transition-all duration-300 group"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={session.user.image || ""}
              alt={session.user.name || ""}
            />
            <AvatarFallback className="bg-gradient-to-r from-cyan-500 to-purple-500 text-white text-sm font-semibold">
              {getInitials(session.user.name || session.user.email || "U")}
            </AvatarFallback>
          </Avatar>
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-56 bg-white/95 dark:bg-black/95 border-cyan-500/30 dark:border-cyan-500/30 backdrop-blur-sm"
        align="end"
        forceMount
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-500 dark:text-cyan-400" />
              <p className="text-sm font-medium leading-none text-gray-900 dark:text-gray-100">
                {session.user.name}
              </p>
            </div>
            <p className="text-xs leading-none text-gray-600 dark:text-gray-400">
              {session.user.email}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />

        <DropdownMenuItem className="text-gray-900 dark:text-gray-100 focus:bg-cyan-50 dark:focus:bg-cyan-500/20 focus:text-cyan-700 dark:focus:text-cyan-300 cursor-pointer group">
          <User className="mr-2 h-4 w-4 text-cyan-500 dark:text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
          <span>Profile</span>
        </DropdownMenuItem>

        <DropdownMenuItem className="text-gray-900 dark:text-gray-100 focus:bg-purple-50 dark:focus:bg-purple-500/20 focus:text-purple-700 dark:focus:text-purple-300 cursor-pointer group">
          <Settings className="mr-2 h-4 w-4 text-purple-500 dark:text-purple-400 group-hover:rotate-90 transition-transform duration-300" />
          <span>Settings</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-gray-200 dark:bg-gray-800" />

        <DropdownMenuItem
          onClick={handleSignOut}
          disabled={isLoading}
          className="text-gray-900 dark:text-gray-100 focus:bg-red-50 dark:focus:bg-red-500/20 focus:text-red-700 dark:focus:text-red-300 cursor-pointer group"
        >
          {isLoading ? (
            <>
              <div className="mr-2 h-4 w-4 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
              <span>Signing out...</span>
            </>
          ) : (
            <>
              <LogOut className="mr-2 h-4 w-4 text-red-500 dark:text-red-400 group-hover:scale-110 transition-transform duration-300" />
              <span>Sign out</span>
              <Zap className="ml-auto h-3 w-3 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
