"use client";

import { Loader2, Zap } from "lucide-react";

export function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center gap-4">
      {/* Main spinner */}
      <div className="relative">
        <Loader2 className="w-8 h-8 text-cyan-500 dark:text-cyan-400 animate-spin" />
        <div className="absolute inset-0 w-8 h-8 bg-cyan-500/20 dark:bg-cyan-400/20 rounded-full blur-md animate-pulse" />
      </div>

      {/* Loading text with animation */}
      <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 transition-colors duration-300">
        <span className="animate-pulse">Loading digital archives</span>
        <Zap className="w-4 h-4 text-yellow-500 dark:text-yellow-400 animate-bounce" />
      </div>

      {/* Progress dots */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full animate-pulse"
            style={{
              animationDelay: `${i * 0.2}s`,
              animationDuration: "1s",
            }}
          />
        ))}
      </div>
    </div>
  );
}
