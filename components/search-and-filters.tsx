"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SeedButton } from "@/components/admin/seed-button";
import { Search, Filter, Plus, Zap } from "lucide-react";

interface SearchAndFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filterType: "all" | "Movie" | "TV Show";
  onFilterChange: (value: "all" | "Movie" | "TV Show") => void;
  onAddClick: () => void;
  resultsCount: number;
  totalCount: number;
}

export function SearchAndFilters({
  searchTerm,
  onSearchChange,
  filterType,
  onFilterChange,
  onAddClick,
  resultsCount,
  totalCount,
}: SearchAndFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Controls Card */}
      <Card className="border-cyan-500/20 dark:border-cyan-500/20 bg-white/80 dark:bg-black/40 backdrop-blur-sm hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md group">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-500 dark:text-cyan-400 w-4 h-4 group-focus-within:text-cyan-400 dark:group-focus-within:text-cyan-300 transition-colors" />
                <Input
                  placeholder="Search the digital archives..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-10 bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/20 transition-all duration-300"
                />
                <div className="absolute inset-0 rounded-md bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-cyan-500/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>

              {/* Filter Select */}
              <div className="flex items-center gap-2 group">
                <Filter className="w-4 h-4 text-purple-500 dark:text-purple-400 group-hover:text-purple-400 dark:group-hover:text-purple-300 transition-colors" />
                <Select
                  value={filterType}
                  onValueChange={(value: "all" | "Movie" | "TV Show") =>
                    onFilterChange(value)
                  }
                >
                  <SelectTrigger className="w-40 bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20 dark:focus:ring-purple-500/20 transition-all duration-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-black/90 border-gray-300 dark:border-gray-700 backdrop-blur-sm">
                    <SelectItem
                      value="all"
                      className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-cyan-600 dark:focus:text-cyan-400"
                    >
                      All Types
                    </SelectItem>
                    <SelectItem
                      value="Movie"
                      className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-cyan-600 dark:focus:text-cyan-400"
                    >
                      Movies
                    </SelectItem>
                    <SelectItem
                      value="TV Show"
                      className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-cyan-600 dark:focus:text-cyan-400"
                    >
                      TV Shows
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              {/* Seed Buttons (for testing/admin) */}
              <SeedButton />

              {/* Add Button */}
              <Button
                onClick={onAddClick}
                className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-600 dark:to-purple-600 hover:from-cyan-500 hover:to-purple-500 dark:hover:from-cyan-500 dark:hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-cyan-500/25 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Add New Entry
                <Zap className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex justify-between items-center text-sm">
        <p className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
          Displaying{" "}
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
            {resultsCount}
          </span>{" "}
          of{" "}
          <span className="text-purple-600 dark:text-purple-400 font-semibold">
            {totalCount}
          </span>{" "}
          entries
          {searchTerm && (
            <>
              {" "}
              matching{" "}
              <span className="text-pink-600 dark:text-pink-400 font-semibold">
                "{searchTerm}"
              </span>
            </>
          )}
          {filterType !== "all" && (
            <>
              {" "}
              filtered by{" "}
              <span className="text-green-600 dark:text-green-400 font-semibold">
                {filterType}
              </span>
            </>
          )}
        </p>

        {/* Animated status indicator */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse" />
          <span className="text-green-600 dark:text-green-400 text-xs font-medium">
            ONLINE
          </span>
        </div>
      </div>
    </div>
  );
}
