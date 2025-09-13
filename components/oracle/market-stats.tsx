"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, DollarSign, BarChart3, Activity } from "lucide-react"
import { useMarketData } from "@/hooks/use-market-data"

export function MarketStats() {
  const { marketData, loading, error } = useMarketData()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-6">
              <div className="h-4 bg-slate-200 rounded mb-2"></div>
              <div className="h-8 bg-slate-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  if (error || !marketData) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-6 text-center">
          <p className="text-red-600">Ошибка загрузки рыночных данных</p>
        </CardContent>
      </Card>
    )
  }

  const stats = [
    {
      title: "Общая капитализация",
      value: `$${(marketData.totalMarketCap / 1000000000).toFixed(2)}B`,
      icon: DollarSign,
      change: marketData.priceChange24h,
      description: "Суммарная стоимость всех активов",
    },
    {
      title: "Объем торгов 24ч",
      value: `$${(marketData.totalVolume24h / 1000000).toFixed(1)}M`,
      icon: BarChart3,
      change: 5.2,
      description: "Торговый объем за последние 24 часа",
    },
    {
      title: "Активные активы",
      value: marketData.activeAssets.toLocaleString(),
      icon: Activity,
      change: 12.3,
      description: "Количество токенизированных активов",
    },
    {
      title: "Изменение цены",
      value: `${marketData.priceChange24h > 0 ? "+" : ""}${marketData.priceChange24h.toFixed(2)}%`,
      icon: TrendingUp,
      change: marketData.priceChange24h,
      description: "Средний рост цен за 24 часа",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-slate-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <div className="flex items-center gap-1">
              <span className={`text-xs font-medium ${stat.change >= 0 ? "text-emerald-600" : "text-red-600"}`}>
                {stat.change >= 0 ? "+" : ""}
                {stat.change.toFixed(1)}%
              </span>
              <CardDescription className="text-xs">{stat.description}</CardDescription>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
