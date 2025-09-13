import { Card, CardContent } from "@/components/ui/card"

const stats = [
  {
    value: "$2.5B+",
    label: "Общая стоимость активов",
    description: "Токенизированных на платформе",
  },
  {
    value: "50K+",
    label: "Активных инвесторов",
    description: "По всему миру",
  },
  {
    value: "1,200+",
    label: "Токенизированных активов",
    description: "Различных категорий",
  },
  {
    value: "99.9%",
    label: "Время работы",
    description: "Надежность платформы",
  },
]

export function Stats() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">Доверие цифрами</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
            Наша платформа уже помогла тысячам инвесторов получить доступ к новым возможностям
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center border-border/50">
              <CardContent className="pt-8 pb-8">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
                <div className="text-sm text-muted-foreground">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
