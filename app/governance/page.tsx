"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, XCircle, Plus, BarChart3, Shield, Coins } from "lucide-react"
import { GovernanceStats } from "@/components/governance/governance-stats"
import { ProposalList } from "@/components/governance/proposal-list"
import { VotingPower } from "@/components/governance/voting-power"
import { CreateProposal } from "@/components/governance/create-proposal"

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState("proposals")
  const [showCreateProposal, setShowCreateProposal] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-emerald-50 to-teal-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 text-balance">Governance Dashboard</h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto text-pretty">
                Участвуйте в управлении платформой через децентрализованное голосование и предложения
              </p>
            </div>

            {/* Quick Stats */}
            <GovernanceStats />
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar */}
              <aside className="lg:w-80">
                <VotingPower />

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Plus className="h-5 w-5 text-emerald-600" />
                      Создать предложение
                    </CardTitle>
                    <CardDescription>Предложите изменения в платформе</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => setShowCreateProposal(true)}
                    >
                      Новое предложение
                    </Button>
                  </CardContent>
                </Card>

                {/* Governance Info */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5 text-emerald-600" />
                      Как работает Governance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Право голоса</h4>
                      <p className="text-sm text-slate-600">
                        Владельцы токенов платформы получают право голоса пропорционально количеству токенов
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Кворум</h4>
                      <p className="text-sm text-slate-600">
                        Для принятия предложения необходимо участие минимум 10% от общего количества токенов
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2">Период голосования</h4>
                      <p className="text-sm text-slate-600">
                        Каждое предложение открыто для голосования в течение 7 дней
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </aside>

              {/* Main Content */}
              <div className="flex-1">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="proposals">Предложения</TabsTrigger>
                    <TabsTrigger value="history">История</TabsTrigger>
                    <TabsTrigger value="analytics">Аналитика</TabsTrigger>
                  </TabsList>

                  <TabsContent value="proposals" className="mt-6">
                    <ProposalList />
                  </TabsContent>

                  <TabsContent value="history" className="mt-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>История голосований</CardTitle>
                        <CardDescription>Завершенные предложения и их результаты</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            {
                              id: "PROP-001",
                              title: "Снижение комиссии за токенизацию до 2%",
                              status: "approved",
                              votes: { for: 75, against: 25 },
                              date: "2024-01-15",
                            },
                            {
                              id: "PROP-002",
                              title: "Добавление поддержки токенизации автомобилей",
                              status: "rejected",
                              votes: { for: 35, against: 65 },
                              date: "2024-01-08",
                            },
                            {
                              id: "PROP-003",
                              title: "Интеграция с Chainlink Oracle",
                              status: "approved",
                              votes: { for: 82, against: 18 },
                              date: "2024-01-01",
                            },
                          ].map((proposal) => (
                            <div key={proposal.id} className="border rounded-lg p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <h4 className="font-medium">{proposal.title}</h4>
                                  <p className="text-sm text-slate-600">
                                    {proposal.id} • {proposal.date}
                                  </p>
                                </div>
                                <Badge
                                  className={
                                    proposal.status === "approved"
                                      ? "bg-emerald-500 text-white"
                                      : "bg-red-500 text-white"
                                  }
                                >
                                  {proposal.status === "approved" ? (
                                    <>
                                      <CheckCircle className="h-3 w-3 mr-1" /> Принято
                                    </>
                                  ) : (
                                    <>
                                      <XCircle className="h-3 w-3 mr-1" /> Отклонено
                                    </>
                                  )}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4">
                                <div className="flex-1">
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>За: {proposal.votes.for}%</span>
                                    <span>Против: {proposal.votes.against}%</span>
                                  </div>
                                  <Progress value={proposal.votes.for} className="h-2" />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="analytics" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <BarChart3 className="h-5 w-5 text-emerald-600" />
                            Участие в голосованиях
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Средняя явка</span>
                              <span className="font-medium">67.3%</span>
                            </div>
                            <Progress value={67.3} className="h-2" />

                            <div className="flex justify-between items-center">
                              <span className="text-sm">Активных голосующих</span>
                              <span className="font-medium">1,247</span>
                            </div>

                            <div className="flex justify-between items-center">
                              <span className="text-sm">Всего предложений</span>
                              <span className="font-medium">23</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Coins className="h-5 w-5 text-emerald-600" />
                            Распределение токенов
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Топ 10 держателей</span>
                              <span className="font-medium">34.2%</span>
                            </div>
                            <Progress value={34.2} className="h-2" />

                            <div className="flex justify-between items-center">
                              <span className="text-sm">Средние держатели</span>
                              <span className="font-medium">45.8%</span>
                            </div>
                            <Progress value={45.8} className="h-2" />

                            <div className="flex justify-between items-center">
                              <span className="text-sm">Мелкие держатели</span>
                              <span className="font-medium">20.0%</span>
                            </div>
                            <Progress value={20.0} className="h-2" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Create Proposal Modal */}
      {showCreateProposal && <CreateProposal onClose={() => setShowCreateProposal(false)} />}
    </div>
  )
}
