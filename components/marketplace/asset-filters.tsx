"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Filter, X, Building, Palette, Music, Gamepad2 } from "lucide-react"

export function AssetFilters() {
  const [priceRange, setPriceRange] = useState([0, 10])
  const [selectedTypes, setSelectedTypes] = useState<string[]>([])

  const assetTypes = [
    { id: "real_estate", label: "Real Estate", count: 450, icon: Building, color: "text-blue-400" },
    { id: "art", label: "Art & Collectibles", count: 320, icon: Palette, color: "text-purple-400" },
    { id: "music", label: "Music & Audio", count: 280, icon: Music, color: "text-pink-400" },
    { id: "gaming", label: "Gaming Assets", count: 150, icon: Gamepad2, color: "text-orange-400" },
  ]

  const handleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes([...selectedTypes, typeId])
    } else {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId))
    }
  }

  const clearFilters = () => {
    setSelectedTypes([])
    setPriceRange([0, 10])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white flex items-center">
          <Filter className="w-5 h-5 mr-2 text-[#14F195]" />
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-400 hover:text-white hover:bg-white/5"
        >
          <X className="w-4 h-4 mr-1" />
          Clear
        </Button>
      </div>

      {/* Asset Type Filter */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white">Asset Type</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {assetTypes.map((type) => {
            const Icon = type.icon
            return (
              <div key={type.id} className="flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id={type.id}
                    checked={selectedTypes.includes(type.id)}
                    onCheckedChange={(checked) => handleTypeChange(type.id, !!checked)}
                    className="border-white/20 data-[state=checked]:bg-[#9945FF] data-[state=checked]:border-[#9945FF]"
                  />
                  <Icon className={`w-4 h-4 ${type.color}`} />
                  <Label
                    htmlFor={type.id}
                    className="text-sm font-normal cursor-pointer text-gray-300 group-hover:text-white transition-colors"
                  >
                    {type.label}
                  </Label>
                </div>
                <span className="text-xs text-gray-500">({type.count})</span>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white">Price per Token (USD)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Slider value={priceRange} onValueChange={setPriceRange} max={10} min={0} step={0.1} className="w-full" />
          <div className="flex justify-between text-sm text-gray-400">
            <span>${priceRange[0].toFixed(1)}</span>
            <span>${priceRange[1].toFixed(1)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Yield Filter */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white">Annual Yield</CardTitle>
        </CardHeader>
        <CardContent>
          <Select>
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1C24] border-white/10">
              <SelectItem value="0-5" className="text-gray-300 hover:text-white">
                0% - 5%
              </SelectItem>
              <SelectItem value="5-10" className="text-gray-300 hover:text-white">
                5% - 10%
              </SelectItem>
              <SelectItem value="10-15" className="text-gray-300 hover:text-white">
                10% - 15%
              </SelectItem>
              <SelectItem value="15+" className="text-gray-300 hover:text-white">
                15%+
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Sort Filter */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-base text-white">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select defaultValue="newest">
            <SelectTrigger className="bg-white/5 border-white/10 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#1A1C24] border-white/10">
              <SelectItem value="newest" className="text-gray-300 hover:text-white">
                Newest
              </SelectItem>
              <SelectItem value="price-low" className="text-gray-300 hover:text-white">
                Price: Low to High
              </SelectItem>
              <SelectItem value="price-high" className="text-gray-300 hover:text-white">
                Price: High to Low
              </SelectItem>
              <SelectItem value="yield-high" className="text-gray-300 hover:text-white">
                Highest Yield
              </SelectItem>
              <SelectItem value="popular" className="text-gray-300 hover:text-white">
                Most Popular
              </SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>
    </div>
  )
}
