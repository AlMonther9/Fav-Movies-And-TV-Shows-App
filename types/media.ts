export interface MediaEntry {
  id: number;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget?: string;
  location?: string;
  duration?: string;
  year?: string;
  genre?: string;
  description?: string;
  rating: number;
  createdAt: string;
  updatedAt?: string;
}
