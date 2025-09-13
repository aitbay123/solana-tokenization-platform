"use client"

import { PanoramaViewer360 } from "./panorama-viewer-360"

interface PanoramaViewerProps {
  src: string
  title?: string
  className?: string
}

export function PanoramaViewer({ src, title, className }: PanoramaViewerProps) {
  // Используем новый улучшенный компонент 360° панорамы
  return <PanoramaViewer360 src={src} title={title} className={className} />
}
