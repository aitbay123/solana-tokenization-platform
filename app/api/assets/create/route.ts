import { NextRequest, NextResponse } from "next/server"

// In a real application, you would save this to a database
// For now, we'll store it in memory (will be lost on server restart)
let createdAssets: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'assetType', 'totalValue', 'tokenSupply']
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    // Generate a unique ID
    const assetId = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Calculate derived fields
    const pricePerToken = body.totalValue / body.tokenSupply
    const availableTokens = body.tokenSupply // Initially all tokens are available
    
    // Create the asset object
    const newAsset = {
      id: assetId,
      title: body.title,
      description: body.description,
      type: body.assetType,
      category: body.assetType, // For compatibility
      location: body.location || 'Не указано',
      images: body.images || [],
      audio: body.audio || null,
      panorama360: body.panorama360 || null,
      totalSupply: body.tokenSupply,
      availableTokens: availableTokens,
      fractionsAvailable: availableTokens, // For compatibility
      pricePerToken: pricePerToken,
      pricePerFraction: pricePerToken, // For compatibility
      totalValue: body.totalValue,
      expectedYield: body.expectedYield || 0,
      annualYield: body.expectedYield || 0, // For compatibility
      minimumInvestment: body.minimumInvestment || 100,
      investors: 0, // Initially no investors
      onChainMint: `GeneratedMint_${assetId}`,
      kycRequired: body.kycRequired || false,
      // Additional fields for detailed view
      monthlyRevenue: body.monthlyRevenue || 0,
      operatingExpenses: body.operatingExpenses || 0,
      netIncome: body.monthlyRevenue && body.operatingExpenses 
        ? body.monthlyRevenue - body.operatingExpenses 
        : 0,
      highlights: body.highlights || [
        "Новый актив, созданный пользователем",
        "Потенциал для роста",
        "Доступен для инвестирования"
      ],
      documents: body.documents || [],
      priceHistory: [
        {
          date: new Date().toISOString().slice(0, 7), // Current month
          price: pricePerToken
        }
      ],
      provenance: {
        ownerHistory: [
          {
            owner: body.owner || 'Пользователь',
            txHash: `UserCreated_${assetId}`,
            date: new Date().toISOString().split('T')[0]
          }
        ]
      },
      oracleValuationUSD: body.totalValue,
      createdAt: new Date().toISOString()
    }

    // Add to our in-memory storage
    createdAssets.push(newAsset)

    return NextResponse.json({
      success: true,
      asset: newAsset,
      message: "Asset created successfully"
    })

  } catch (error) {
    console.error('Error creating asset:', error)
    return NextResponse.json(
      { error: 'Failed to create asset' },
      { status: 500 }
    )
  }
}

// Get all created assets
export async function GET() {
  return NextResponse.json(createdAssets)
}
