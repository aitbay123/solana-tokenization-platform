"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Save, ArrowLeft, DollarSign, Coins, MapPin, FileText } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"

interface AssetEditFormProps {
  assetId: string
}

interface AssetData {
  id: string
  title: string
  description: string
  location: string
  assetType: string
  totalValue: number
  tokenSupply: number
  expectedYield: number
  minimumInvestment: number
  kycRequired: boolean
  images: string[]
  audio?: string
  panorama360?: string
  highlights: string[]
}

export function AssetEditForm({ assetId }: AssetEditFormProps) {
  const [assetData, setAssetData] = useState<AssetData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const router = useRouter()

  useEffect(() => {
    fetchAssetData()
  }, [assetId])

  const fetchAssetData = async () => {
    try {
      const response = await fetch(`/api/assets/${assetId}/edit`)
      if (response.ok) {
        const data = await response.json()
        setAssetData(data)
      } else {
        toast.error("Ошибка загрузки данных актива")
        router.push("/marketplace")
      }
    } catch (error) {
      console.error("Error fetching asset data:", error)
      toast.error("Ошибка загрузки данных актива")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof AssetData, value: string | number | boolean) => {
    if (assetData) {
      setAssetData({
        ...assetData,
        [field]: value
      })
    }
  }

  const handleHighlightChange = (index: number, value: string) => {
    if (assetData) {
      const newHighlights = [...assetData.highlights]
      newHighlights[index] = value
      setAssetData({
        ...assetData,
        highlights: newHighlights
      })
    }
  }

  const addHighlight = () => {
    if (assetData) {
      setAssetData({
        ...assetData,
        highlights: [...assetData.highlights, ""]
      })
    }
  }

  const removeHighlight = (index: number) => {
    if (assetData) {
      const newHighlights = assetData.highlights.filter((_, i) => i !== index)
      setAssetData({
        ...assetData,
        highlights: newHighlights
      })
    }
  }

  const calculatePricePerToken = () => {
    if (assetData && assetData.totalValue > 0 && assetData.tokenSupply > 0) {
      return assetData.totalValue / assetData.tokenSupply
    }
    return 0
  }

  const handleSave = async () => {
    if (!assetData) return

    setSaving(true)
    try {
      const response = await fetch(`/api/assets/${assetId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assetData),
      })

      if (response.ok) {
        toast.success("Актив успешно обновлен!")
        router.push(`/marketplace/asset/${assetId}`)
      } else {
        const error = await response.json()
        toast.error(`Ошибка обновления: ${error.error}`)
      }
    } catch (error) {
      console.error("Error updating asset:", error)
      toast.error("Ошибка при обновлении актива")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-white/10 rounded"></div>
        <div className="h-96 bg-white/10 rounded"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-20 bg-white/10 rounded"></div>
          <div className="h-20 bg-white/10 rounded"></div>
        </div>
      </div>
    )
  }

  if (!assetData) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Актив не найден</p>
      </div>
    )
  }

  const getAssetTypeLabel = (type: string) => {
    switch (type) {
      case "real_estate":
        return "Недвижимость"
      case "art":
        return "Искусство"
      case "music":
        return "Музыка"
      case "gaming":
        return "Игровые активы"
      default:
        return type
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.push(`/marketplace/asset/${assetId}`)}
          className="bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад к активу
        </Button>
        
        <div className="flex items-center space-x-2">
          <Badge className="bg-[#9945FF]/20 text-[#9945FF] border-[#9945FF]/30">
            {getAssetTypeLabel(assetData.assetType)}
          </Badge>
          <Badge variant="outline" className="bg-white/5 border-white/20 text-white">
            ID: {assetData.id}
          </Badge>
        </div>
      </div>

      {/* Basic Information */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-[#9945FF]" />
            Основная информация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-white">
                  Название актива *
                </Label>
                <Input
                  id="title"
                  value={assetData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                  placeholder="Введите название актива"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="text-white">
                  Местоположение
                </Label>
                <Input
                  id="location"
                  value={assetData.location}
                  onChange={(e) => handleInputChange("location", e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                  placeholder="Местоположение актива"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Описание *
              </Label>
              <Textarea
                id="description"
                value={assetData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows={6}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                placeholder="Подробное описание актива"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <DollarSign className="w-5 h-5 text-[#14F195]" />
            Финансовая информация
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label htmlFor="totalValue" className="text-white">
                Общая стоимость (USD) *
              </Label>
              <Input
                id="totalValue"
                type="number"
                value={assetData.totalValue}
                onChange={(e) => handleInputChange("totalValue", Number(e.target.value))}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenSupply" className="text-white">
                Количество токенов *
              </Label>
              <Input
                id="tokenSupply"
                type="number"
                value={assetData.tokenSupply}
                onChange={(e) => handleInputChange("tokenSupply", Number(e.target.value))}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedYield" className="text-white">
                Ожидаемая доходность (%)
              </Label>
              <Input
                id="expectedYield"
                type="number"
                step="0.1"
                value={assetData.expectedYield}
                onChange={(e) => handleInputChange("expectedYield", Number(e.target.value))}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minimumInvestment" className="text-white">
                Минимальная инвестиция (USD)
              </Label>
              <Input
                id="minimumInvestment"
                type="number"
                value={assetData.minimumInvestment}
                onChange={(e) => handleInputChange("minimumInvestment", Number(e.target.value))}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Calculated Fields */}
          <div className="mt-6 p-4 bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-lg border border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">${calculatePricePerToken().toFixed(4)}</div>
                <div className="text-sm text-gray-400">Цена за токен</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {assetData.minimumInvestment && calculatePricePerToken() > 0
                    ? Math.floor(assetData.minimumInvestment / calculatePricePerToken()).toLocaleString()
                    : "0"}
                </div>
                <div className="text-sm text-gray-400">Токенов за минимальную инвестицию</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Highlights */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Ключевые особенности</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {assetData.highlights.map((highlight, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={highlight}
                onChange={(e) => handleHighlightChange(index, e.target.value)}
                className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                placeholder="Введите особенность"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={() => removeHighlight(index)}
                className="bg-red-500/20 border-red-500/30 text-red-400 hover:bg-red-500/30"
              >
                ×
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            onClick={addHighlight}
            className="bg-white/5 border-white/20 text-white hover:bg-white/10"
          >
            + Добавить особенность
          </Button>
        </CardContent>
      </Card>

      {/* Settings */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Настройки</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="kycRequired"
              checked={assetData.kycRequired}
              onChange={(e) => handleInputChange("kycRequired", e.target.checked)}
              className="w-4 h-4 text-[#9945FF] bg-white/5 border-white/20 rounded focus:ring-[#9945FF]"
            />
            <Label htmlFor="kycRequired" className="text-white">
              Требуется KYC верификация
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3FE8] hover:to-[#12D488] text-white px-8 py-3 text-lg font-semibold border-0 disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Сохранение...
            </>
          ) : (
            <>
              <Save className="w-5 h-5 mr-2" />
              Сохранить изменения
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
