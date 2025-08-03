"use client";

import type React from "react";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Save, X, Zap, Film, Tv } from "lucide-react";
import type { MediaEntry } from "@/types/media";

interface AddEntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (entry: MediaEntry | Omit<MediaEntry, "id" | "createdAt">) => void;
  editingEntry?: MediaEntry | null;
}

export function AddEntryModal({
  isOpen,
  onClose,
  onSubmit,
  editingEntry,
}: AddEntryModalProps) {
  const [formData, setFormData] = useState({
    title: "",
    type: "Movie" as "Movie" | "TV Show",
    director: "",
    budget: "",
    location: "",
    duration: "",
    year: "",
    genre: "",
    description: "",
    rating: 5,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (editingEntry) {
      setFormData({
        title: editingEntry.title,
        type: editingEntry.type,
        director: editingEntry.director,
        budget: editingEntry.budget,
        location: editingEntry.location,
        duration: editingEntry.duration,
        year: editingEntry.year,
        genre: editingEntry.genre,
        description: editingEntry.description,
        rating: editingEntry.rating,
      });
    } else {
      resetForm();
    }
  }, [editingEntry, isOpen]);

  const resetForm = () => {
    setFormData({
      title: "",
      type: "Movie",
      director: "",
      budget: "",
      location: "",
      duration: "",
      year: "",
      genre: "",
      description: "",
      rating: 5,
    });
    setErrors({});
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.director.trim()) {
      newErrors.director = "Director is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    if (editingEntry) {
      onSubmit({
        ...editingEntry,
        ...formData,
      });
    } else {
      onSubmit(formData);
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white/95 dark:bg-black/95 border-cyan-300 dark:border-cyan-500/30 backdrop-blur-sm transition-colors duration-300">
        {/* Animated background */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-50 via-purple-50 to-pink-50 dark:from-cyan-500/5 dark:via-purple-500/5 dark:to-pink-500/5 animate-pulse" />

        <div className="relative z-10">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-bold text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                {formData.type === "Movie" ? (
                  <Film className="w-6 h-6 text-cyan-500 dark:text-cyan-400 animate-pulse" />
                ) : (
                  <Tv className="w-6 h-6 text-purple-500 dark:text-purple-400 animate-pulse" />
                )}
                <span className="bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-400 dark:to-purple-400 bg-clip-text text-transparent">
                  {editingEntry ? "Modify Entry" : "New Entry"}
                </span>
                <Zap className="w-5 h-5 text-yellow-500 dark:text-yellow-400 animate-bounce" />
              </div>
              <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 dark:via-cyan-400 to-transparent mx-auto animate-pulse" />
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-cyan-600 dark:text-cyan-400 font-semibold"
                >
                  Title *
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/20 transition-all duration-300"
                  placeholder="Enter the title..."
                />
                {errors.title && (
                  <p className="text-red-500 dark:text-red-400 text-sm">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Type */}
              <div className="space-y-2">
                <Label
                  htmlFor="type"
                  className="text-purple-600 dark:text-purple-400 font-semibold"
                >
                  Type *
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value: "Movie" | "TV Show") =>
                    setFormData((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-purple-500 dark:focus:border-purple-500 focus:ring-purple-500/20 dark:focus:ring-purple-500/20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white/95 dark:bg-black/90 border-gray-300 dark:border-gray-700 backdrop-blur-sm">
                    <SelectItem
                      value="Movie"
                      className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-cyan-600 dark:focus:text-cyan-400"
                    >
                      🎬 Movie
                    </SelectItem>
                    <SelectItem
                      value="TV Show"
                      className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-purple-600 dark:focus:text-purple-400"
                    >
                      📺 TV Show
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Director */}
              <div className="space-y-2">
                <Label
                  htmlFor="director"
                  className="text-pink-600 dark:text-pink-400 font-semibold"
                >
                  Director *
                </Label>
                <Input
                  id="director"
                  value={formData.director}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      director: e.target.value,
                    }))
                  }
                  className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-pink-500 dark:focus:border-pink-500 focus:ring-pink-500/20 dark:focus:ring-pink-500/20 transition-all duration-300"
                  placeholder="Director name..."
                />
                {errors.director && (
                  <p className="text-red-500 dark:text-red-400 text-sm">
                    {errors.director}
                  </p>
                )}
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <Label
                  htmlFor="budget"
                  className="text-green-600 dark:text-green-400 font-semibold"
                >
                  Budget
                </Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, budget: e.target.value }))
                  }
                  className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-green-500 dark:focus:border-green-500 focus:ring-green-500/20 dark:focus:ring-green-500/20 transition-all duration-300"
                  placeholder="e.g., $100M or $5M/ep"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <Label
                  htmlFor="location"
                  className="text-yellow-600 dark:text-yellow-400 font-semibold"
                >
                  Location
                </Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      location: e.target.value,
                    }))
                  }
                  className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-yellow-500/20 dark:focus:ring-yellow-500/20 transition-all duration-300"
                  placeholder="Filming location..."
                />
              </div>

              {/* Duration */}
              <div className="space-y-2">
                <Label
                  htmlFor="duration"
                  className="text-blue-600 dark:text-blue-400 font-semibold"
                >
                  Duration
                </Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      duration: e.target.value,
                    }))
                  }
                  className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-blue-500/20 dark:focus:ring-blue-500/20 transition-all duration-300"
                  placeholder="e.g., 148 min or 45 min/ep"
                />
              </div>

              {/* Year */}
              <div className="space-y-2">
                <Label
                  htmlFor="year"
                  className="text-indigo-600 dark:text-indigo-400 font-semibold"
                >
                  Year/Time
                </Label>
                <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, year: e.target.value }))
                  }
                  className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-indigo-500 dark:focus:border-indigo-500 focus:ring-indigo-500/20 dark:focus:ring-indigo-500/20 transition-all duration-300"
                  placeholder="e.g., 2010 or 2008-2013"
                />
              </div>

              {/* Genre */}
              <div className="space-y-2">
                <Label
                  htmlFor="genre"
                  className="text-red-600 dark:text-red-400 font-semibold"
                >
                  Genre
                </Label>
                <Input
                  id="genre"
                  value={formData.genre}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, genre: e.target.value }))
                  }
                  className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-red-500 dark:focus:border-red-500 focus:ring-red-500/20 dark:focus:ring-red-500/20 transition-all duration-300"
                  placeholder="Genre classification..."
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-cyan-600 dark:text-cyan-400 font-semibold"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-cyan-500 dark:focus:border-cyan-500 focus:ring-cyan-500/20 dark:focus:ring-cyan-500/20 transition-all duration-300 min-h-[100px]"
                placeholder="Brief description of the plot..."
                rows={4}
              />
            </div>

            {/* Rating */}
            <div className="space-y-2">
              <Label
                htmlFor="rating"
                className="text-yellow-600 dark:text-yellow-400 font-semibold"
              >
                Rating (1-5 Stars)
              </Label>
              <Select
                value={formData.rating.toString()}
                onValueChange={(value) =>
                  setFormData((prev) => ({
                    ...prev,
                    rating: Number.parseInt(value),
                  }))
                }
              >
                <SelectTrigger className="bg-white/60 dark:bg-black/60 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-100 focus:border-yellow-500 dark:focus:border-yellow-500 focus:ring-yellow-500/20 dark:focus:ring-yellow-500/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white/95 dark:bg-black/90 border-gray-300 dark:border-gray-700 backdrop-blur-sm">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <SelectItem
                      key={num}
                      value={num.toString()}
                      className="text-gray-900 dark:text-gray-100 focus:bg-gray-100 dark:focus:bg-gray-800 focus:text-yellow-600 dark:focus:text-yellow-400"
                    >
                      {"⭐".repeat(num)} ({num} Star{num !== 1 ? "s" : ""})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-cyan-600 to-purple-600 dark:from-cyan-600 dark:to-purple-600 hover:from-cyan-500 hover:to-purple-500 dark:hover:from-cyan-500 dark:hover:to-purple-500 text-white border-0 shadow-lg hover:shadow-cyan-500/25 dark:hover:shadow-cyan-500/25 transition-all duration-300 group"
              >
                <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                {editingEntry ? "Update Entry" : "Create Entry"}
                <Zap className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 group bg-transparent"
              >
                <X className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
