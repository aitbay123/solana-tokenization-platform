"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Palette, Music, Gamepad2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const assetTypes = [
  {
    id: "real-estate",
    icon: Building,
    title: "Недвижимость",
    description: "Токенизируйте коммерческую и жилую недвижимость",
    features: ["Фракционная собственность", "Автоматические выплаты", "Глобальная торговля"],
    color: "bg-blue-500/10 text-blue-600 border-blue-200",
  },
  {
    id: "art",
    icon: Palette,
    title: "Искусство",
    description: "Создайте токены для произведений искусства",
    features: ["Цифровой провенанс", "Фракционное владение", "Аутентификация"],
    color: "bg-purple-500/10 text-purple-600 border-purple-200",
  },
  {
    id: "music",
    icon: Music,
    title: "Музыка",
    description: "Токенизируйте музыкальные треки и альбомы",
    features: ["Роялти токены", "Фан-инвестирование", "Лицензирование"],
    color: "bg-pink-500/10 text-pink-600 border-pink-200",
  },
  {
    id: "gaming",
    icon: Gamepad2,
    title: "Игровые активы",
    description: "Создайте NFT для игровых предметов",
    features: ["Межигровая торговля", "Виртуальная недвижимость", "Achievement токены"],
    color: "bg-orange-500/10 text-orange-600 border-orange-200",
  },
]

export function AssetTypeSelector() {
  const router = useRouter()

  const handleSelectAssetType = (assetId: string) => {
    router.push(`/tokenize/${assetId}`)
  }

  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Выберите тип актива для токенизации
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Каждый тип актива имеет специализированную форму для сбора необходимой информации
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {assetTypes.map((assetType) => {
            const Icon = assetType.icon
            return (
              <Card
                key={assetType.id}
                className={`group hover:shadow-lg transition-all duration-300 cursor-pointer ${assetType.color}`}
                onClick={() => handleSelectAssetType(assetType.id)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg bg-current/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold text-foreground">{assetType.title}</CardTitle>
                      <CardDescription className="text-muted-foreground">{assetType.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {assetType.features.map((feature, index) => (
                      <li key={index} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-current mr-3 opacity-60" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Начать токенизацию
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
