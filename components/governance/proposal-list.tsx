"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Clock, Users, MessageSquare } from "lucide-react"

interface Proposal {
  id: string
  title: string
  description: string
  author: string
  status: "active" | "pending" | "executed"
  category: string
  votes: {
    for: number
    against: number
    abstain: number
  }
  totalVotes: number
  quorum: number
  timeLeft: string
  discussion: number
}

export function ProposalList() {
  const proposals: Proposal[] = [
    {
      id: "PROP-024",
      title: "Снижение минимального порога для токенизации недвижимости",
      description:
        "Предлагается снизить минимальную стоимость недвижимости для токенизации с $100,000 до $50,000 для увеличения доступности платформы.",
      author: "0x1234...5678",
      status: "active",
      category: "Platform",
      votes: { for: 1250000, against: 340000, abstain: 120000 },
      totalVotes: 1710000,
      quorum: 2500000,
      timeLeft: "3 дня 14 часов",
      discussion: 23,
    },
    {
      id: "PROP-025",
      title: "Интеграция с Chainlink для оценки произведений искусства",
      description:
        "Добавление Chainlink Oracle для автоматической оценки стоимости произведений искусства на основе рыночных данных.",
      author: "0x9876...4321",
      status: "active",
      category: "Technical",
      votes: { for: 890000, against: 210000, abstain: 45000 },
      totalVotes: 1145000,
      quorum: 2500000,
      timeLeft: "5 дней 8 часов",
      discussion: 17,
    },
    {
      id: "PROP-026",
      title: "Создание страхового фонда для защиты инвесторов",
      description:
        "Предложение о создании децентрализованного страхового фонда для компенсации потерь инвесторов в случае форс-мажорных обстоятельств.",
      author: "0x5555...7777",
      status: "pending",
      category: "Finance",
      votes: { for: 0, against: 0, abstain: 0 },
      totalVotes: 0,
      quorum: 2500000,
      timeLeft: "Ожидает начала",
      discussion: 8,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-500 text-white"
      case "pending":
        return "bg-amber-500 text-white"
      case "executed":
        return "bg-blue-500 text-white"
      default:
        return "bg-slate-500 text-white"
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Platform":
        return "bg-blue-100 text-blue-800"
      case "Technical":
        return "bg-purple-100 text-purple-800"
      case "Finance":
        return "bg-emerald-100 text-emerald-800"
      default:
        return "bg-slate-100 text-slate-800"
    }
  }

  const calculateVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0
  }

  return (
    <div className="space-y-6">
      {proposals.map((proposal) => (
        <Card key={proposal.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getStatusColor(proposal.status)}>
                    {proposal.status === "active" && "Активно"}
                    {proposal.status === "pending" && "Ожидает"}
                    {proposal.status === "executed" && "Исполнено"}
                  </Badge>
                  <Badge variant="outline" className={getCategoryColor(proposal.category)}>
                    {proposal.category}
                  </Badge>
                  <span className="text-sm text-slate-500">{proposal.id}</span>
                </div>
                <CardTitle className="text-lg mb-2">{proposal.title}</CardTitle>
                <CardDescription className="text-sm">{proposal.description}</CardDescription>
                <div className="flex items-center gap-4 mt-3 text-sm text-slate-600">
                  <span>Автор: {proposal.author}</span>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{proposal.discussion} обсуждений</span>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {proposal.status === "active" && (
              <>
                {/* Voting Progress */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span>
                      За: {proposal.votes.for.toLocaleString()} (
                      {calculateVotePercentage(proposal.votes.for, proposal.totalVotes).toFixed(1)}%)
                    </span>
                    <span>
                      Против: {proposal.votes.against.toLocaleString()} (
                      {calculateVotePercentage(proposal.votes.against, proposal.totalVotes).toFixed(1)}%)
                    </span>
                  </div>
                  <Progress value={calculateVotePercentage(proposal.votes.for, proposal.totalVotes)} className="h-2" />

                  <div className="flex justify-between text-sm text-slate-600">
                    <span>Кворум: {((proposal.totalVotes / proposal.quorum) * 100).toFixed(1)}%</span>
                    <span>Всего голосов: {proposal.totalVotes.toLocaleString()}</span>
                  </div>
                  <Progress value={(proposal.totalVotes / proposal.quorum) * 100} className="h-1" />
                </div>

                {/* Time and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{proposal.timeLeft}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{(proposal.totalVotes / 1000).toFixed(0)}K голосов</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Обсудить
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      Против
                    </Button>
                    <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                      За
                    </Button>
                  </div>
                </div>
              </>
            )}

            {proposal.status === "pending" && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-slate-600">Голосование начнется в ближайшее время</div>
                <Button variant="outline" size="sm">
                  Подписаться на уведомления
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
