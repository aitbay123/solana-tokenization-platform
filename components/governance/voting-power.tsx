"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Coins, TrendingUp, Users } from "lucide-react"

export function VotingPower() {
  const userStats = {
    tokens: 15750,
    votingPower: 0.63, // percentage
    rank: 247,
    totalHolders: 12450,
    delegated: 2500,
    received: 0,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Coins className="h-5 w-5 text-emerald-600" />
          Ваша сила голоса
        </CardTitle>
        <CardDescription>Токены и влияние в governance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Token Balance */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Баланс токенов</span>
            <Badge variant="outline" className="text-emerald-600 border-emerald-200">
              #{userStats.rank}
            </Badge>
          </div>
          <div className="text-2xl font-bold text-slate-900 mb-1">{userStats.tokens.toLocaleString()} ST</div>
          <div className="text-sm text-slate-600">{userStats.votingPower}% от общего количества</div>
          <Progress value={userStats.votingPower} className="h-2 mt-2" />
        </div>

        {/* Delegation */}
        <div className="space-y-3">
          <h4 className="font-medium text-sm">Делегирование</h4>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Делегировано другим</span>
            <span className="font-medium">{userStats.delegated.toLocaleString()} ST</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600">Получено от других</span>
            <span className="font-medium">{userStats.received.toLocaleString()} ST</span>
          </div>
        </div>

        {/* Stats */}
        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">Всего держателей</span>
            </div>
            <span className="font-medium">{userStats.totalHolders.toLocaleString()}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-slate-500" />
              <span className="text-sm text-slate-600">Ваш ранг</span>
            </div>
            <span className="font-medium">#{userStats.rank}</span>
          </div>
        </div>

        {/* Voting History */}
        <div className="pt-4 border-t">
          <h4 className="font-medium text-sm mb-3">История голосований</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Участие в голосованиях</span>
              <span className="font-medium">18/23 (78%)</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Успешных предложений</span>
              <span className="font-medium">14/18 (78%)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
