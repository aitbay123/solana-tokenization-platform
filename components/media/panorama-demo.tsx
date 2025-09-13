"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PanoramaViewer360 } from "./panorama-viewer-360"
import { Building, Camera, Eye } from "lucide-react"

// Примеры панорамных изображений
const demoPanoramas = [
  {
    id: "apartment",
    title: "Современная квартира",
    src: "/360-degree-apartment-tour.jpg",
    description: "360° тур по современной квартире в центре города"
  },
  {
    id: "villa",
    title: "Вилла с видом на океан",
    src: "/360-villa-tour-ocean-view.jpg", 
    description: "Роскошная вилла с панорамным видом на океан"
  },
  {
    id: "office",
    title: "Офисное здание",
    src: "/modern-office-building-moscow.jpg",
    description: "Современное офисное здание в Москве"
  }
]

export function PanoramaDemo() {
  const [selectedPanorama, setSelectedPanorama] = useState(demoPanoramas[0])

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">360° Панорамный Просмотрщик</h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Интерактивный просмотрщик 360° панорам с поддержкой перетаскивания, 
          автоматического вращения и полноэкранного режима
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Выбор панорамы */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Camera className="w-5 h-5 mr-2 text-blue-400" />
              Выберите панораму
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoPanoramas.map((panorama) => (
              <Button
                key={panorama.id}
                variant={selectedPanorama.id === panorama.id ? "default" : "outline"}
                className={`w-full justify-start text-left h-auto p-4 ${
                  selectedPanorama.id === panorama.id
                    ? "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white"
                    : "bg-white/5 border-white/20 text-white hover:bg-white/10"
                }`}
                onClick={() => setSelectedPanorama(panorama)}
              >
                <div>
                  <div className="font-semibold">{panorama.title}</div>
                  <div className="text-sm opacity-80 mt-1">{panorama.description}</div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Панорамный просмотрщик */}
        <div className="lg:col-span-2">
          <PanoramaViewer360
            src={selectedPanorama.src}
            title={selectedPanorama.title}
            className="w-full"
          />
        </div>
      </div>

      {/* Инструкции */}
      <Card className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Eye className="w-5 h-5 mr-2 text-blue-400" />
            Как использовать
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl mb-2">🖱️</div>
              <h4 className="font-semibold text-white mb-1">Перетаскивание</h4>
              <p className="text-sm text-gray-400">Перетащите мышью для навигации по панораме</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl mb-2">⌨️</div>
              <h4 className="font-semibold text-white mb-1">Клавиатура</h4>
              <p className="text-sm text-gray-400">Стрелки для перемещения, пробел для авто-вращения</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl mb-2">🔍</div>
              <h4 className="font-semibold text-white mb-1">Зум</h4>
              <p className="text-sm text-gray-400">Кнопки + и - для масштабирования</p>
            </div>
            
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl mb-2">📱</div>
              <h4 className="font-semibold text-white mb-1">Полный экран</h4>
              <p className="text-sm text-gray-400">Кнопка полноэкранного режима для погружения</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Технические особенности */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Технические особенности</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-white mb-3">Основные функции</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Плавное горизонтальное перемещение
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Автоматическое вращение
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Масштабирование от 0.5x до 3x
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Полноэкранный режим
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  Адаптивные элементы управления
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-3">Управление</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Drag & Drop навигация
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Клавиатурные сочетания
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Сенсорное управление
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Web Share API
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                  Индикаторы прогресса
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
