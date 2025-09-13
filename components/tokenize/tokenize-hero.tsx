import { Shield, Zap, TrendingUp } from "lucide-react"

export function TokenizeHero() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
            <Zap className="w-4 h-4 mr-2" />
            Токенизация на Solana
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Превратите ваши активы в <span className="text-primary">цифровые токены</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-pretty max-w-3xl mx-auto">
            Создайте токены для недвижимости, искусства, музыки или игровых активов. Получите доступ к глобальной
            ликвидности и новым инвестиционным возможностям.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Безопасность</h3>
              <p className="text-sm text-muted-foreground">Защищено смарт-контрактами Solana</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Ликвидность</h3>
              <p className="text-sm text-muted-foreground">Торгуйте токенами 24/7</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Низкие комиссии</h3>
              <p className="text-sm text-muted-foreground">Минимальные затраты на Solana</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
