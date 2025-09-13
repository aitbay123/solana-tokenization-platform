"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Calculator, Wallet, TrendingUp, Clock, Shield } from "lucide-react"
import { useProgram } from "@/hooks/use-program"
import { toast } from "sonner"

interface AssetInvestmentProps {
  assetId: string
}

// Mock data
const mockAsset = {
  price: 125.5,
  availableTokens: 5420,
  minInvestment: 1,
  maxInvestment: 1000,
  yield: 8.5,
}

export function AssetInvestment({ assetId }: AssetInvestmentProps) {
  const [tokenAmount, setTokenAmount] = useState([10])
  const [isInvesting, setIsInvesting] = useState(false)
  const { connected, publicKey, program } = useProgram()

  const investmentAmount = tokenAmount[0] * mockAsset.price
  const expectedYearlyReturn = (investmentAmount * mockAsset.yield) / 100
  const expectedMonthlyReturn = expectedYearlyReturn / 12

  const handleInvest = async () => {
    if (!connected) {
      toast.error("Подключите кошелек для инвестирования")
      return
    }

    if (!program) {
      toast.error("Программа не загружена. Попробуйте переподключить кошелек")
      return
    }

    setIsInvesting(true)
    try {
      // In real implementation, would call smart contract
      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate transaction
      toast.success(`Успешно инвестировано ${tokenAmount[0]} токенов!`)
    } catch (error) {
      toast.error("Ошибка при инвестировании")
    } finally {
      setIsInvesting(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Investment Calculator */}
      <Card className="sticky top-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2" />
            Калькулятор инвестиций
          </CardTitle>
          <CardDescription>Рассчитайте потенциальную доходность</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Token Amount Selector */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label htmlFor="tokens">Количество токенов</Label>
              <Badge variant="outline">{mockAsset.availableTokens} доступно</Badge>
            </div>

            <div className="space-y-3">
              <Slider
                value={tokenAmount}
                onValueChange={setTokenAmount}
                max={Math.min(mockAsset.maxInvestment, mockAsset.availableTokens)}
                min={mockAsset.minInvestment}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>{mockAsset.minInvestment}</span>
                <span>{Math.min(mockAsset.maxInvestment, mockAsset.availableTokens)}</span>
              </div>
            </div>

            <div className="flex space-x-2">
              <Input
                type="number"
                value={tokenAmount[0]}
                onChange={(e) => setTokenAmount([Number.parseInt(e.target.value) || 0])}
                min={mockAsset.minInvestment}
                max={Math.min(mockAsset.maxInvestment, mockAsset.availableTokens)}
              />
              <div className="flex space-x-1">
                <Button variant="outline" size="sm" onClick={() => setTokenAmount([10])} className="text-xs">
                  10
                </Button>
                <Button variant="outline" size="sm" onClick={() => setTokenAmount([50])} className="text-xs">
                  50
                </Button>
                <Button variant="outline" size="sm" onClick={() => setTokenAmount([100])} className="text-xs">
                  100
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Investment Summary */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Сумма инвестиций:</span>
              <span className="font-semibold text-foreground">${investmentAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Цена за токен:</span>
              <span className="text-foreground">${mockAsset.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Годовая доходность:</span>
              <span className="text-green-600 font-medium">{mockAsset.yield}%</span>
            </div>
          </div>

          <Separator />

          {/* Expected Returns */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Ожидаемая доходность</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">В месяц:</span>
                <span className="text-green-600 font-medium">${expectedMonthlyReturn.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">В год:</span>
                <span className="text-green-600 font-medium">${expectedYearlyReturn.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Investment Button */}
          <Button
            className="w-full bg-primary hover:bg-primary/90"
            size="lg"
            onClick={handleInvest}
            disabled={!connected || !program || isInvesting || tokenAmount[0] === 0}
          >
            {!connected ? (
              <>
                <Wallet className="w-4 h-4 mr-2" />
                Подключите кошелек
              </>
            ) : !program ? (
              "Загрузка программы..."
            ) : isInvesting ? (
              "Обработка..."
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-2" />
                Инвестировать ${investmentAmount.toFixed(2)}
              </>
            )}
          </Button>

          {connected && (
            <p className="text-xs text-muted-foreground text-center">
              Кошелек: {publicKey?.toString().slice(0, 8)}...{publicKey?.toString().slice(-8)}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Investment Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Преимущества инвестирования</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Пассивный доход</h4>
              <p className="text-sm text-muted-foreground">Получайте ежемесячные выплаты от арендных доходов</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Ликвидность 24/7</h4>
              <p className="text-sm text-muted-foreground">Торгуйте токенами в любое время на маркетплейсе</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div>
              <h4 className="font-medium text-foreground">Безопасность</h4>
              <p className="text-sm text-muted-foreground">Защищено смарт-контрактами и аудитами</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
