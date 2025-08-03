"use client";

import { Moon, Sun, Monitor, Zap } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="w-10 h-10 bg-transparent"
      >
        <div className="w-4 h-4 animate-pulse bg-current rounded" />
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative w-10 h-10 border-cyan-500/30 bg-black/40 backdrop-blur-sm hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden"
        >
          {/* Animated background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />

          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300 text-cyan-400 dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-300 text-purple-400 dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="bg-black/95 border-cyan-500/30 backdrop-blur-sm min-w-[160px]"
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="text-gray-100 focus:bg-cyan-500/20 focus:text-cyan-300 cursor-pointer group"
        >
          <Sun className="mr-2 h-4 w-4 text-yellow-400 group-hover:rotate-180 transition-transform duration-300" />
          <span>Light Mode</span>
          {theme === "light" && (
            <Zap className="ml-auto h-3 w-3 text-yellow-400 animate-pulse" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="text-gray-100 focus:bg-purple-500/20 focus:text-purple-300 cursor-pointer group"
        >
          <Moon className="mr-2 h-4 w-4 text-purple-400 group-hover:rotate-12 transition-transform duration-300" />
          <span>Dark Mode</span>
          {theme === "dark" && (
            <Zap className="ml-auto h-3 w-3 text-purple-400 animate-pulse" />
          )}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="text-gray-100 focus:bg-cyan-500/20 focus:text-cyan-300 cursor-pointer group"
        >
          <Monitor className="mr-2 h-4 w-4 text-cyan-400 group-hover:scale-110 transition-transform duration-300" />
          <span>System</span>
          {theme === "system" && (
            <Zap className="ml-auto h-3 w-3 text-cyan-400 animate-pulse" />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
