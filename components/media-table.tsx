"use client";

import { useRef, useCallback } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { MediaTableRow } from "@/components/media-table-row";
import { LoadingSpinner } from "@/components/loading-spinner";
import type { MediaEntry } from "@/types/media";

interface MediaTableProps {
  entries: MediaEntry[];
  loading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onEdit: (entry: MediaEntry) => void;
  onDelete: (id: number) => Promise<void>;
}

export function MediaTable({
  entries,
  loading,
  hasMore,
  onLoadMore,
  onEdit,
  onDelete,
}: MediaTableProps) {
  const observer = useRef<IntersectionObserver | null>(null);

  const lastEntryElementRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          onLoadMore();
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore, onLoadMore]
  );

  return (
    <Card className="border-cyan-500/20 dark:border-cyan-500/20 bg-white/80 dark:bg-black/40 backdrop-blur-sm overflow-hidden transition-colors duration-300">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors duration-300">
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Title
                </TableHead>
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Type
                </TableHead>
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Director
                </TableHead>
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Budget
                </TableHead>
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Location
                </TableHead>
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Duration
                </TableHead>
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Year
                </TableHead>
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Genre
                </TableHead>
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold">
                  Rating
                </TableHead>
                <TableHead className="text-cyan-600 dark:text-cyan-400 font-semibold text-right">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {entries.map((entry, index) => (
                <MediaTableRow
                  key={entry.id}
                  entry={entry}
                  ref={
                    index === entries.length - 1 ? lastEntryElementRef : null
                  }
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        {loading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {!hasMore && entries.length > 0 && (
          <div className="text-center py-8 border-t border-gray-200 dark:border-gray-800 transition-colors duration-300">
            <div className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
              <p className="text-lg mb-2">🎬 End of Collection 🎬</p>
              <p>You've viewed all entries in your digital archive</p>
            </div>
          </div>
        )}

        {entries.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-gray-600 dark:text-gray-400 space-y-4 transition-colors duration-300">
              <div className="text-6xl mb-4">🎭</div>
              <p className="text-xl mb-2 text-cyan-600 dark:text-cyan-400">
                No entries found
              </p>
              <p>Start building your cyberpunk entertainment collection!</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
