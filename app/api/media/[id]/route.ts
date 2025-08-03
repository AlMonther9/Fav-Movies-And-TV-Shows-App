import { type NextRequest, NextResponse } from "next/server"

// Mock database (in real app, this would be your database connection)
const mockDatabase = [
  // ... your mock data here
]

// PUT - Update media entry
export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const body = await request.json()

    const entryIndex = mockDatabase.findIndex((entry) => entry.id === Number.parseInt(id))

    if (entryIndex === -1) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    // Validate required fields
    if (!body.title || !body.director || !body.type) {
      return NextResponse.json({ error: "Missing required fields: title, director, type" }, { status: 400 })
    }

    const updatedEntry = {
      ...mockDatabase[entryIndex],
      ...body,
      id: Number.parseInt(id), // Ensure ID doesn't change
      updatedAt: new Date().toISOString(),
    }

    mockDatabase[entryIndex] = updatedEntry

    return NextResponse.json(updatedEntry)
  } catch (error) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }
}

// DELETE - Delete media entry
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params
    const entryIndex = mockDatabase.findIndex((entry) => entry.id === Number.parseInt(id))

    if (entryIndex === -1) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    const deletedEntry = mockDatabase.splice(entryIndex, 1)[0]

    return NextResponse.json({
      message: "Entry deleted successfully",
      deletedEntry,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 })
  }
}
