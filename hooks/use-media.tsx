"use client";

import { useState, useEffect, useCallback } from "react";
import { apiClient } from "@/lib/api";
import type { MediaEntry } from "@/types/media";
import { useToast } from "@/hooks/use-toast";

interface UseMediaOptions {
  initialPage?: number;
  limit?: number;
}

export function useMedia({
  initialPage = 1,
  limit = 10,
}: UseMediaOptions = {}) {
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Movie" | "TV Show">(
    "all"
  );

  const { toast } = useToast();

  const fetchEntries = useCallback(
    async (pageNum: number, reset = false) => {
      setLoading(true);
      try {
        const response = await apiClient.getMediaEntries({
          page: pageNum,
          limit,
          search: searchTerm,
          type: filterType === "all" ? undefined : filterType,
        });

        if (reset || pageNum === 1) {
          setEntries(response.entries);
        } else {
          setEntries((prev) => [...prev, ...response.entries]);
        }

        setHasMore(response.hasMore);
        setTotalCount(response.totalCount);
      } catch (error) {
        toast({
          title: "⚠️ Error",
          description:
            error instanceof Error ? error.message : "Failed to fetch entries",
          className:
            "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
        });
      } finally {
        setLoading(false);
      }
    },
    [searchTerm, filterType, limit, toast]
  );

  // Initial load and when search/filter changes
  useEffect(() => {
    setPage(1);
    fetchEntries(1, true);
  }, [fetchEntries]);

  // Load more pages
  useEffect(() => {
    if (page > 1) {
      fetchEntries(page);
    }
  }, [page, fetchEntries]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  const addEntry = useCallback(
    async (newEntry: Omit<MediaEntry, "id" | "createdAt">) => {
      try {
        const createdEntry = await apiClient.createMediaEntry(newEntry);
        setEntries((prev) => [createdEntry, ...prev]);
        setTotalCount((prev) => prev + 1);

        toast({
          title: "✨ Entry Added",
          description: "Your favorite has been added to the collection",
          className:
            "border-cyan-500/50 bg-white/90 dark:bg-black/90 text-cyan-600 dark:text-cyan-100",
        });
      } catch (error) {
        toast({
          title: "⚠️ Error",
          description:
            error instanceof Error ? error.message : "Failed to add entry",
          className:
            "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
        });
        throw error;
      }
    },
    [toast]
  );

  const updateEntry = useCallback(
    async (updatedEntry: MediaEntry) => {
      try {
        const updated = await apiClient.updateMediaEntry(
          updatedEntry.id,
          updatedEntry
        );
        setEntries((prev) =>
          prev.map((entry) => (entry.id === updated.id ? updated : entry))
        );

        toast({
          title: "🔄 Entry Updated",
          description: "Your changes have been saved",
          className:
            "border-purple-500/50 bg-white/90 dark:bg-black/90 text-purple-600 dark:text-purple-100",
        });
      } catch (error) {
        toast({
          title: "⚠️ Error",
          description:
            error instanceof Error ? error.message : "Failed to update entry",
          className:
            "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
        });
        throw error;
      }
    },
    [toast]
  );

  const deleteEntry = useCallback(
    async (id: number) => {
      try {
        await apiClient.deleteMediaEntry(id);
        setEntries((prev) => prev.filter((entry) => entry.id !== id));
        setTotalCount((prev) => prev - 1);

        toast({
          title: "🗑️ Entry Deleted",
          description: "The entry has been removed from your collection",
          className:
            "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
        });
      } catch (error) {
        toast({
          title: "⚠️ Error",
          description:
            error instanceof Error ? error.message : "Failed to delete entry",
          className:
            "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
        });
        throw error;
      }
    },
    [toast]
  );

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.genre?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || entry.type === filterType;
    return matchesSearch && matchesFilter;
  });

  return {
    entries: filteredEntries,
    loading,
    hasMore,
    totalCount,
    searchTerm,
    setSearchTerm,
    filterType,
    setFilterType,
    loadMore,
    addEntry,
    updateEntry,
    deleteEntry,
    refetch: () => fetchEntries(1, true),
  };
}
