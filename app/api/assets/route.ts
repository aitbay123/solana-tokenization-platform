import { NextResponse } from "next/server"

// Import created assets from the create endpoint
let createdAssets: any[] = []

// Function to get created assets (in a real app, this would be from a database)
async function getCreatedAssets() {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/assets/create`, {
      cache: 'no-store'
    })
    if (response.ok) {
      createdAssets = await response.json()
    }
  } catch (error) {
    console.log('No created assets found')
  }
}

// Mock data for different asset types as specified in requirements
const mockAssets = [
  {
    id: "real-estate-1",
    title: "Luxury Apartment in Manhattan",
    type: "real_estate" as const,
    category: "real_estate" as const,
    description:
      "Premium 2-bedroom apartment with stunning city views in the heart of Manhattan. Features modern amenities and prime location.",
    images: ["/luxury-manhattan-apartment-interior.jpg", "/manhattan-apartment-bedroom.jpg", "/manhattan-apartment-kitchen.jpg"],
    panorama360: "/360-degree-apartment-tour.jpg",
    totalSupply: 1000000,
    availableTokens: 750000,
    fractionsAvailable: 750000,
    pricePerToken: 0.25,
    pricePerFraction: 0.25,
    onChainMint: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU",
    provenance: {
      ownerHistory: [
        {
          owner: "Manhattan Real Estate LLC",
          txHash: "5KJp4XK9b2vR4YmwGdVdGDFRTb7we1feNsvy6ndEeNsn",
          date: "2024-01-15",
        },
        { owner: "Premium Properties Inc", txHash: "3Nc2k8PQHPsHNzSgd5uJkbHjRQoLvfhCyBzpDiVdvHWq", date: "2023-08-20" },
      ],
    },
    oracleValuationUSD: 2500000,
    kycRequired: true,
  },
  {
    id: "art-1",
    title: "Digital Renaissance #001",
    type: "art" as const,
    category: "art" as const,
    description:
      "Exclusive digital artwork combining classical Renaissance techniques with modern AI-generated elements. Limited edition piece.",
    images: ["/renaissance-digital-art-masterpiece.jpg", "/digital-art-close-up-details.jpg"],
    totalSupply: 100000,
    availableTokens: 85000,
    fractionsAvailable: 85000,
    pricePerToken: 1.5,
    pricePerFraction: 1.5,
    onChainMint: "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM",
    provenance: {
      ownerHistory: [
        {
          owner: "Digital Arts Collective",
          txHash: "8FGh3XK9c4wS6ZnxHdWdHEGSTc8xf2gfOtwz7oeEfOto",
          date: "2024-02-10",
        },
        { owner: "Artist: Alex Chen", txHash: "2Md3l9QIIQtIOoTth6vKlcIkSRpMwgiDzCqEjWdwIXr", date: "2024-01-05" },
      ],
    },
    oracleValuationUSD: 150000,
    kycRequired: false,
  },
  {
    id: "music-1",
    title: "Synthwave Dreams Album",
    type: "music" as const,
    category: "music" as const,
    description:
      "Complete album featuring 12 tracks of premium synthwave music. Includes master rights and royalty distribution.",
    images: ["/synthwave-album-cover-neon.png", "/music-studio-recording.jpg"],
    audio: "/placeholder.mp3?query=synthwave electronic music sample",
    totalSupply: 500000,
    availableTokens: 320000,
    fractionsAvailable: 320000,
    pricePerToken: 0.8,
    pricePerFraction: 0.8,
    onChainMint: "4VfE2id2afZ3E6BQMtwBduZGNjmksHwED8P6AP6fjlAU",
    provenance: {
      ownerHistory: [
        { owner: "Neon Records", txHash: "6JKq5YL0d5xT7aoyCeXeIFHTUd9yg3hgPuxA8pfGgPup", date: "2024-03-01" },
        { owner: "Producer: Sarah Kim", txHash: "1Le4m0RJJRuJPpUui7wLmdJlTSqNxhjEzDrFkXexJYs", date: "2024-02-15" },
      ],
    },
    oracleValuationUSD: 400000,
    kycRequired: false,
  },
  {
    id: "gaming-1",
    title: "Legendary Sword of Flames",
    type: "gaming" as const,
    category: "gaming" as const,
    description:
      "Ultra-rare legendary weapon from the popular MMORPG 'Realm of Legends'. Unique stats and visual effects.",
    images: ["/legendary-flaming-sword-game-weapon.jpg", "/sword-weapon-stats-interface.jpg"],
    totalSupply: 10000,
    availableTokens: 7500,
    fractionsAvailable: 7500,
    pricePerToken: 5.0,
    pricePerFraction: 5.0,
    onChainMint: "3UgCxGUgdvMjRBzPdgNvMaGqwQrNkn5tzPiAr4sAsVmq",
    provenance: {
      ownerHistory: [
        { owner: "GameFi Vault", txHash: "7HLr6ZM1e6yU8bpzIdYdJGITVe0zh4ihQvyB9qgHhQvq", date: "2024-02-20" },
        { owner: "Player: DragonSlayer99", txHash: "5Nf5n1SKKSvKQqVvj8xMneLmUTrOyikFzEsGlYfyKZt", date: "2024-01-10" },
      ],
    },
    oracleValuationUSD: 50000,
    kycRequired: false,
  },
  {
    id: "real-estate-2",
    title: "Beachfront Villa in Malibu",
    type: "real_estate" as const,
    category: "real_estate" as const,
    description:
      "Stunning oceanfront property with private beach access, infinity pool, and panoramic Pacific Ocean views.",
    images: ["/malibu-beachfront-villa-exterior.jpg", "/villa-infinity-pool-ocean-view.jpg"],
    panorama360: "/360-villa-tour-ocean-view.jpg",
    totalSupply: 2000000,
    availableTokens: 1200000,
    fractionsAvailable: 1200000,
    pricePerToken: 2.75,
    pricePerFraction: 2.75,
    onChainMint: "8XmYuh3CX98e8TbOKqEeKGJTWd0zi5jkRwzC0rjHjWXr",
    provenance: {
      ownerHistory: [
        {
          owner: "Coastal Properties Group",
          txHash: "9GKs7YN2f7zV9cqzJfZfKHKUWf1aj6kjSwyD0sjKkSwz",
          date: "2024-01-25",
        },
      ],
    },
    oracleValuationUSD: 5500000,
    kycRequired: true,
  },
  {
    id: "art-2",
    title: "Abstract Geometry Collection",
    type: "art" as const,
    category: "art" as const,
    description: "Series of 5 abstract geometric paintings exploring the intersection of mathematics and visual art.",
    images: ["/abstract-geometric-art-colorful.jpg", "/geometric-patterns-mathematical-art.jpg"],
    totalSupply: 250000,
    availableTokens: 180000,
    fractionsAvailable: 180000,
    pricePerToken: 0.6,
    pricePerFraction: 0.6,
    onChainMint: "6WaFvh4DY09f9UcRLqGgLHLUXe2bk7lkTxzE1tkLlYXs",
    provenance: {
      ownerHistory: [
        { owner: "Modern Art Gallery", txHash: "4HMs8ZO3g8aW0drzKgagMILVYg2cl8mjUxzF2ulMmYxt", date: "2024-02-28" },
      ],
    },
    oracleValuationUSD: 150000,
    kycRequired: false,
  },
]

export async function GET(request: Request) {
  // Get created assets
  await getCreatedAssets()
  
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const minPrice = searchParams.get("minPrice")
  const maxPrice = searchParams.get("maxPrice")
  const search = searchParams.get("search")

  // Combine mock assets with created assets
  let filteredAssets = [...mockAssets, ...createdAssets]

  // Filter by category
  if (category && category !== "all") {
    filteredAssets = filteredAssets.filter((asset) => asset.category === category)
  }

  // Filter by price range
  if (minPrice) {
    filteredAssets = filteredAssets.filter((asset) => asset.pricePerFraction >= Number.parseFloat(minPrice))
  }
  if (maxPrice) {
    filteredAssets = filteredAssets.filter((asset) => asset.pricePerFraction <= Number.parseFloat(maxPrice))
  }

  // Filter by search term
  if (search) {
    const searchLower = search.toLowerCase()
    filteredAssets = filteredAssets.filter(
      (asset) =>
        asset.title.toLowerCase().includes(searchLower) || asset.description.toLowerCase().includes(searchLower),
    )
  }

  return NextResponse.json(filteredAssets)
}
