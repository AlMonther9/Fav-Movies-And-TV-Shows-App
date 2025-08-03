"use client";

import type React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Skull, AlertTriangle, Globe } from "lucide-react";

interface DeleteConfirmDialogProps {
  children: React.ReactNode;
  title: string;
  onConfirm: () => void;
  isGlobalEntry?: boolean;
}

export function DeleteConfirmDialog({
  children,
  title,
  onConfirm,
  isGlobalEntry = false,
}: DeleteConfirmDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="bg-white/95 dark:bg-black/95 border-red-300 dark:border-red-500/30 backdrop-blur-sm transition-colors duration-300">
        {/* Animated warning background */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-orange-50 to-red-50 dark:from-red-500/5 dark:via-orange-500/5 dark:to-red-500/5 animate-pulse" />

        <div className="relative z-10">
          <AlertDialogHeader className="space-y-4">
            <AlertDialogTitle className="text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <AlertTriangle className="w-6 h-6 text-orange-500 dark:text-orange-400 animate-pulse" />
                <span className="text-red-600 dark:text-red-400 font-bold">
                  DELETION WARNING
                </span>
                <Skull className="w-6 h-6 text-red-600 dark:text-red-400 animate-bounce" />
              </div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-transparent via-red-500 dark:via-red-400 to-transparent mx-auto animate-pulse" />
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-gray-700 dark:text-gray-300 space-y-3 transition-colors duration-300">
              <p className="text-lg">
                Are you sure you want to delete{" "}
                <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  "{title}"
                </span>
                ?
              </p>

              {isGlobalEntry && (
                <div className="bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                      Starter Collection Item
                    </span>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-300">
                    This was part of your starter collection. You can delete it,
                    but it won't be restored automatically.
                  </p>
                </div>
              )}

              <p className="text-sm text-red-600 dark:text-red-300">
                ⚠️ This action cannot be undone and will permanently remove the
                entry from your collection.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="gap-4 mt-6">
            <AlertDialogCancel className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirm}
              className="bg-gradient-to-r from-red-600 to-orange-600 dark:from-red-600 dark:to-orange-600 hover:from-red-500 hover:to-orange-500 dark:hover:from-red-500 dark:hover:to-orange-500 text-white border-0 shadow-lg hover:shadow-red-500/25 dark:hover:shadow-red-500/25 transition-all duration-300 group"
            >
              <Skull className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Delete Forever
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
