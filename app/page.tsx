"use client";

import { useSession } from "next-auth/react";
import { AppHeader } from "@/components/app-header";
import { SearchAndFilters } from "@/components/search-and-filters";
import { MediaTable } from "@/components/media-table";
import { AddEntryModal } from "@/components/add-entry-modal";
import { LandingPage } from "@/components/landing/landing-page";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useMedia } from "@/hooks/use-media";
import { useState } from "react";
import type { MediaEntry } from "@/types/media";

function AuthenticatedApp() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MediaEntry | null>(null);

  const {
    entries,
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
  } = useMedia();

  const handleAddEntry = async (
    newEntry: Omit<MediaEntry, "id" | "createdAt">
  ) => {
    try {
      await addEntry(newEntry);
      setIsAddDialogOpen(false);
      setEditingEntry(null);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleEditEntry = async (updatedEntry: MediaEntry) => {
    try {
      await updateEntry(updatedEntry);
      setIsAddDialogOpen(false);
      setEditingEntry(null);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const handleDeleteEntry = async (id: number) => {
    try {
      await deleteEntry(id);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black transition-colors duration-500">
      {/* Animated background grid */}
      <div className="fixed inset-0 opacity-10 dark:opacity-20">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse" />
      </div>

      <div className="relative z-10">
        <AppHeader />

        <div className="container mx-auto px-4 py-8 space-y-8">
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filterType={filterType}
            onFilterChange={setFilterType}
            onAddClick={() => {
              setEditingEntry(null);
              setIsAddDialogOpen(true);
            }}
            resultsCount={entries.length}
            totalCount={totalCount}
          />

          <MediaTable
            entries={entries}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={loadMore}
            onEdit={(entry) => {
              setEditingEntry(entry);
              setIsAddDialogOpen(true);
            }}
            onDelete={handleDeleteEntry}
          />

          <AddEntryModal
            isOpen={isAddDialogOpen}
            onClose={() => {
              setIsAddDialogOpen(false);
              setEditingEntry(null);
            }}
            onSubmit={(entry) => {
              if (editingEntry) {
                handleEditEntry(entry as MediaEntry);
              } else {
                handleAddEntry(entry as Omit<MediaEntry, "id" | "createdAt">);
              }
            }}
            editingEntry={editingEntry}
          />
        </div>
      </div>
    </div>
  );
}

export default function FavoriteMediaApp() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black">
        <div className="text-center space-y-4">
          <LoadingSpinner />
          <p className="text-gray-600 dark:text-gray-400">
            Loading CyberLib...
          </p>
        </div>
      </div>
    );
  }

  // Show landing page for unauthenticated users
  if (!session) {
    return <LandingPage />;
  }

  // Show authenticated app for logged-in users
  return <AuthenticatedApp />;
}
