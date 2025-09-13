import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, TrendingUp, Users, Zap, Globe, BarChart3, Lock, Coins } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "KYC/AML Соответствие",
    description: "Полное соответствие регулятивным требованиям с автоматической проверкой пользователей",
  },
  {
    icon: TrendingUp,
    title: "Oracle Интеграция",
    description: "Реальная оценка стоимости активов через надежные источники данных",
  },
  {
    icon: Users,
    title: "Governance Механизмы",
    description: "Децентрализованное принятие решений по управлению активами",
  },
  {
    icon: Zap,
    title: "Быстрые Транзакции",
    description: "Мгновенные переводы и торговля благодаря технологии Solana",
  },
  {
    icon: Globe,
    title: "Глобальный Доступ",
    description: "Инвестируйте в активы по всему миру без географических ограничений",
  },
  {
    icon: BarChart3,
    title: "Аналитика и Отчеты",
    description: "Подробная аналитика портфеля и доходности инвестиций",
  },
  {
    icon: Lock,
    title: "Страхование Активов",
    description: "Защита инвестиций через интегрированные страховые продукты",
  },
  {
    icon: Coins,
    title: "Автоматические Выплаты",
    description: "Смарт-контракты для автоматического распределения доходов",
  },
]

export function Features() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Возможности платформы</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Полный набор инструментов для токенизации, торговли и управления активами
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <Card
                key={index}
                className="group hover:shadow-md transition-all duration-300 border-border/50 hover:border-primary/20"
              >
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
