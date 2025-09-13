"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Upload, X, ImageIcon, Music, Camera } from "lucide-react"
import type { WizardData } from "../tokenization-wizard"

interface BasicInfoStepProps {
  data: WizardData
  updateData: (data: Partial<WizardData>) => void
}

export function BasicInfoStep({ data, updateData }: BasicInfoStepProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: keyof WizardData["basicInfo"], value: string) => {
    updateData({
      basicInfo: {
        ...data.basicInfo,
        [field]: value,
      },
    })
  }

  const handleFileUpload = (files: FileList | null, type: "images" | "audio" | "panorama360") => {
    if (!files) return

    const fileArray = Array.from(files)

    if (type === "images") {
      updateData({
        basicInfo: {
          ...data.basicInfo,
          images: [...data.basicInfo.images, ...fileArray],
        },
      })
    } else if (type === "audio" && fileArray[0]) {
      updateData({
        basicInfo: {
          ...data.basicInfo,
          audio: fileArray[0],
        },
      })
    } else if (type === "panorama360" && fileArray[0]) {
      updateData({
        basicInfo: {
          ...data.basicInfo,
          panorama360: fileArray[0],
        },
      })
    }
  }

  const removeImage = (index: number) => {
    const newImages = data.basicInfo.images.filter((_, i) => i !== index)
    updateData({
      basicInfo: {
        ...data.basicInfo,
        images: newImages,
      },
    })
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files, "images")
    }
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white mb-2">Asset Information</h3>
        <p className="text-gray-400">Provide details about your asset</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Basic Information */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">
                Asset Title *
              </Label>
              <Input
                id="title"
                value={data.basicInfo.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Enter asset title"
                className="bg-white/5 border-white/10 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">
                Description *
              </Label>
              <Textarea
                id="description"
                value={data.basicInfo.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your asset in detail"
                rows={4}
                className="bg-white/5 border-white/10 text-white placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-white">
                Location
              </Label>
              <Input
                id="location"
                value={data.basicInfo.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
                placeholder="Asset location or origin"
                className="bg-white/5 border-white/10 text-white placeholder-gray-400"
              />
            </div>
          </CardContent>
        </Card>

        {/* Media Upload */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Media Files</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Image Upload */}
            <div className="space-y-4">
              <Label className="text-white">Images *</Label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                  dragActive ? "border-[#9945FF] bg-[#9945FF]/10" : "border-white/20 hover:border-white/40"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 mb-4">Drag & drop images here, or click to select</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleFileUpload(e.target.files, "images")}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Select Images
                </Button>
              </div>

              {/* Image Preview */}
              {data.basicInfo.images.length > 0 && (
                <div className="grid grid-cols-2 gap-4">
                  {data.basicInfo.images.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file) || "/placeholder.svg"}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Audio Upload (for music assets) */}
            {data.assetType === "music" && (
              <div className="space-y-4">
                <Label className="text-white">Audio File</Label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                  <Music className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Upload your audio file</p>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileUpload(e.target.files, "audio")}
                    className="hidden"
                    id="audio-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("audio-upload")?.click()}
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Audio
                  </Button>
                </div>
                {data.basicInfo.audio && (
                  <p className="text-[#14F195] text-sm">✓ Audio file uploaded: {data.basicInfo.audio.name}</p>
                )}
              </div>
            )}

            {/* 360° Upload (for real estate) */}
            {data.assetType === "real_estate" && (
              <div className="space-y-4">
                <Label className="text-white">360° Panorama</Label>
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center hover:border-white/40 transition-colors">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 mb-4">Upload 360° panorama image</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e.target.files, "panorama360")}
                    className="hidden"
                    id="panorama-upload"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("panorama-upload")?.click()}
                    className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Select Panorama
                  </Button>
                </div>
                {data.basicInfo.panorama360 && (
                  <p className="text-[#14F195] text-sm">✓ Panorama uploaded: {data.basicInfo.panorama360.name}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
