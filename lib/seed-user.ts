import { prisma } from "@/lib/prisma";

export async function seedUserCollection(userId: string) {
  try {
    // Check if user is already seeded
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { isSeeded: true },
    });

    if (user?.isSeeded) {
      return; // User already has seeded data
    }

    // Get all global entries (you can create these manually or have a system user)
    const globalEntries = await prisma.mediaEntry.findMany({
      where: { isGlobal: true },
      take: 20, // Limit to prevent too many entries
    });

    if (globalEntries.length === 0) {
      // If no global entries exist, create some default ones
      await createDefaultGlobalEntries();
      // Retry getting global entries
      const newGlobalEntries = await prisma.mediaEntry.findMany({
        where: { isGlobal: true },
        take: 20,
      });

      if (newGlobalEntries.length > 0) {
        await copyGlobalEntriesToUser(userId, newGlobalEntries);
      }
    } else {
      await copyGlobalEntriesToUser(userId, globalEntries);
    }

    // Mark user as seeded
    await prisma.user.update({
      where: { id: userId },
      data: { isSeeded: true },
    });

    console.log(
      `Successfully seeded ${globalEntries.length} entries for user ${userId}`
    );
  } catch (error) {
    console.error("Error seeding user collection:", error);
    // Don't throw error to prevent blocking user registration/login
  }
}

async function copyGlobalEntriesToUser(userId: string, globalEntries: any[]) {
  const userEntries = globalEntries.map((entry) => ({
    userId,
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
    posterUrl: entry.posterUrl,
    isGlobal: false, // User's copy is not global
    globalId: entry.id, // Reference to original global entry
  }));

  await prisma.mediaEntry.createMany({
    data: userEntries,
    skipDuplicates: true,
  });
}

async function createDefaultGlobalEntries() {
  const defaultEntries = [
    {
      userId: "system", // You'll need to create a system user or use an existing user ID
      title: "Blade Runner 2049",
      type: "Movie" as const,
      director: "Denis Villeneuve",
      budget: "$150M",
      location: "Budapest, Hungary",
      duration: "164 min",
      year: "2017",
      genre: "Sci-Fi",
      description:
        "A young blade runner discovers a long-buried secret that leads him to track down former blade runner Rick Deckard.",
      rating: 5,
      isGlobal: true,
    },
    {
      userId: "system",
      title: "The Matrix",
      type: "Movie" as const,
      director: "The Wachowskis",
      budget: "$63M",
      location: "Sydney, Australia",
      duration: "136 min",
      year: "1999",
      genre: "Sci-Fi",
      description:
        "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality.",
      rating: 5,
      isGlobal: true,
    },
    {
      userId: "system",
      title: "Cyberpunk: Edgerunners",
      type: "TV_Show" as const,
      director: "Hiroyuki Imaishi",
      budget: "$3M/ep",
      location: "Tokyo, Japan",
      duration: "25 min/ep",
      year: "2022",
      genre: "Anime",
      description:
        "A street kid tries to survive in a technology and body modification-obsessed city of the future.",
      rating: 5,
      isGlobal: true,
    },
    {
      userId: "system",
      title: "Black Mirror",
      type: "TV_Show" as const,
      director: "Charlie Brooker",
      budget: "$2M/ep",
      location: "London, UK",
      duration: "60 min/ep",
      year: "2011-2019",
      genre: "Sci-Fi",
      description:
        "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations collide.",
      rating: 5,
      isGlobal: true,
    },
    {
      userId: "system",
      title: "Ghost in the Shell",
      type: "Movie" as const,
      director: "Mamoru Oshii",
      budget: "$10M",
      location: "Tokyo, Japan",
      duration: "83 min",
      year: "1995",
      genre: "Anime",
      description:
        "A cyborg policewoman hunts a powerful hacker known as the Puppet Master.",
      rating: 5,
      isGlobal: true,
    },
  ];

  try {
    await prisma.mediaEntry.createMany({
      data: defaultEntries,
      skipDuplicates: true,
    });
  } catch (error) {
    console.error("Error creating default global entries:", error);
  }
}
