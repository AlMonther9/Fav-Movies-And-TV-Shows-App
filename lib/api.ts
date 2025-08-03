import type { MediaEntry } from "@/types/media";

export interface MediaResponse {
  entries: MediaEntry[];
  totalCount: number;
  hasMore: boolean;
  page: number;
  limit: number;
}

export interface ApiError {
  error: string;
  details?: any;
}

class ApiClient {
  private async request<T>(url: string, options: RequestInit = {}): Promise<T> {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData: ApiError = await response.json().catch(() => ({
        error: "Network error",
      }));
      throw new Error(errorData.error || "Request failed");
    }

    return response.json();
  }

  async getMediaEntries(
    params: {
      page?: number;
      limit?: number;
      search?: string;
      type?: string;
    } = {}
  ): Promise<MediaResponse> {
    const searchParams = new URLSearchParams();

    if (params.page) searchParams.set("page", params.page.toString());
    if (params.limit) searchParams.set("limit", params.limit.toString());
    if (params.search) searchParams.set("search", params.search);
    if (params.type) searchParams.set("type", params.type);

    return this.request<MediaResponse>(`/api/media?${searchParams}`);
  }

  async createMediaEntry(
    entry: Omit<MediaEntry, "id" | "createdAt">
  ): Promise<MediaEntry> {
    return this.request<MediaEntry>("/api/media", {
      method: "POST",
      body: JSON.stringify(entry),
    });
  }

  async updateMediaEntry(
    id: number,
    entry: Omit<MediaEntry, "id" | "createdAt">
  ): Promise<MediaEntry> {
    return this.request<MediaEntry>(`/api/media/${id}`, {
      method: "PUT",
      body: JSON.stringify(entry),
    });
  }

  async deleteMediaEntry(
    id: number
  ): Promise<{ message: string; deletedEntry: MediaEntry }> {
    return this.request(`/api/media/${id}`, {
      method: "DELETE",
    });
  }
}

export const apiClient = new ApiClient();
