"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, MapPin, Share2, Heart, ExternalLink, Play, ImageIcon, Volume2, Edit } from "lucide-react"
import { useRouter } from "next/navigation"
import { MediaShowcase } from "@/components/media/media-showcase"
import { AudioPlayer } from "@/components/media/audio-player"
import { PanoramaViewer } from "@/components/media/panorama-viewer"
import { ImageGallery } from "@/components/media/image-gallery"

interface AssetDetailsProps {
  assetId: string
}

export function AssetDetails({ assetId }: AssetDetailsProps) {
  const [asset, setAsset] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchAsset = async () => {
      try {
        const response = await fetch(`/api/assets/${assetId}`)
        const data = await response.json()
        setAsset(data)
      } catch (error) {
        console.error("Error fetching asset:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAsset()
  }, [assetId])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-white/10 rounded"></div>
        <div className="h-96 bg-white/10 rounded"></div>
        <div className="grid grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-20 bg-white/10 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  if (!asset) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400">Asset not found</p>
      </div>
    )
  }

  const getAssetTypeIcon = (type: string) => {
    switch (type) {
      case "real_estate":
        return <Building className="w-4 h-4" />
      case "art":
        return <ImageIcon className="w-4 h-4" />
      case "music":
        return <Volume2 className="w-4 h-4" />
      default:
        return <Building className="w-4 h-4" />
    }
  }

  const getAssetTypeLabel = (type: string) => {
    switch (type) {
      case "real_estate":
        return "Real Estate"
      case "art":
        return "Digital Art"
      case "music":
        return "Music & Audio"
      case "gaming":
        return "Gaming Assets"
      default:
        return type
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <Badge className="bg-[#9945FF]/20 text-[#9945FF] border-[#9945FF]/30">
              {getAssetTypeIcon(asset.type)}
              <span className="ml-1">{getAssetTypeLabel(asset.type)}</span>
            </Badge>
            <Badge className="bg-[#14F195]/20 text-[#14F195] border-[#14F195]/30">Verified</Badge>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">{asset.title}</h1>
          <p className="text-gray-400 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {asset.location}
          </p>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            onClick={() => router.push(`/edit/asset/${assetId}`)}
            className="bg-[#9945FF]/20 border-[#9945FF]/30 text-[#9945FF] hover:bg-[#9945FF]/30"
          >
            <Edit className="w-4 h-4 mr-2" />
            Редактировать
          </Button>
          <Button variant="outline" size="icon" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
            <Heart className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon" className="bg-white/5 border-white/20 text-white hover:bg-white/10">
            <Share2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <MediaShowcase
        assetType={asset.type}
        images={asset.images}
        audio={asset.audio}
        panorama360={asset.panorama360}
        title={asset.title}
      />

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">${asset.pricePerToken}</div>
            <div className="text-sm text-gray-400">Price per Token</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-[#14F195]">{asset.expectedYield}%</div>
            <div className="text-sm text-gray-400">Expected Yield</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">{asset.investors}</div>
            <div className="text-sm text-gray-400">Investors</div>
          </CardContent>
        </Card>
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-white">
              {asset.totalSupply && asset.availableTokens 
                ? (((asset.totalSupply - asset.availableTokens) / asset.totalSupply) * 100).toFixed(1)
                : '0'
              }%
            </div>
            <div className="text-sm text-gray-400">Sold</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Information */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-white/5 border-white/10">
          <TabsTrigger value="overview" className="data-[state=active]:bg-[#9945FF] data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="financials" className="data-[state=active]:bg-[#9945FF] data-[state=active]:text-white">
            Financials
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-[#9945FF] data-[state=active]:text-white">
            Documents
          </TabsTrigger>
          <TabsTrigger value="media" className="data-[state=active]:bg-[#9945FF] data-[state=active]:text-white">
            Media
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Asset Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-6">{asset.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-white mb-3">Asset Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Category:</span>
                      <span className="text-white">{getAssetTypeLabel(asset.type)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Value:</span>
                      <span className="text-white">${asset.totalValue?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Token Supply:</span>
                      <span className="text-white">{asset.totalSupply?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Available:</span>
                      <span className="text-[#14F195] font-medium">{asset.availableTokens?.toLocaleString() || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-white mb-3">Investment Highlights</h4>
                  <div className="space-y-2">
                    {asset.highlights?.map((highlight: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-[#14F195] mr-2" />
                        <span className="text-sm text-gray-300">{highlight}</span>
                      </div>
                    )) || <div className="text-gray-400 text-sm">No highlights available</div>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financials" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Financial Performance</CardTitle>
              <CardDescription className="text-gray-400">Revenue and expense breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Monthly Revenue</span>
                    <span className="font-semibold text-white">${asset.monthlyRevenue?.toLocaleString() || "N/A"}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                    <span className="text-gray-400">Operating Expenses</span>
                    <span className="font-semibold text-white">
                      ${asset.operatingExpenses?.toLocaleString() || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 rounded-lg border border-white/10">
                    <span className="text-white font-medium">Net Income</span>
                    <span className="font-bold text-[#14F195]">${asset.netIncome?.toLocaleString() || "N/A"}</span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="text-center p-6 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-2">{asset.expectedYield}%</div>
                    <div className="text-sm text-gray-400">Expected Annual Yield</div>
                  </div>
                  <div className="text-center p-6 bg-white/5 rounded-lg">
                    <div className="text-3xl font-bold text-white mb-2">${asset.pricePerToken}</div>
                    <div className="text-sm text-gray-400">Current Token Price</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Legal Documents</CardTitle>
              <CardDescription className="text-gray-400">All documents have been verified</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {asset.documents?.map((doc: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-white/10 rounded-lg">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-[#14F195] mr-3" />
                      <span className="text-white">{doc.name}</span>
                      {doc.verified && (
                        <Badge className="ml-2 bg-[#14F195]/20 text-[#14F195] border-[#14F195]/30">Verified</Badge>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                )) || <div className="text-gray-400 text-center py-8">No documents available</div>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          {asset.type === "real_estate" && asset.panorama360 && (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Play className="w-5 h-5 text-[#14F195]" />
                  360° Virtual Tour
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PanoramaViewer src={asset.panorama360} title="360° Virtual Tour" />
              </CardContent>
            </Card>
          )}

          {asset.type === "music" && asset.audio && (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Volume2 className="w-5 h-5 text-[#9945FF]" />
                  Audio Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AudioPlayer src={asset.audio} title={asset.title} artist={asset.artist || "Unknown Artist"} />
              </CardContent>
            </Card>
          )}

          {asset.images && asset.images.length > 0 && (
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <ImageIcon className="w-5 h-5 text-[#14F195]" />
                  Image Gallery
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ImageGallery images={asset.images} title={asset.title} />
              </CardContent>
            </Card>
          )}

          {(!asset.images || asset.images.length === 0) && !asset.audio && !asset.panorama360 && (
            <Card className="bg-white/5 border-white/10">
              <CardContent className="text-center py-12">
                <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <p className="text-gray-400">No media files available for this asset</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
