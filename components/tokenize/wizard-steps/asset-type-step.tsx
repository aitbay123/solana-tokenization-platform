"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Building, Palette, Music, Gamepad2 } from "lucide-react"
import type { WizardData } from "../tokenization-wizard"

interface AssetTypeStepProps {
  data: WizardData
  updateData: (data: Partial<WizardData>) => void
}

const assetTypes = [
  {
    id: "real_estate" as const,
    title: "Real Estate",
    description: "Properties, buildings, and land assets with 360° virtual tours",
    icon: Building,
    color: "from-blue-500 to-cyan-500",
    features: ["360° Virtual Tours", "Property Documentation", "Rental Income Tracking", "Market Valuation"],
  },
  {
    id: "art" as const,
    title: "Art & Collectibles",
    description: "Paintings, sculptures, and digital art with high-resolution viewing",
    icon: Palette,
    color: "from-purple-500 to-pink-500",
    features: ["High-Resolution Gallery", "Provenance Tracking", "Authentication", "Market Analysis"],
  },
  {
    id: "music" as const,
    title: "Music & Audio",
    description: "Albums, tracks, and royalty rights with integrated audio player",
    icon: Music,
    color: "from-pink-500 to-rose-500",
    features: ["Integrated Audio Player", "Royalty Distribution", "Streaming Analytics", "Rights Management"],
  },
  {
    id: "gaming" as const,
    title: "Gaming Assets",
    description: "Virtual items, characters, and in-game assets",
    icon: Gamepad2,
    color: "from-orange-500 to-yellow-500",
    features: ["3D Asset Viewer", "Game Integration", "Rarity Verification", "Cross-Platform Support"],
  },
]

export function AssetTypeStep({ data, updateData }: AssetTypeStepProps) {
  const handleAssetTypeSelect = (assetType: WizardData["assetType"]) => {
    updateData({ assetType })
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Choose Your Asset Type</h3>
        <p className="text-gray-400">Select the category that best describes your asset</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {assetTypes.map((type) => {
          const Icon = type.icon
          const isSelected = data.assetType === type.id

          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
                isSelected
                  ? "bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 border-[#9945FF]/50 shadow-lg shadow-[#9945FF]/25"
                  : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}
              onClick={() => handleAssetTypeSelect(type.id)}
            >
              <CardHeader className="text-center">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-4 ${
                    isSelected ? "scale-110" : ""
                  } transition-transform duration-300`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-xl text-white">{type.title}</CardTitle>
                <CardDescription className="text-gray-400">{type.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {type.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm text-gray-300">
                      <div className="w-1.5 h-1.5 bg-[#14F195] rounded-full mr-3" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {data.assetType && (
        <div className="text-center p-4 bg-[#14F195]/10 border border-[#14F195]/20 rounded-lg">
          <p className="text-[#14F195] font-medium">
            Great choice! You've selected {assetTypes.find((type) => type.id === data.assetType)?.title}
          </p>
        </div>
      )}
    </div>
  )
}
