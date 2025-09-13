"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ImageGallery } from "./image-gallery"
import { AudioPlayer } from "./audio-player"
import { PanoramaViewer } from "./panorama-viewer"
import { ImageIcon, Music, Camera } from "lucide-react"

interface MediaShowcaseProps {
  assetType: "real_estate" | "art" | "music" | "gaming"
  images?: string[]
  audio?: string
  panorama360?: string
  title?: string
  artist?: string
  className?: string
}

export function MediaShowcase({
  assetType,
  images = [],
  audio,
  panorama360,
  title,
  artist,
  className,
}: MediaShowcaseProps) {
  const hasImages = images.length > 0
  const hasAudio = !!audio
  const hasPanorama = !!panorama360

  // Determine available tabs based on asset type and available media
  const availableTabs = []

  if (hasImages) {
    availableTabs.push({
      id: "gallery",
      label: "Gallery",
      icon: ImageIcon,
      count: images.length,
    })
  }

  if (hasAudio && (assetType === "music" || assetType === "gaming")) {
    availableTabs.push({
      id: "audio",
      label: "Audio",
      icon: Music,
      count: 1,
    })
  }

  if (hasPanorama && assetType === "real_estate") {
    availableTabs.push({
      id: "panorama",
      label: "360° View",
      icon: Camera,
      count: 1,
    })
  }

  // If no media available, show placeholder
  if (availableTabs.length === 0) {
    return (
      <Card className={`bg-white/5 border-white/10 ${className}`}>
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">No Media Available</h3>
          <p className="text-gray-400">Media files will be displayed here once uploaded</p>
        </CardContent>
      </Card>
    )
  }

  // If only one tab, don't show tabs
  if (availableTabs.length === 1) {
    const singleTab = availableTabs[0]

    return (
      <div className={className}>
        {singleTab.id === "gallery" && <ImageGallery images={images} title={title} />}
        {singleTab.id === "audio" && <AudioPlayer src={audio!} title={title} artist={artist} />}
        {singleTab.id === "panorama" && <PanoramaViewer src={panorama360!} title={title} />}
      </div>
    )
  }

  return (
    <Card className={`bg-white/5 border-white/10 backdrop-blur-sm ${className}`}>
      <CardHeader>
        <CardTitle className="text-white">Media Gallery</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue={availableTabs[0].id} className="w-full">
          <TabsList
            className="grid w-full bg-white/5 border border-white/10"
            style={{ gridTemplateColumns: `repeat(${availableTabs.length}, 1fr)` }}
          >
            {availableTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#9945FF] data-[state=active]:to-[#14F195] data-[state=active]:text-white text-gray-400"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {tab.label}
                  {tab.count > 1 && (
                    <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">{tab.count}</span>
                  )}
                </TabsTrigger>
              )
            })}
          </TabsList>

          <div className="mt-6">
            {availableTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                {tab.id === "gallery" && <ImageGallery images={images} />}
                {tab.id === "audio" && <AudioPlayer src={audio!} title={title} artist={artist} />}
                {tab.id === "panorama" && <PanoramaViewer src={panorama360!} title={title} />}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
