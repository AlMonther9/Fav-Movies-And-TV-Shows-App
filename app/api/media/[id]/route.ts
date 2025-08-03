import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const mediaEntrySchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.enum(["Movie", "TV Show"]),
  director: z.string().min(1, "Director is required"),
  budget: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  year: z.string().optional(),
  genre: z.string().optional(),
  description: z.string().optional(),
  rating: z.number().min(1).max(5).default(5),
});

// PUT - Update media entry
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions) as { user?: { id: string } };

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const entryId = Number.parseInt(id);

    if (isNaN(entryId)) {
      return NextResponse.json({ error: "Invalid entry ID" }, { status: 400 });
    }

    // Check if entry exists and belongs to user
    const existingEntry = await prisma.mediaEntry.findFirst({
      where: {
        id: entryId,
        userId: session.user.id,
      },
    });

    if (!existingEntry) {
      return NextResponse.json(
        { error: "Entry not found or access denied" },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validatedData = mediaEntrySchema.parse(body);

    // Transform type for database
    const dbType =
      validatedData.type === "TV Show" ? "TV_Show" : validatedData.type;

    const updatedEntry = await prisma.mediaEntry.update({
      where: { id: entryId },
      data: {
        ...validatedData,
        type: dbType,
      },
    });

    // Transform back for frontend
    const transformedEntry = {
      ...updatedEntry,
      type: updatedEntry.type === "TV_Show" ? "TV Show" : updatedEntry.type,
    };

    return NextResponse.json(transformedEntry);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 }
      );
    }

    console.error("Error updating media entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE - Delete media entry
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions) as { user?: { id: string } };

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const entryId = Number.parseInt(id);

    if (isNaN(entryId)) {
      return NextResponse.json({ error: "Invalid entry ID" }, { status: 400 });
    }

    // Check if entry exists and belongs to user
    const existingEntry = await prisma.mediaEntry.findFirst({
      where: {
        id: entryId,
        userId: session.user.id,
      },
    });

    if (!existingEntry) {
      return NextResponse.json(
        { error: "Entry not found or access denied" },
        { status: 404 }
      );
    }

    await prisma.mediaEntry.delete({
      where: { id: entryId },
    });

    return NextResponse.json({
      message: "Entry deleted successfully",
      deletedEntry: {
        ...existingEntry,
        type: existingEntry.type === "TV_Show" ? "TV Show" : existingEntry.type,
      },
    });
  } catch (error) {
    console.error("Error deleting media entry:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
