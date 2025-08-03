"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
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
} from "@/components/ui/alert-dialog"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Film, Tv, Search, Filter } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface MediaEntry {
  id: number
  title: string
  type: "Movie" | "TV Show"
  director: string
  budget: string
  location: string
  duration: string
  year: string
  genre: string
  description: string
  rating: number
  createdAt: string
}

const ITEMS_PER_PAGE = 10

export default function FavoriteMediaApp() {
  const [entries, setEntries] = useState<MediaEntry[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState<"all" | "Movie" | "TV Show">("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingEntry, setEditingEntry] = useState<MediaEntry | null>(null)
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
  })

  const { toast } = useToast()
  const observer = useRef<IntersectionObserver | null>(null)

  const lastEntryElementRef = useCallback(
    (node: HTMLTableRowElement) => {
      if (loading) return
      if (observer.current) observer.current.disconnect()
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1)
        }
      })
      if (node) observer.current.observe(node)
    },
    [loading, hasMore],
  )

  // Simulate API calls with mock data
  const generateMockData = (startId: number, count: number): MediaEntry[] => {
    const mockEntries: MediaEntry[] = []
    const titles = [
      "Inception",
      "The Dark Knight",
      "Interstellar",
      "Pulp Fiction",
      "The Godfather",
      "Breaking Bad",
      "Game of Thrones",
      "Stranger Things",
      "The Office",
      "Friends",
      "Avengers: Endgame",
      "The Matrix",
      "Forrest Gump",
      "The Shawshank Redemption",
      "Titanic",
      "Lost",
      "The Sopranos",
      "Mad Men",
      "Better Call Saul",
      "Westworld",
    ]
    const directors = ["Christopher Nolan", "Quentin Tarantino", "Martin Scorsese", "Steven Spielberg", "David Fincher"]
    const locations = ["Los Angeles", "New York", "London", "Paris", "Tokyo", "Sydney", "Toronto"]
    const genres = ["Action", "Drama", "Comedy", "Thriller", "Sci-Fi", "Romance", "Horror"]

    for (let i = 0; i < count; i++) {
      const id = startId + i
      const isMovie = Math.random() > 0.5
      mockEntries.push({
        id,
        title: titles[i % titles.length],
        type: isMovie ? "Movie" : "TV Show",
        director: directors[Math.floor(Math.random() * directors.length)],
        budget: isMovie ? `$${Math.floor(Math.random() * 200 + 50)}M` : `$${Math.floor(Math.random() * 10 + 1)}M/ep`,
        location: locations[Math.floor(Math.random() * locations.length)],
        duration: isMovie
          ? `${Math.floor(Math.random() * 60 + 90)} min`
          : `${Math.floor(Math.random() * 30 + 30)} min/ep`,
        year: isMovie
          ? `${Math.floor(Math.random() * 30 + 1990)}`
          : `${Math.floor(Math.random() * 20 + 2000)}-${Math.floor(Math.random() * 5 + 2020)}`,
        genre: genres[Math.floor(Math.random() * genres.length)],
        description: `A captivating ${isMovie ? "movie" : "TV show"} that explores themes of ${genres[Math.floor(Math.random() * genres.length)].toLowerCase()}.`,
        rating: Math.floor(Math.random() * 5 + 1),
        createdAt: new Date().toISOString(),
      })
    }
    return mockEntries
  }

  const fetchEntries = useCallback(async (pageNum: number) => {
    setLoading(true)
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    const startId = (pageNum - 1) * ITEMS_PER_PAGE + 1
    const newEntries = generateMockData(startId, ITEMS_PER_PAGE)

    if (pageNum === 1) {
      setEntries(newEntries)
    } else {
      setEntries((prev) => [...prev, ...newEntries])
    }

    setHasMore(pageNum < 10) // Simulate having 10 pages of data
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchEntries(page)
  }, [page, fetchEntries])

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
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.director) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    const newEntry: MediaEntry = {
      id: editingEntry ? editingEntry.id : Date.now(),
      ...formData,
      createdAt: editingEntry ? editingEntry.createdAt : new Date().toISOString(),
    }

    if (editingEntry) {
      setEntries((prev) => prev.map((entry) => (entry.id === editingEntry.id ? newEntry : entry)))
      toast({
        title: "Success",
        description: "Entry updated successfully",
      })
    } else {
      setEntries((prev) => [newEntry, ...prev])
      toast({
        title: "Success",
        description: "Entry added successfully",
      })
    }

    resetForm()
    setIsAddDialogOpen(false)
    setEditingEntry(null)
  }

  const handleEdit = (entry: MediaEntry) => {
    setFormData({
      title: entry.title,
      type: entry.type,
      director: entry.director,
      budget: entry.budget,
      location: entry.location,
      duration: entry.duration,
      year: entry.year,
      genre: entry.genre,
      description: entry.description,
      rating: entry.rating,
    })
    setEditingEntry(entry)
    setIsAddDialogOpen(true)
  }

  const handleDelete = (id: number) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id))
    toast({
      title: "Success",
      description: "Entry deleted successfully",
    })
  }

  const filteredEntries = entries.filter((entry) => {
    const matchesSearch =
      entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.genre.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || entry.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Favorite Movies & TV Shows
          </h1>
          <p className="text-center text-muted-foreground">Manage your personal collection of favorite entertainment</p>
        </div>

        {/* Controls */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search by title, director, or genre..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <Select
                    value={filterType}
                    onValueChange={(value: "all" | "Movie" | "TV Show") => setFilterType(value)}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Movie">Movies</SelectItem>
                      <SelectItem value="TV Show">TV Shows</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => {
                      resetForm()
                      setEditingEntry(null)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add New Entry
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>{editingEntry ? "Edit Entry" : "Add New Entry"}</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          value={formData.title}
                          onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="type">Type *</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value: "Movie" | "TV Show") =>
                            setFormData((prev) => ({ ...prev, type: value }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Movie">Movie</SelectItem>
                            <SelectItem value="TV Show">TV Show</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="director">Director *</Label>
                        <Input
                          id="director"
                          value={formData.director}
                          onChange={(e) => setFormData((prev) => ({ ...prev, director: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="budget">Budget</Label>
                        <Input
                          id="budget"
                          placeholder="e.g., $100M or $5M/ep"
                          value={formData.budget}
                          onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          placeholder="e.g., 148 min or 45 min/ep"
                          value={formData.duration}
                          onChange={(e) => setFormData((prev) => ({ ...prev, duration: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="year">Year/Time</Label>
                        <Input
                          id="year"
                          placeholder="e.g., 2010 or 2008-2013"
                          value={formData.year}
                          onChange={(e) => setFormData((prev) => ({ ...prev, year: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="genre">Genre</Label>
                        <Input
                          id="genre"
                          value={formData.genre}
                          onChange={(e) => setFormData((prev) => ({ ...prev, genre: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="rating">Rating (1-5)</Label>
                      <Select
                        value={formData.rating.toString()}
                        onValueChange={(value) => setFormData((prev) => ({ ...prev, rating: Number.parseInt(value) }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} Star{num !== 1 ? "s" : ""}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1">
                        {editingEntry ? "Update Entry" : "Add Entry"}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => {
                          setIsAddDialogOpen(false)
                          resetForm()
                          setEditingEntry(null)
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground">
            Showing {filteredEntries.length} of {entries.length} entries
            {searchTerm && ` matching "${searchTerm}"`}
            {filterType !== "all" && ` filtered by ${filterType}`}
          </p>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Title</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Director</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Year/Time</TableHead>
                    <TableHead>Genre</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEntries.map((entry, index) => (
                    <TableRow
                      key={entry.id}
                      ref={index === filteredEntries.length - 1 ? lastEntryElementRef : null}
                      className="hover:bg-muted/50"
                    >
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          {entry.type === "Movie" ? (
                            <Film className="w-4 h-4 text-blue-500" />
                          ) : (
                            <Tv className="w-4 h-4 text-purple-500" />
                          )}
                          <span className="truncate max-w-[150px]" title={entry.title}>
                            {entry.title}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={entry.type === "Movie" ? "default" : "secondary"}>{entry.type}</Badge>
                      </TableCell>
                      <TableCell>{entry.director}</TableCell>
                      <TableCell>{entry.budget}</TableCell>
                      <TableCell>{entry.location}</TableCell>
                      <TableCell>{entry.duration}</TableCell>
                      <TableCell>{entry.year}</TableCell>
                      <TableCell>{entry.genre && <Badge variant="outline">{entry.genre}</Badge>}</TableCell>
                      <TableCell>
                        <div className="flex">
                          {Array.from({ length: 5 }, (_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${i < entry.rating ? "text-yellow-400" : "text-gray-300"}`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(entry)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                  This will permanently delete "{entry.title}" from your favorites. This action cannot
                                  be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(entry.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {loading && (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            )}

            {!hasMore && entries.length > 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>You've reached the end of your collection!</p>
              </div>
            )}

            {filteredEntries.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="text-muted-foreground">
                  {searchTerm || filterType !== "all" ? (
                    <div>
                      <p className="text-lg mb-2">No entries found</p>
                      <p>Try adjusting your search or filter criteria</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-lg mb-2">No entries yet</p>
                      <p>Add your first favorite movie or TV show to get started!</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
