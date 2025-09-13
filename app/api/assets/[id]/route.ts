import { NextResponse } from "next/server"

// Mock data matching the assets from /api/assets
const mockAssets = [
  {
    id: "real-estate-1",
    title: "Luxury Apartment in Manhattan",
    type: "real_estate" as const,
    category: "real_estate" as const,
    description:
      "Premium 2-bedroom apartment with stunning city views in the heart of Manhattan. Features modern amenities and prime location.",
    images: [
      "/luxury-manhattan-apartment-interior.jpg",
      "/manhattan-apartment-bedroom.jpg",
      "/manhattan-apartment-kitchen.jpg",
    ],
    panorama360: "https://img.freepik.com/premium-photo/360-panorana-of-modern-interior-room-3d-rendering_672982-2257.jpg?w=2000",
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
    // Additional details for asset page
    address: "432 Park Avenue, New York, NY 10022",
    yearBuilt: 2015,
    totalArea: "1,200 sq ft",
    bedrooms: 2,
    bathrooms: 2,
    occupancyRate: "100%",
    monthlyRent: 8500,
    expectedYield: 12.5,
    annualYield: 12.5,
    investors: 234,
    location: "Manhattan, New York",
    totalValue: 2500000,
    monthlyRevenue: 8500,
    operatingExpenses: 2500,
    netIncome: 6000,
    highlights: [
      "Премиальное расположение в центре Манхэттена",
      "Современные удобства и панорамные виды",
      "Стабильная арендная доходность 12.5% годовых",
      "Полностью документированная история владения"
    ],
    documents: [
      { name: "Property Deed", verified: true, url: "#" },
      { name: "Insurance Policy", verified: true, url: "#" },
      { name: "Inspection Report", verified: true, url: "#" },
      { name: "Appraisal Report", verified: true, url: "#" },
    ],
    priceHistory: [
      { date: "2024-01", price: 0.22 },
      { date: "2024-02", price: 0.23 },
      { date: "2024-03", price: 0.24 },
      { date: "2024-04", price: 0.245 },
      { date: "2024-05", price: 0.25 },
    ],
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
    // Additional details
    artist: "Alex Chen",
    medium: "Digital Art",
    dimensions: "4096x4096 pixels",
    edition: "1 of 1",
    yearCreated: 2024,
    expectedYield: 8.5,
    annualYield: 8.5,
    investors: 89,
    location: "Digital Gallery",
    totalValue: 150000,
    monthlyRevenue: 1062.5,
    operatingExpenses: 200,
    netIncome: 862.5,
    highlights: [
      "Уникальное сочетание классических и современных техник",
      "Ограниченное издание 1 из 1",
      "Высокое разрешение 4096x4096 пикселей",
      "Документированная история владения"
    ],
    documents: [
      { name: "Certificate of Authenticity", verified: true, url: "#" },
      { name: "Artist Statement", verified: true, url: "#" },
      { name: "Provenance Documentation", verified: true, url: "#" },
    ],
    priceHistory: [
      { date: "2024-01", price: 1.2 },
      { date: "2024-02", price: 1.3 },
      { date: "2024-03", price: 1.4 },
      { date: "2024-04", price: 1.45 },
      { date: "2024-05", price: 1.5 },
    ],
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
    // Additional details
    artist: "Sarah Kim",
    genre: "Synthwave/Electronic",
    duration: "48 minutes",
    tracks: 12,
    releaseDate: "2024-02-15",
    expectedYield: 15.2,
    annualYield: 15.2,
    investors: 1250,
    location: "Music Studio",
    totalValue: 400000,
    monthlyRevenue: 5066.67,
    operatingExpenses: 500,
    netIncome: 4566.67,
    highlights: [
      "12 треков премиум synthwave музыки",
      "Включает права на мастер-запись",
      "Распределение роялти инвесторам",
      "Высокая доходность 15.2% годовых"
    ],
    documents: [
      { name: "Master Recording Rights", verified: true, url: "#" },
      { name: "Publishing Agreement", verified: true, url: "#" },
      { name: "Royalty Distribution Contract", verified: true, url: "#" },
    ],
    priceHistory: [
      { date: "2024-02", price: 0.65 },
      { date: "2024-03", price: 0.7 },
      { date: "2024-04", price: 0.75 },
      { date: "2024-05", price: 0.8 },
    ],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Check mock assets first
  let asset = mockAssets.find((a) => a.id === params.id)
  
  // If not found in mock assets, check created assets
  if (!asset) {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001'}/api/assets/create`, {
        cache: 'no-store'
      })
      if (response.ok) {
        const createdAssets = await response.json()
        asset = createdAssets.find((a: any) => a.id === params.id)
      }
    } catch (error) {
      console.log('Error fetching created assets:', error)
    }
  }

  if (!asset) {
    return NextResponse.json({ error: "Asset not found" }, { status: 404 })
  }

  return NextResponse.json(asset)
}
