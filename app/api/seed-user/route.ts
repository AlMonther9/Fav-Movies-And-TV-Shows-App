import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { seedUserCollection } from "@/lib/seed-user";

// POST - Manually seed current user's collection (for testing/admin)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Force seed the user (even if already seeded)
    const { searchParams } = new URL(request.url);
    const force = searchParams.get("force") === "true";

    await seedUserCollection(session.user.id, force);

    return NextResponse.json({
      message: "User collection seeded successfully",
      userId: session.user.id,
    });
  } catch (error) {
    console.error("Error seeding user collection:", error);
    return NextResponse.json(
      { error: "Failed to seed user collection" },
      { status: 500 }
    );
  }
}
