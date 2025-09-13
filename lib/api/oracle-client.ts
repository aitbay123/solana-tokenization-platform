// Oracle client for fetching real-time asset prices and market data
export interface PriceData {
  symbol: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
  lastUpdated: number
}

export interface AssetValuation {
  assetId: string
  currentValue: number
  estimatedValue: number
  confidence: number
  lastAppraisal: number
  priceHistory: Array<{
    timestamp: number
    value: number
  }>
}

export interface MarketData {
  totalMarketCap: number
  totalVolume24h: number
  activeAssets: number
  priceChange24h: number
}

class OracleClient {
  private baseUrl = "https://api.coingecko.com/api/v3"
  private pythUrl = "https://hermes.pyth.network/api"

  // Fetch cryptocurrency prices (for SOL, USDC, etc.)
  async getCryptoPrices(symbols: string[]): Promise<PriceData[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}/simple/price?ids=${symbols.join(",")}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_market_cap=true`,
      )
      const data = await response.json()

      return symbols.map((symbol) => ({
        symbol,
        price: data[symbol]?.usd || 0,
        change24h: data[symbol]?.usd_24h_change || 0,
        volume24h: data[symbol]?.usd_24h_vol || 0,
        marketCap: data[symbol]?.usd_market_cap || 0,
        lastUpdated: Date.now(),
      }))
    } catch (error) {
      console.error("[v0] Error fetching crypto prices:", error)
      return this.getMockCryptoPrices(symbols)
    }
  }

  // Fetch real estate market data (mock implementation)
  async getRealEstatePrice(location: string, propertyType: string): Promise<number> {
    try {
      // In a real implementation, this would connect to real estate APIs
      // like Zillow, Realty Mole, or local MLS systems
      const mockPrices: Record<string, number> = {
        "moscow-apartment": 15000000,
        "moscow-office": 25000000,
        "spb-apartment": 8000000,
        "ny-apartment": 1200000,
        "london-apartment": 800000,
      }

      const key = `${location.toLowerCase()}-${propertyType.toLowerCase()}`
      return mockPrices[key] || 10000000
    } catch (error) {
      console.error("[v0] Error fetching real estate price:", error)
      return 10000000
    }
  }

  // Fetch art market valuation (mock implementation)
  async getArtValuation(artist: string, medium: string, year: number): Promise<number> {
    try {
      // In a real implementation, this would connect to art market APIs
      // like Artsy, Artnet, or auction house databases
      const baseValue = 500000
      const artistMultiplier = artist.toLowerCase().includes("picasso") ? 10 : 1
      const ageMultiplier = (2024 - year) * 0.02 + 1

      return Math.round(baseValue * artistMultiplier * ageMultiplier)
    } catch (error) {
      console.error("[v0] Error fetching art valuation:", error)
      return 500000
    }
  }

  // Get asset valuation with price history
  async getAssetValuation(assetId: string, assetType: string): Promise<AssetValuation> {
    try {
      let currentValue = 0

      switch (assetType) {
        case "real-estate":
          currentValue = await this.getRealEstatePrice("moscow", "apartment")
          break
        case "art":
          currentValue = await this.getArtValuation("unknown", "painting", 2020)
          break
        case "music":
          currentValue = 100000 // Mock music rights value
          break
        default:
          currentValue = 1000000
      }

      // Generate mock price history
      const priceHistory = this.generatePriceHistory(currentValue, 30)

      return {
        assetId,
        currentValue,
        estimatedValue: currentValue * 1.05, // 5% premium estimate
        confidence: 0.85,
        lastAppraisal: Date.now() - 7 * 24 * 60 * 60 * 1000, // 7 days ago
        priceHistory,
      }
    } catch (error) {
      console.error("[v0] Error fetching asset valuation:", error)
      return this.getMockAssetValuation(assetId)
    }
  }

  // Get overall market statistics
  async getMarketData(): Promise<MarketData> {
    try {
      // In a real implementation, this would aggregate data from multiple sources
      return {
        totalMarketCap: 2500000000, // $2.5B
        totalVolume24h: 45000000, // $45M
        activeAssets: 1247,
        priceChange24h: 2.34,
      }
    } catch (error) {
      console.error("[v0] Error fetching market data:", error)
      return {
        totalMarketCap: 0,
        totalVolume24h: 0,
        activeAssets: 0,
        priceChange24h: 0,
      }
    }
  }

  // Helper methods
  private generatePriceHistory(currentPrice: number, days: number) {
    const history = []
    const now = Date.now()

    for (let i = days; i >= 0; i--) {
      const timestamp = now - i * 24 * 60 * 60 * 1000
      const volatility = 0.02 // 2% daily volatility
      const randomChange = (Math.random() - 0.5) * volatility * 2
      const value = currentPrice * (1 + randomChange * (i / days))

      history.push({ timestamp, value: Math.round(value) })
    }

    return history
  }

  private getMockCryptoPrices(symbols: string[]): PriceData[] {
    const mockPrices: Record<string, Partial<PriceData>> = {
      solana: { price: 98.45, change24h: 3.2, volume24h: 2100000000, marketCap: 45000000000 },
      "usd-coin": { price: 1.0, change24h: 0.01, volume24h: 5200000000, marketCap: 32000000000 },
      bitcoin: { price: 67890, change24h: 1.8, volume24h: 28000000000, marketCap: 1340000000000 },
    }

    return symbols.map((symbol) => ({
      symbol,
      price: mockPrices[symbol]?.price || 1,
      change24h: mockPrices[symbol]?.change24h || 0,
      volume24h: mockPrices[symbol]?.volume24h || 0,
      marketCap: mockPrices[symbol]?.marketCap || 0,
      lastUpdated: Date.now(),
    }))
  }

  private getMockAssetValuation(assetId: string): AssetValuation {
    const currentValue = 1000000
    return {
      assetId,
      currentValue,
      estimatedValue: currentValue * 1.05,
      confidence: 0.75,
      lastAppraisal: Date.now() - 7 * 24 * 60 * 60 * 1000,
      priceHistory: this.generatePriceHistory(currentValue, 30),
    }
  }
}

export const oracleClient = new OracleClient()
