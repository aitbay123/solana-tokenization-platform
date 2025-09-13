"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, AlertCircle, Shield, Mail, Phone } from "lucide-react"

interface ComplianceStatusProps {
  status: "pending" | "in-review" | "approved" | "rejected"
  onBack: () => void
}

export function ComplianceStatus({ status, onBack }: ComplianceStatusProps) {
  const getStatusInfo = () => {
    switch (status) {
      case "approved":
        return {
          icon: <CheckCircle className="h-12 w-12 text-emerald-600" />,
          title: "Верификация завершена",
          description: "Поздравляем! Ваша KYC/AML верификация успешно пройдена.",
          color: "emerald",
          nextSteps: [
            "Теперь вы можете токенизировать активы",
            "Доступна торговля на маркетплейсе",
            "Увеличены лимиты транзакций",
            "Доступ к премиум функциям",
          ],
        }
      case "in-review":
        return {
          icon: <Clock className="h-12 w-12 text-amber-600" />,
          title: "Документы на рассмотрении",
          description: "Ваши документы переданы на проверку. Обычно процесс занимает 1-3 рабочих дня.",
          color: "amber",
          nextSteps: [
            "Ожидайте уведомление на email",
            "Проверяйте статус в личном кабинете",
            "При необходимости мы свяжемся с вами",
            "Подготовьте дополнительные документы",
          ],
        }
      case "rejected":
        return {
          icon: <AlertCircle className="h-12 w-12 text-red-600" />,
          title: "Верификация отклонена",
          description: "К сожалению, предоставленные документы не прошли проверку.",
          color: "red",
          nextSteps: [
            "Проверьте качество документов",
            "Убедитесь в актуальности данных",
            "Загрузите документы повторно",
            "Обратитесь в службу поддержки",
          ],
        }
      default:
        return {
          icon: <Clock className="h-12 w-12 text-slate-600" />,
          title: "Ожидает отправки",
          description: "Завершите заполнение всех форм для отправки на проверку.",
          color: "slate",
          nextSteps: [
            "Заполните личную информацию",
            "Загрузите все документы",
            "Проверьте корректность данных",
            "Отправьте на верификацию",
          ],
        }
    }
  }

  const statusInfo = getStatusInfo()

  return (
    <div className="space-y-6">
      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-emerald-600" />
            Статус верификации
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="mb-4">{statusInfo.icon}</div>
            <h3 className="text-2xl font-bold mb-2">{statusInfo.title}</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">{statusInfo.description}</p>
            <Badge className={`bg-${statusInfo.color}-500 text-white px-4 py-2`}>
              {status === "pending" && "Ожидает отправки"}
              {status === "in-review" && "На рассмотрении"}
              {status === "approved" && "Одобрено"}
              {status === "rejected" && "Отклонено"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>Следующие шаги</CardTitle>
          <CardDescription>Что делать дальше в зависимости от статуса верификации</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {statusInfo.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <div
                  className={`w-6 h-6 rounded-full bg-${statusInfo.color}-100 text-${statusInfo.color}-600 flex items-center justify-center text-sm font-medium mt-0.5`}
                >
                  {index + 1}
                </div>
                <span className="text-slate-700">{step}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Contact Support */}
      {(status === "rejected" || status === "in-review") && (
        <Card>
          <CardHeader>
            <CardTitle>Нужна помощь?</CardTitle>
            <CardDescription>Свяжитесь с нашей службой поддержки для получения помощи</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Mail className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium">Email поддержка</p>
                  <p className="text-sm text-slate-600">support@tokenization.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <Phone className="h-5 w-5 text-slate-600" />
                <div>
                  <p className="font-medium">Телефон поддержки</p>
                  <p className="text-sm text-slate-600">+7 (800) 123-45-67</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Actions */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={onBack}>
          Назад к документам
        </Button>
        {status === "approved" && (
          <Button className="bg-emerald-600 hover:bg-emerald-700">Перейти к токенизации</Button>
        )}
        {status === "rejected" && <Button className="bg-blue-600 hover:bg-blue-700">Повторить верификацию</Button>}
      </div>
    </div>
  )
}
