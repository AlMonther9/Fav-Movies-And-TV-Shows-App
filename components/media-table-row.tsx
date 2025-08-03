"use client";

import { forwardRef, useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { Film, Tv, Edit, Trash2, Star } from "lucide-react";
import type { MediaEntry } from "@/types/media";

interface MediaTableRowProps {
  entry: MediaEntry;
  onEdit: (entry: MediaEntry) => void;
  onDelete: (id: number) => Promise<void>;
}

export const MediaTableRow = forwardRef<
  HTMLTableRowElement,
  MediaTableRowProps
>(({ entry, onEdit, onDelete }, ref) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await onDelete(entry.id);
    } catch (error) {
      // Error is handled in the parent component
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <TableRow
      ref={ref}
      className="border-gray-200 dark:border-gray-800 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-purple-50 dark:hover:from-cyan-500/5 dark:hover:to-purple-500/5 transition-all duration-300 group"
    >
      <TableCell className="font-medium">
        <div className="flex items-center gap-3">
          <div className="relative">
            {entry.type === "Movie" ? (
              <Film className="w-5 h-5 text-cyan-500 dark:text-cyan-400 group-hover:text-cyan-400 dark:group-hover:text-cyan-300 transition-colors" />
            ) : (
              <Tv className="w-5 h-5 text-purple-500 dark:text-purple-400 group-hover:text-purple-400 dark:group-hover:text-purple-300 transition-colors" />
            )}
            <div className="absolute inset-0 bg-current opacity-20 rounded-full blur-sm group-hover:opacity-40 transition-opacity" />
          </div>
          <span
            className="text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-white transition-colors max-w-[200px] truncate"
            title={entry.title}
          >
            {entry.title}
          </span>
        </div>
      </TableCell>

      <TableCell>
        <Badge
          variant={entry.type === "Movie" ? "default" : "secondary"}
          className={
            entry.type === "Movie"
              ? "bg-cyan-100 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border-cyan-200 dark:border-cyan-500/30 hover:bg-cyan-200 dark:hover:bg-cyan-500/30 transition-colors"
              : "bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-500/30 hover:bg-purple-200 dark:hover:bg-purple-500/30 transition-colors"
          }
        >
          {entry.type}
        </Badge>
      </TableCell>

      <TableCell className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
        {entry.director}
      </TableCell>

      <TableCell className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
        {entry.budget || "-"}
      </TableCell>

      <TableCell className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
        {entry.location || "-"}
      </TableCell>

      <TableCell className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
        {entry.duration || "-"}
      </TableCell>

      <TableCell className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
        {entry.year || "-"}
      </TableCell>

      <TableCell>
        {entry.genre && (
          <Badge
            variant="outline"
            className="border-pink-300 dark:border-pink-500/30 text-pink-700 dark:text-pink-300 hover:bg-pink-50 dark:hover:bg-pink-500/20 transition-colors"
          >
            {entry.genre}
          </Badge>
        )}
      </TableCell>

      <TableCell>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }, (_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 transition-colors duration-200 ${
                i < entry.rating
                  ? "text-yellow-500 dark:text-yellow-400 fill-yellow-500 dark:fill-yellow-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-300"
                  : "text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500"
              }`}
            />
          ))}
        </div>
      </TableCell>

      <TableCell className="text-right">
        <div className="flex gap-2 justify-end opacity-70 group-hover:opacity-100 transition-opacity">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onEdit(entry)}
            className="border-cyan-300 dark:border-cyan-500/30 text-cyan-600 dark:text-cyan-400 hover:bg-cyan-50 dark:hover:bg-cyan-500/20 hover:border-cyan-400 dark:hover:border-cyan-500/50 hover:text-cyan-700 dark:hover:text-cyan-300 transition-all duration-300 group/btn"
          >
            <Edit className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
          </Button>

          <DeleteConfirmDialog title={entry.title} onConfirm={handleDelete}>
            <Button
              size="sm"
              variant="outline"
              disabled={isDeleting}
              className="border-red-300 dark:border-red-500/30 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/20 hover:border-red-400 dark:hover:border-red-500/50 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300 group/btn bg-transparent"
            >
              {isDeleting ? (
                <div className="w-4 h-4 border-2 border-red-300 border-t-red-600 rounded-full animate-spin" />
              ) : (
                <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-300" />
              )}
            </Button>
          </DeleteConfirmDialog>
        </div>
      </TableCell>
    </TableRow>
  );
});

MediaTableRow.displayName = "MediaTableRow";
