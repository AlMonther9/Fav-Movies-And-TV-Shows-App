"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { AppHeader } from "@/components/app-header";
import { SearchAndFilters } from "@/components/search-and-filters";
import { MediaTable } from "@/components/media-table";
import { AddEntryModal } from "@/components/add-entry-modal";
import { LandingPage } from "@/components/landing/landing-page";
import { LoadingSpinner } from "@/components/loading-spinner";
import { useToast } from "@/hooks/use-toast";
import type { MediaEntry } from "@/types/media";

const ITEMS_PER_PAGE = 10;

function AuthenticatedApp() {
  const [entries, setEntries] = useState<MediaEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<"all" | "Movie" | "TV Show">(
    "all"
  );
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<MediaEntry | null>(null);

  const { toast } = useToast();

  // Generate mock data function
  const generateMockData = (startId: number, count: number): MediaEntry[] => {
    const mockEntries: MediaEntry[] = [];
    const titles = [
      "Cyberpunk 2077: The Movie",
      "Neural Interface",
      "Digital Shadows",
      "Neon Dreams",
      "Ghost in the Shell",
      "Black Mirror",
      "Altered Carbon",
      "Blade Runner 2049",
      "The Matrix Reloaded",
      "Akira",
      "Tron: Legacy",
      "Ex Machina",
      "Westworld",
      "Mr. Robot",
      "Electric Dreams",
      "Ready Player One",
      "Minority Report",
      "Total Recall",
      "Strange Days",
      "Johnny Mnemonic",
    ];
    const directors = [
      "Ridley Scott",
      "Denis Villeneuve",
      "Lana Wachowski",
      "Christopher Nolan",
      "David Fincher",
    ];
    const locations = [
      "Neo Tokyo",
      "Night City",
      "Los Angeles 2049",
      "The Matrix",
      "Cyber Space",
      "Virtual Reality",
    ];
    const genres = [
      "Cyberpunk",
      "Sci-Fi",
      "Thriller",
      "Action",
      "Drama",
      "Horror",
    ];

    for (let i = 0; i < count; i++) {
      const id = startId + i;
      const isMovie = Math.random() > 0.5;
      mockEntries.push({
        id,
        title: titles[i % titles.length],
        type: isMovie ? "Movie" : "TV Show",
        director: directors[Math.floor(Math.random() * directors.length)],
        budget: isMovie
          ? `$${Math.floor(Math.random() * 200 + 50)}M`
          : `$${Math.floor(Math.random() * 10 + 1)}M/ep`,
        location: locations[Math.floor(Math.random() * locations.length)],
        duration: isMovie
          ? `${Math.floor(Math.random() * 60 + 90)} min`
          : `${Math.floor(Math.random() * 30 + 30)} min/ep`,
        year: isMovie
          ? `${Math.floor(Math.random() * 30 + 1990)}`
          : `${Math.floor(Math.random() * 20 + 2000)}-${Math.floor(
              Math.random() * 5 + 2020
            )}`,
        genre: genres[Math.floor(Math.random() * genres.length)],
        description: `A mind-bending ${
          isMovie ? "movie" : "TV show"
        } set in a dystopian future where technology and humanity collide.`,
        rating: Math.floor(Math.random() * 5 + 1),
        createdAt: new Date().toISOString(),
      });
    }
    return mockEntries;
  };

  const fetchEntries = useCallback(async (pageNum: number) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 800));

    const startId = (pageNum - 1) * ITEMS_PER_PAGE + 1;
    const newEntries = generateMockData(startId, ITEMS_PER_PAGE);

    if (pageNum === 1) {
      setEntries(newEntries);
    } else {
      setEntries((prev) => [...prev, ...newEntries]);
    }

    setHasMore(pageNum < 10);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchEntries(page);
  }, [page, fetchEntries]);

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleAddEntry = (newEntry: Omit<MediaEntry, "id" | "createdAt">) => {
    const entry: MediaEntry = {
      id: Date.now(),
      ...newEntry,
      createdAt: new Date().toISOString(),
    };

    setEntries((prev) => [entry, ...prev]);
    toast({
      title: "✨ Entry Added",
      description: "Your favorite has been added to the collection",
      className:
        "border-cyan-500/50 bg-white/90 dark:bg-black/90 text-cyan-600 dark:text-cyan-100",
    });
  };

  const handleEditEntry = (updatedEntry: MediaEntry) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.id === updatedEntry.id ? updatedEntry : entry))
    );
    toast({
      title: "🔄 Entry Updated",
      description: "Your changes have been saved",
      className:
        "border-purple-500/50 bg-white/90 dark:bg-black/90 text-purple-600 dark:text-purple-100",
    });
  };

  const handleDeleteEntry = (id: number) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
    toast({
      title: "🗑️ Entry Deleted",
      description: "The entry has been removed from your collection",
      className:
        "border-red-500/50 bg-white/90 dark:bg-black/90 text-red-600 dark:text-red-100",
    });
  };

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || entry.type === filterType;
    return matchesSearch && matchesFilter;
  });

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
            resultsCount={filteredEntries.length}
            totalCount={entries.length}
          />

          <MediaTable
            entries={filteredEntries}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
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
            Loading CyberFlix...
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
