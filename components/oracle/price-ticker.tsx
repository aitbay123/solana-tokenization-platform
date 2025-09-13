"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown, RefreshCw } from "lucide-react"
import { useOraclePrice } from "@/hooks/use-oracle-price"
import { Button } from "@/components/ui/button"

export function PriceTicker() {
  const { prices, loading, error, lastUpdated, refresh } = useOraclePrice(["solana", "usd-coin", "bitcoin"])

  const formatPrice = (price: number, symbol: string) => {
    if (symbol === "usd-coin") return `$${price.toFixed(4)}`
    if (price > 1000) return `$${price.toLocaleString()}`
    return `$${price.toFixed(2)}`
  }

  const formatChange = (change: number) => {
    const isPositive = change >= 0
    return (
      <div className={`flex items-center gap-1 ${isPositive ? "text-emerald-600" : "text-red-600"}`}>
        {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
        <span className="text-xs font-medium">
          {isPositive ? "+" : ""}
          {change.toFixed(2)}%
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200 bg-red-50">
        <CardContent className="p-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-red-600">Ошибка загрузки цен</span>
            <Button size="sm" variant="outline" onClick={refresh}>
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-900 text-white border-slate-700">
      <CardContent className="p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {loading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span className="text-sm">Загрузка цен...</span>
              </div>
            ) : (
              <>
                {prices.map((price) => (
                  <div key={price.symbol} className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                      {price.symbol.toUpperCase()}
                    </Badge>
                    <span className="font-medium">{formatPrice(price.price, price.symbol)}</span>
                    {formatChange(price.change24h)}
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Обновлено: {new Date(lastUpdated).toLocaleTimeString()}</span>
            <Button size="sm" variant="ghost" onClick={refresh} className="h-6 w-6 p-0">
              <RefreshCw className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
