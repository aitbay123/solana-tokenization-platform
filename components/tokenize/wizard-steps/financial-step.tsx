"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, Coins, TrendingUp, Target } from "lucide-react"
import type { WizardData } from "../tokenization-wizard"

interface FinancialStepProps {
  data: WizardData
  updateData: (data: Partial<WizardData>) => void
}

export function FinancialStep({ data, updateData }: FinancialStepProps) {
  const handleFinancialChange = (field: keyof WizardData["financial"], value: number) => {
    updateData({
      financial: {
        ...data.financial,
        [field]: value,
      },
    })
  }

  // Auto-calculate price per token when total value or token supply changes
  const calculatePricePerToken = () => {
    if (data.financial.totalValue > 0 && data.financial.tokenSupply > 0) {
      return data.financial.totalValue / data.financial.tokenSupply
    }
    return 0
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Financial Structure</h3>
        <p className="text-gray-400">Define the tokenomics and pricing for your asset</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <DollarSign className="w-5 h-5 text-[#14F195]" />
              Asset Valuation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="totalValue" className="text-gray-300">
                Total Asset Value (USD)
              </Label>
              <Input
                id="totalValue"
                type="number"
                placeholder="1000000"
                value={data.financial.totalValue || ""}
                onChange={(e) => handleFinancialChange("totalValue", Number(e.target.value))}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="expectedYield" className="text-gray-300">
                Expected Annual Yield (%)
              </Label>
              <Input
                id="expectedYield"
                type="number"
                step="0.1"
                placeholder="8.5"
                value={data.financial.expectedYield || ""}
                onChange={(e) => handleFinancialChange("expectedYield", Number(e.target.value))}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <Coins className="w-5 h-5 text-[#9945FF]" />
              Token Structure
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="tokenSupply" className="text-gray-300">
                Total Token Supply
              </Label>
              <Input
                id="tokenSupply"
                type="number"
                placeholder="1000000"
                value={data.financial.tokenSupply || ""}
                onChange={(e) => handleFinancialChange("tokenSupply", Number(e.target.value))}
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
              />
            </div>
            <div>
              <Label htmlFor="pricePerToken" className="text-gray-300">
                Price per Token (USD)
              </Label>
              <Input
                id="pricePerToken"
                type="number"
                step="0.01"
                placeholder="1.00"
                value={calculatePricePerToken().toFixed(2)}
                readOnly
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-500 opacity-75"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-calculated from total value ÷ token supply</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10 md:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <Target className="w-5 h-5 text-[#14F195]" />
              Investment Parameters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minimumInvestment" className="text-gray-300">
                  Minimum Investment (USD)
                </Label>
                <Input
                  id="minimumInvestment"
                  type="number"
                  placeholder="100"
                  value={data.financial.minimumInvestment || ""}
                  onChange={(e) => handleFinancialChange("minimumInvestment", Number(e.target.value))}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                />
              </div>
              <div className="flex items-end">
                <div className="bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 p-4 rounded-lg border border-white/10 w-full">
                  <div className="text-sm text-gray-400 mb-1">Tokens per minimum investment</div>
                  <div className="text-xl font-bold text-white">
                    {data.financial.minimumInvestment && calculatePricePerToken() > 0
                      ? Math.floor(data.financial.minimumInvestment / calculatePricePerToken()).toLocaleString()
                      : "0"}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Financial Summary */}
      {data.financial.totalValue > 0 && data.financial.tokenSupply > 0 && (
        <Card className="bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 border-white/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <TrendingUp className="w-5 h-5 text-[#14F195]" />
              Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-white">${data.financial.totalValue.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Value</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{data.financial.tokenSupply.toLocaleString()}</div>
                <div className="text-sm text-gray-400">Total Tokens</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">${calculatePricePerToken().toFixed(4)}</div>
                <div className="text-sm text-gray-400">Price/Token</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{data.financial.expectedYield}%</div>
                <div className="text-sm text-gray-400">Expected Yield</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
