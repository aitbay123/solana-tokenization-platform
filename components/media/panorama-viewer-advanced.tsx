"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut, Maximize, Move3D } from "lucide-react"

interface PanoramaViewerAdvancedProps {
  src: string
  title?: string
  className?: string
}

export function PanoramaViewerAdvanced({ src, title, className }: PanoramaViewerAdvancedProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [fov, setFov] = useState(75)
  const [rotation, setRotation] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [lastMousePos, setLastMousePos] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  // Load and draw panorama on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    const image = imageRef.current
    if (!canvas || !image) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const drawPanorama = () => {
      const { width, height } = canvas
      ctx.clearRect(0, 0, width, height)

      // Calculate the visible portion based on rotation and FOV
      const imageWidth = image.naturalWidth
      const imageHeight = image.naturalHeight
      
      // Convert rotation to image coordinates
      const yaw = (rotation.y % 360) * (imageWidth / 360)
      const pitch = Math.max(-90, Math.min(90, rotation.x))
      
      // Calculate source rectangle for cylindrical projection
      const sourceWidth = (fov / 360) * imageWidth
      const sourceX = (yaw - sourceWidth / 2 + imageWidth) % imageWidth
      
      // Draw the panorama with proper cylindrical projection
      ctx.drawImage(
        image,
        sourceX, 0, sourceWidth, imageHeight,
        0, 0, width, height
      )
    }

    if (image.complete) {
      drawPanorama()
    } else {
      image.onload = drawPanorama
    }
  }, [rotation, fov])

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true)
    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return

    const deltaX = e.clientX - lastMousePos.x
    const deltaY = e.clientY - lastMousePos.y

    setRotation((prev) => ({
      x: Math.max(-90, Math.min(90, prev.x + deltaY * 0.3)),
      y: prev.y + deltaX * 0.3,
    }))

    setLastMousePos({ x: e.clientX, y: e.clientY })
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const resetView = () => {
    setRotation({ x: 0, y: 0 })
    setFov(75)
  }

  const zoomIn = () => {
    setFov((prev) => Math.max(30, prev - 10))
  }

  const zoomOut = () => {
    setFov((prev) => Math.min(120, prev + 10))
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  // Resize canvas when container size changes
  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const resizeCanvas = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    return () => window.removeEventListener('resize', resizeCanvas)
  }, [isFullscreen])

  const zoomPercentage = Math.round(((120 - fov) / 90) * 100 + 100)

  return (
    <Card
      className={`bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20 backdrop-blur-sm ${className}`}
    >
      <CardContent className="p-0 relative">
        {title && (
          <div className="p-4 border-b border-white/10">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <Move3D className="w-5 h-5 mr-2 text-blue-400" />
              {title}
            </h3>
            <p className="text-sm text-gray-400">Drag to explore • Scroll to zoom</p>
          </div>
        )}

        <div
          ref={containerRef}
          className={`relative overflow-hidden ${isFullscreen ? "h-screen" : "h-96"} bg-black/20 cursor-grab ${isDragging ? "cursor-grabbing" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onWheel={(e) => {
            e.preventDefault()
            if (e.deltaY < 0) {
              zoomIn()
            } else {
              zoomOut()
            }
          }}
        >
          {/* Hidden image for loading */}
          <img
            ref={imageRef}
            src={src || "/placeholder.svg"}
            alt={title || "360° Panorama"}
            style={{ display: 'none' }}
            crossOrigin="anonymous"
          />

          {/* Canvas for panorama rendering */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover select-none"
            style={{
              imageRendering: 'high-quality',
            }}
          />

          {/* Overlay gradient for better control visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />

          {/* Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button
              size="icon"
              onClick={toggleFullscreen}
              className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
            >
              <Maximize className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={zoomIn}
              className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
            >
              <ZoomIn className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={zoomOut}
              className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
            >
              <ZoomOut className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              onClick={resetView}
              className="bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </div>

          {/* Zoom indicator */}
          <div className="absolute bottom-4 left-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
            {zoomPercentage}%
          </div>

          {/* Instructions */}
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-xs">
            Drag to rotate • Scroll to zoom
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
