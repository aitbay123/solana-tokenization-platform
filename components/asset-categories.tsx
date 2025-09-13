"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Building, Palette, Music, Gamepad2, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"

const categories = [
  {
    id: "real-estate",
    icon: Building,
    title: "Недвижимость",
    description: "Фракционная собственность на коммерческую и жилую недвижимость",
    features: ["REIT токены", "Автоматические выплаты", "Глобальная торговля"],
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    id: "art",
    icon: Palette,
    title: "Искусство",
    description: "Токенизация произведений искусства и коллекционных предметов",
    features: ["Фракционное владение", "Провенанс", "Цифровые галереи"],
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    id: "music",
    icon: Music,
    title: "Музыка",
    description: "Инвестиции в музыкальные треки и карьеру артистов",
    features: ["Роялти токены", "Фан-инвестирование", "Лицензирование"],
    color: "bg-pink-500/10 text-pink-600",
  },
  {
    id: "gaming",
    icon: Gamepad2,
    title: "Игровые активы",
    description: "NFT предметы и виртуальная недвижимость в играх",
    features: ["Межигровая торговля", "Метавселенные", "Achievement токены"],
    color: "bg-orange-500/10 text-orange-600",
  },
]

export function AssetCategories() {
  const router = useRouter()

  const handleExplore = (categoryId: string) => {
    router.push(`/tokenize/${categoryId}`)
  }

  return (
    <section id="assets" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
            Категории активов для токенизации
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Выберите тип актива для создания токенов и начала инвестирования
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg ${category.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">{category.title}</CardTitle>
                  <CardDescription className="text-muted-foreground">{category.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <ul className="space-y-2 mb-6">
                    {category.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="text-sm text-muted-foreground flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors bg-transparent"
                    onClick={() => handleExplore(category.id)}
                  >
                    Токенизировать
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center">
          <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={() => router.push("/tokenize")}>
            Начать токенизацию
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  )
}
