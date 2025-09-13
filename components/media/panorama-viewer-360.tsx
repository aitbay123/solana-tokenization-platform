"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RotateCcw, ZoomIn, ZoomOut, Maximize, Move3D, Pause, Play, Volume2, VolumeX, Share2, Copy } from "lucide-react"

interface PanoramaViewer360Props {
  src: string
  title?: string
  className?: string
}

export function PanoramaViewer360({ src, title, className }: PanoramaViewer360Props) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [panoramaPosition, setPanoramaPosition] = useState(0) // в пикселях
  const [isDragging, setIsDragging] = useState(false)
  const [lastMouseX, setLastMouseX] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(false)
  const [showControls, setShowControls] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isMuted, setIsMuted] = useState(true)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const autoRotateRef = useRef<NodeJS.Timeout | null>(null)
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Состояния для размеров
  const [panoramaWidth, setPanoramaWidth] = useState(0)
  const [containerWidth, setContainerWidth] = useState(0)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Вычисляем максимальную позицию на основе реальных размеров
  const MAX_POSITION = Math.max(0, panoramaWidth - containerWidth)

  // Функция для обновления размеров контейнера
  const updateContainerSize = useCallback(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setContainerWidth(rect.width)
    }
  }, [])

  // Функция для обработки загрузки изображения
  const handleImageLoad = useCallback(() => {
    if (imageRef.current && containerRef.current) {
      const img = imageRef.current
      const container = containerRef.current
      
      // Получаем реальные размеры изображения
      const naturalWidth = img.naturalWidth
      const naturalHeight = img.naturalHeight
      const containerRect = container.getBoundingClientRect()
      
      // Для панорамных изображений обычно соотношение 2:1 или больше
      if (naturalWidth / naturalHeight >= 2) {
        // Это панорамное изображение - используем его реальную ширину
        setPanoramaWidth(naturalWidth)
      } else {
        // Для обычных изображений создаем панорамный эффект
        // Увеличиваем ширину в 2-3 раза для создания эффекта панорамы
        const aspectRatio = naturalWidth / naturalHeight
        const containerAspectRatio = containerRect.width / containerRect.height
        
        if (aspectRatio < containerAspectRatio) {
          // Изображение уже помещается в контейнер, создаем панорамный эффект
          setPanoramaWidth(naturalWidth * 2.5)
        } else {
          // Изображение нужно обрезать, создаем панорамный эффект
          setPanoramaWidth(naturalWidth * 1.8)
        }
      }
      
      setImageLoaded(true)
      showControlsTemporarily()
    }
  }, [])

  // Обновляем размеры при изменении размера окна
  useEffect(() => {
    const handleResize = () => {
      updateContainerSize()
    }

    window.addEventListener('resize', handleResize)
    updateContainerSize() // Инициализация

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [updateContainerSize])

  // Автоматическое вращение
  const startAutoRotate = useCallback(() => {
    if (autoRotateRef.current) return
    
    autoRotateRef.current = setInterval(() => {
      setPanoramaPosition(prev => {
        const newPos = prev + 1
        return newPos >= MAX_POSITION ? 0 : newPos
      })
    }, 50)
  }, [MAX_POSITION])

  const stopAutoRotate = useCallback(() => {
    if (autoRotateRef.current) {
      clearInterval(autoRotateRef.current)
      autoRotateRef.current = null
    }
  }, [])

  // Обработчики мыши
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)
    setLastMouseX(e.clientX)
    stopAutoRotate()
    setIsAutoRotating(false)
    showControlsTemporarily()
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    
    const deltaX = e.clientX - lastMouseX
    const sensitivity = 2 // чувствительность перетаскивания
    
    setPanoramaPosition(prev => {
      const newPos = prev - (deltaX * sensitivity)
      return Math.max(0, Math.min(MAX_POSITION, newPos))
    })
    
    setLastMouseX(e.clientX)
    showControlsTemporarily()
  }

  const handleMouseUp = () => {
    setIsDragging(false)
    hideControlsAfterDelay()
  }

  // Обработчики клавиатуры
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement) && !isFullscreen) return
      
      const moveDistance = 50
      
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          setPanoramaPosition(prev => Math.max(0, prev - moveDistance))
          showControlsTemporarily()
          break
        case 'ArrowRight':
          e.preventDefault()
          setPanoramaPosition(prev => Math.min(MAX_POSITION, prev + moveDistance))
          showControlsTemporarily()
          break
        case ' ':
          e.preventDefault()
          toggleAutoRotate()
          showControlsTemporarily()
          break
        case 'Escape':
          if (isFullscreen) {
            exitFullscreen()
          }
          break
      }
    }

    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [isFullscreen, MAX_POSITION])

  // Показать/скрыть элементы управления
  const showControlsTemporarily = () => {
    setShowControls(true)
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (!isFullscreen) setShowControls(false)
    }, 3000)
  }

  const hideControlsAfterDelay = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current)
    }
    if (!isFullscreen) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false)
      }, 2000)
    }
  }

  // Полноэкранный режим
  const enterFullscreen = async () => {
    try {
      await containerRef.current?.requestFullscreen()
      setIsFullscreen(true)
      setShowControls(true)
    } catch (error) {
      console.error('Failed to enter fullscreen:', error)
    }
  }

  const exitFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen()
      }
      setIsFullscreen(false)
      hideControlsAfterDelay()
    } catch (error) {
      console.error('Failed to exit fullscreen:', error)
    }
  }

  // Обработчик изменения полноэкранного режима
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
      if (!document.fullscreenElement) {
        hideControlsAfterDelay()
      }
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  // Автоматическое вращение
  const toggleAutoRotate = () => {
    if (isAutoRotating) {
      stopAutoRotate()
      setIsAutoRotating(false)
    } else {
      startAutoRotate()
      setIsAutoRotating(true)
    }
  }

  // Сброс позиции
  const resetView = () => {
    setPanoramaPosition(0)
    stopAutoRotate()
    setIsAutoRotating(false)
    setZoomLevel(1)
    showControlsTemporarily()
  }

  // Зум
  const zoomIn = () => {
    setZoomLevel(prev => Math.min(3, prev + 0.5))
    showControlsTemporarily()
  }

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(0.5, prev - 0.5))
    showControlsTemporarily()
  }

  // Поделиться
  const sharePanorama = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title || '360° Панорама',
          text: 'Посмотрите на эту удивительную 360° панораму!',
          url: window.location.href
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback для браузеров без поддержки Web Share API
      try {
        await navigator.clipboard.writeText(window.location.href)
        // Здесь можно добавить уведомление об успешном копировании
      } catch (error) {
        console.error('Error copying to clipboard:', error)
      }
    }
  }

  // Копировать ссылку
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      // Здесь можно добавить уведомление об успешном копировании
    } catch (error) {
      console.error('Error copying link:', error)
    }
  }

  // Сброс позиции при смене изображения
  useEffect(() => {
    setPanoramaPosition(0)
    setImageLoaded(false)
    setPanoramaWidth(0)
    stopAutoRotate()
    setIsAutoRotating(false)
  }, [src, stopAutoRotate])

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      stopAutoRotate()
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current)
      }
    }
  }, [stopAutoRotate])

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
            <p className="text-sm text-gray-400">Перетащите для просмотра • Пробел для авто-вращения</p>
          </div>
        )}

        <div
          ref={containerRef}
          className={`relative overflow-hidden bg-black/20 select-none ${
            isFullscreen ? 'h-screen' : 'h-96'
          } ${isFullscreen ? 'cursor-none' : 'cursor-grab'} ${isDragging ? 'cursor-grabbing' : ''}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            userSelect: 'none',
            WebkitUserSelect: 'none'
          }}
        >
          {/* Панорамное изображение */}
          <div
            className="absolute inset-0 transition-transform duration-300 ease-out"
            style={{
              transform: `translateX(-${panoramaPosition}px) scale(${zoomLevel})`,
              transformOrigin: 'center center'
            }}
          >
            <img
              ref={imageRef}
              src={src || "/placeholder.svg"}
              alt={title || "360° Панорама"}
              className="h-full object-cover"
              style={{
                width: panoramaWidth > 0 ? `${panoramaWidth}px` : '100%',
                height: '100%',
                minWidth: '100%',
                objectFit: 'cover'
              }}
              draggable={false}
              onLoad={handleImageLoad}
            />
          </div>

          {/* Индикатор загрузки */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="text-white text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                <p className="text-sm">Загрузка панорамы...</p>
              </div>
            </div>
          )}

          {/* Градиентные наложения */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/30 pointer-events-none" />
          
          {isFullscreen && (
            <>
              <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-black/50 to-transparent pointer-events-none" />
            </>
          )}

          {/* Элементы управления */}
          <div
            className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-opacity duration-300 ${
              showControls || isFullscreen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={resetView}
                className="text-white hover:bg-white/20 border-0"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={toggleAutoRotate}
                className={`text-white hover:bg-white/20 border-0 ${isAutoRotating ? 'bg-blue-500/20' : ''}`}
              >
                {isAutoRotating ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={zoomOut}
                className="text-white hover:bg-white/20 border-0"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>
              
              <Button
                size="sm"
                variant="ghost"
                onClick={zoomIn}
                className="text-white hover:bg-white/20 border-0"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>
              
              <div className="w-px h-6 bg-white/30 mx-1" />
              
              <Button
                size="sm"
                variant="ghost"
                onClick={sharePanorama}
                className="text-white hover:bg-white/20 border-0"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Индикатор загрузки/прогресса */}
          <div className="absolute top-4 left-4">
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
              {imageLoaded && MAX_POSITION > 0 
                ? `${Math.round((panoramaPosition / MAX_POSITION) * 100)}%`
                : imageLoaded 
                  ? '100%' 
                  : 'Загрузка...'
              }
            </div>
          </div>

          {/* Кнопка полноэкранного режима */}
          <Button
            size="sm"
            variant="ghost"
            onClick={isFullscreen ? exitFullscreen : enterFullscreen}
            className={`absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white border-0 backdrop-blur-sm transition-opacity duration-300 ${
              showControls || isFullscreen ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <Maximize className="w-4 h-4" />
          </Button>

          {/* Инструкции */}
          {!isFullscreen && (
            <div className="absolute bottom-4 right-4 text-xs text-white/70 bg-black/30 px-2 py-1 rounded">
              Перетащите для просмотра
            </div>
          )}

          {/* Индикатор направления движения */}
          {isDragging && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="bg-black/50 backdrop-blur-sm rounded-full p-2 text-white text-sm">
                <Move3D className="w-6 h-6 animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
