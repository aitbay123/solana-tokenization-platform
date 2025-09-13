"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Vote, Users, TrendingUp, Clock } from "lucide-react"

export function GovernanceStats() {
  const stats = [
    {
      title: "Активные предложения",
      value: "5",
      change: "+2 за неделю",
      icon: Vote,
      color: "text-blue-600",
    },
    {
      title: "Участников голосования",
      value: "1,247",
      change: "+156 за месяц",
      icon: Users,
      color: "text-emerald-600",
    },
    {
      title: "Средняя явка",
      value: "67.3%",
      change: "+5.2% за месяц",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Время до закрытия",
      value: "3 дня",
      change: "Следующее голосование",
      icon: Clock,
      color: "text-amber-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="bg-white/80 backdrop-blur-sm border-white/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900 mb-1">{stat.value}</div>
            <p className="text-xs text-slate-600">{stat.change}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
