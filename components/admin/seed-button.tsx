"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Zap, Database } from "lucide-react";

export function SeedButton() {
  const [isSeeding, setIsSeeding] = useState(false);
  const { toast } = useToast();

  const handleSeed = async (force = false) => {
    setIsSeeding(true);
    try {
      const response = await fetch(
        `/api/seed-user${force ? "?force=true" : ""}`,
        {
          method: "POST",
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast({
          title: "🌱 Collection Seeded!",
          description: "Your starter collection has been added successfully",
          className:
            "border-green-500/50 bg-white/90 dark:bg-black/90 text-green-600 dark:text-green-100",
        });

        // Refresh the page to show new entries
        window.location.reload();
      } else {
        const error = await response.json();
        toast({
          title: "⚠️ Seeding Failed",
          description: error.error || "Failed to seed collection",
          className:
            "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
        });
      }
    } catch (error) {
      toast({
        title: "⚠️ Error",
        description: "Network error occurred",
        className:
          "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
      });
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="flex gap-2">
      {/* <Button
        onClick={() => handleSeed(false)}
        disabled={isSeeding}
        variant="outline"
        size="sm"
        className="border-green-500/30 dark:border-green-500/30 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-500/10 transition-all duration-300 bg-transparent"
      >
        {isSeeding ? (
          <>
            <div className="w-4 h-4 mr-2 border-2 border-green-300 border-t-green-600 rounded-full animate-spin" />
            Seeding...
          </>
        ) : (
          <>
            <Database className="w-4 h-4 mr-2" />
            Seed Collection
          </>
        )}
      </Button> */}

      <Button
        onClick={() => handleSeed(true)}
        disabled={isSeeding}
        variant="outline"
        size="sm"
        className="border-yellow-500/30 dark:border-yellow-500/30 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-500/10 transition-all duration-300 bg-transparent"
      >
        {isSeeding ? (
          <>
            <div className="w-4 h-4 mr-2 border-2 border-yellow-300 border-t-yellow-600 rounded-full animate-spin" />
            Seeding Starter Collection...
          </>
        ) : (
          <>
            <Zap className="w-4 h-4 mr-2" />
            Get Starter Collection
          </>
        )}
      </Button>
    </div>
  );
}
