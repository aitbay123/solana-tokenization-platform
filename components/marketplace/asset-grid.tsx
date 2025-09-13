"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Building, Palette, Music, Gamepad2, TrendingUp, Users, Heart, Play } from "lucide-react"
import { useRouter } from "next/navigation"

interface Asset {
  id: string
  title: string
  category: "real_estate" | "art" | "music" | "gaming"
  description: string
  images: string[]
  audio?: string
  panorama360?: string
  totalSupply: number
  fractionsAvailable: number
  pricePerFraction: number
  onChainMint: string | null
  oracleValuationUSD: number
  kycRequired: boolean
}

const typeIcons = {
  real_estate: Building,
  art: Palette,
  music: Music,
  gaming: Gamepad2,
}

const typeLabels = {
  real_estate: "Real Estate",
  art: "Art & Collectibles",
  music: "Music & Audio",
  gaming: "Gaming Assets",
}

const typeColors = {
  real_estate: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  art: "bg-purple-500/20 text-purple-400 border-purple-500/30",
  music: "bg-pink-500/20 text-pink-400 border-pink-500/30",
  gaming: "bg-orange-500/20 text-orange-400 border-orange-500/30",
}

export function AssetGrid() {
  const [assets, setAssets] = useState<Asset[]>([])
  const [likedAssets, setLikedAssets] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await fetch("/api/assets")
        const data = await response.json()
        setAssets(data)
      } catch (error) {
        console.error("Failed to fetch assets:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAssets()
  }, [])

  const toggleLike = (assetId: string) => {
    const newLikedAssets = new Set(likedAssets)
    if (newLikedAssets.has(assetId)) {
      newLikedAssets.delete(assetId)
    } else {
      newLikedAssets.add(assetId)
    }
    setLikedAssets(newLikedAssets)
  }

  const handleAssetClick = (assetId: string) => {
    router.push(`/marketplace/asset/${assetId}`)
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Available Assets</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-white/5 border-white/10 animate-pulse">
              <div className="w-full h-48 bg-white/10 rounded-t-lg" />
              <CardContent className="p-6 space-y-4">
                <div className="h-4 bg-white/10 rounded w-3/4" />
                <div className="h-3 bg-white/10 rounded w-1/2" />
                <div className="h-20 bg-white/10 rounded" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Available Assets</h2>
        <p className="text-gray-400">{assets.length} assets found</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {assets.map((asset) => {
          const Icon = typeIcons[asset.category]
          const typeLabel = typeLabels[asset.category]
          const typeColor = typeColors[asset.category]
          const isLiked = likedAssets.has(asset.id)
          const soldPercentage = ((asset.totalSupply - asset.fractionsAvailable) / asset.totalSupply) * 100

          return (
            <Card
              key={asset.id}
              className="group hover:shadow-2xl hover:shadow-[#9945FF]/10 transition-all duration-300 cursor-pointer bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 hover:scale-105"
              onClick={() => handleAssetClick(asset.id)}
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={asset.images[0] || "/placeholder.svg"}
                  alt={asset.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                />

                {/* Media type indicator */}
                {asset.audio && (
                  <div className="absolute top-3 left-3 p-2 rounded-full bg-black/50 backdrop-blur-sm">
                    <Play className="w-4 h-4 text-white" />
                  </div>
                )}

                <button
                  className="absolute top-3 right-3 p-2 rounded-full bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleLike(asset.id)
                  }}
                >
                  <Heart
                    className={`w-4 h-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-white"}`}
                  />
                </button>

                <Badge className={`absolute bottom-3 left-3 ${typeColor} backdrop-blur-sm`}>
                  <Icon className="w-3 h-3 mr-1" />
                  {typeLabel}
                </Badge>
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-[#9945FF] group-hover:to-[#14F195] group-hover:bg-clip-text transition-all duration-300">
                  {asset.title}
                </CardTitle>
                <CardDescription className="text-gray-400 line-clamp-2">{asset.description}</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Token Price</p>
                    <p className="font-semibold text-white">${asset.pricePerFraction}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total Value</p>
                    <p className="font-semibold text-white">${asset.oracleValuationUSD.toLocaleString()}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Sold</span>
                    <span className="text-white">{soldPercentage.toFixed(1)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-[#9945FF] to-[#14F195] h-2 rounded-full transition-all duration-300"
                      style={{ width: `${soldPercentage}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center text-[#14F195]">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    <span className="font-medium">
                      {asset.category === "real_estate"
                        ? "12.5"
                        : asset.category === "art"
                          ? "8.5"
                          : asset.category === "music"
                            ? "15.2"
                            : "22.1"}
                      % APY
                    </span>
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Users className="w-3 h-3 mr-1" />
                    <span>
                      {asset.category === "real_estate"
                        ? "234"
                        : asset.category === "art"
                          ? "89"
                          : asset.category === "music"
                            ? "1,250"
                            : "456"}{" "}
                      investors
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3FE8] hover:to-[#12D488] text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 border-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAssetClick(asset.id)
                  }}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-8">
        <Button
          variant="outline"
          size="lg"
          className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 rounded-xl"
        >
          Load More Assets
        </Button>
      </div>
    </div>
  )
}
