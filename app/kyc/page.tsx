"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Shield, CheckCircle, Clock, AlertCircle, FileText, User, Building } from "lucide-react"
import { PersonalInfoForm } from "@/components/kyc/personal-info-form"
import { DocumentUpload } from "@/components/kyc/document-upload"
import { ComplianceStatus } from "@/components/kyc/compliance-status"

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [kycStatus, setKycStatus] = useState<"pending" | "in-review" | "approved" | "rejected">("pending")

  const steps = [
    { id: 1, title: "Личная информация", icon: User, completed: false },
    { id: 2, title: "Документы", icon: FileText, completed: false },
    { id: 3, title: "Верификация", icon: Shield, completed: false },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-emerald-500"
      case "in-review":
        return "bg-amber-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-slate-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "in-review":
        return <Clock className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Верификация KYC/AML</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Пройдите процедуру верификации для доступа к токенизации активов и торговле
          </p>
        </div>

        {/* Status Card */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  Статус верификации
                </CardTitle>
                <CardDescription>Текущий статус вашей KYC/AML верификации</CardDescription>
              </div>
              <Badge className={`${getStatusColor(kycStatus)} text-white`}>
                <div className="flex items-center gap-1">
                  {getStatusIcon(kycStatus)}
                  {kycStatus === "pending" && "Ожидает"}
                  {kycStatus === "in-review" && "На рассмотрении"}
                  {kycStatus === "approved" && "Одобрено"}
                  {kycStatus === "rejected" && "Отклонено"}
                </div>
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Прогресс верификации</span>
                <span>{Math.round((currentStep / steps.length) * 100)}%</span>
              </div>
              <Progress value={(currentStep / steps.length) * 100} className="h-2" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      step.id <= currentStep ? "bg-emerald-50 border-emerald-200" : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div
                      className={`p-2 rounded-full ${
                        step.id <= currentStep ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400"
                      }`}
                    >
                      <step.icon className="h-4 w-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{step.title}</p>
                      <p className="text-xs text-slate-500">{step.id <= currentStep ? "Завершено" : "Ожидает"}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* KYC Forms */}
        <Tabs value={`step-${currentStep}`} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="step-1" disabled={currentStep < 1}>
              Личные данные
            </TabsTrigger>
            <TabsTrigger value="step-2" disabled={currentStep < 2}>
              Документы
            </TabsTrigger>
            <TabsTrigger value="step-3" disabled={currentStep < 3}>
              Статус
            </TabsTrigger>
          </TabsList>

          <TabsContent value="step-1">
            <PersonalInfoForm onNext={() => setCurrentStep(2)} />
          </TabsContent>

          <TabsContent value="step-2">
            <DocumentUpload onNext={() => setCurrentStep(3)} onBack={() => setCurrentStep(1)} />
          </TabsContent>

          <TabsContent value="step-3">
            <ComplianceStatus status={kycStatus} onBack={() => setCurrentStep(2)} />
          </TabsContent>
        </Tabs>

        {/* Compliance Info */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5 text-emerald-600" />
              Регулятивное соответствие
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">KYC (Know Your Customer)</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Процедура идентификации клиента для предотвращения мошенничества и соблюдения международных
                  стандартов.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Верификация личности</li>
                  <li>• Проверка документов</li>
                  <li>• Подтверждение адреса</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">AML (Anti-Money Laundering)</h4>
                <p className="text-sm text-slate-600 mb-4">
                  Меры по предотвращению отмывания денег и финансирования терроризма в соответствии с международными
                  требованиями.
                </p>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Мониторинг транзакций</li>
                  <li>• Проверка санкционных списков</li>
                  <li>• Анализ источников средств</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
