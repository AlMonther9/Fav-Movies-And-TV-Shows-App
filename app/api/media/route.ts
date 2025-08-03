import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

interface MediaEntry {
  id: number;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget: string;
  location: string;
  duration: string;
  year: string;
  genre: string;
  description: string;
  rating: number;
  createdAt: string;
  userId: number;
}

const mediaEntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["Movie", "TV_Show"]),
  director: z.string().min(1, "Director is required"),
  budget: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  year: z.string().optional(),
  genre: z.string().optional(),
  description: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
});

// GET - Fetch media entries with pagination and filtering
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as { user?: { id: string } };

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";
    const type = searchParams.get("type") || "all";

    // Build where clause for filtering
    const where: any = {
      userId: session.user.id,
    };

    // Add search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { director: { contains: search, mode: "insensitive" } },
        { genre: { contains: search, mode: "insensitive" } },
      ];
    }

    // Add type filter
    if (type !== "all") {
      where.type = type === "TV Show" ? "TV_Show" : "Movie";
    }

    // Get total count for pagination
    const totalCount = await prisma.mediaEntry.count({ where });

    // Get paginated entries
    const entries = await prisma.mediaEntry.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    // Transform the data to match frontend expectations
    const transformedEntries = entries.map((entry) => ({
      ...entry,
      type: entry.type === "TV_Show" ? "TV Show" : entry.type,
    }));

    const hasMore = page * limit < totalCount;

    return NextResponse.json({
      entries: transformedEntries,
      totalCount,
      hasMore,
      page,
      limit,
    });
  } catch (error) {
    console.error("Error fetching media entries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST - Create new media entry
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as { user?: { id: string } };

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    // Validate the request body
    const validatedData = mediaEntrySchema.parse(body);

    // Transform type for database
    const dbType =
      validatedData.type === "TV_Show" ? "TV_Show" : validatedData.type;

    const newEntry = await prisma.mediaEntry.create({
      data: {
        ...validatedData,
        type: dbType,
        userId: session.user.id,
      },
    });

    // Transform back for frontend
    const transformedEntry = {
      ...newEntry,
      type: newEntry.type === "TV_Show" ? "TV Show" : newEntry.type,
    };

    return NextResponse.json(transformedEntry, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error creating media entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
