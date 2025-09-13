"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Upload, CheckCircle, AlertCircle, Camera, CreditCard } from "lucide-react"

interface DocumentUploadProps {
  onNext: () => void
  onBack: () => void
}

interface Document {
  id: string
  name: string
  type: "passport" | "address" | "selfie" | "additional"
  status: "pending" | "uploaded" | "verified" | "rejected"
  required: boolean
  description: string
  file?: File
}

export function DocumentUpload({ onNext, onBack }: DocumentUploadProps) {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Паспорт (главная страница)",
      type: "passport",
      status: "pending",
      required: true,
      description: "Загрузите четкое фото главной страницы паспорта",
    },
    {
      id: "2",
      name: "Паспорт (страница с пропиской)",
      type: "passport",
      status: "pending",
      required: true,
      description: "Страница с отметкой о регистрации по месту жительства",
    },
    {
      id: "3",
      name: "Подтверждение адреса",
      type: "address",
      status: "pending",
      required: true,
      description: "Справка о регистрации или коммунальный счет (не старше 3 месяцев)",
    },
    {
      id: "4",
      name: "Селфи с паспортом",
      type: "selfie",
      status: "pending",
      required: true,
      description: "Фото с паспортом в руках на фоне лица",
    },
    {
      id: "5",
      name: "Справка о доходах",
      type: "additional",
      status: "pending",
      required: false,
      description: "Справка 2-НДФЛ или другой документ о доходах (опционально)",
    },
  ])

  const handleFileUpload = (documentId: string, file: File) => {
    setDocuments((prev) =>
      prev.map((doc) => (doc.id === documentId ? { ...doc, status: "uploaded" as const, file } : doc)),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-emerald-500"
      case "uploaded":
        return "bg-blue-500"
      case "rejected":
        return "bg-red-500"
      default:
        return "bg-slate-400"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4" />
      case "uploaded":
        return <FileText className="h-4 w-4" />
      case "rejected":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Upload className="h-4 w-4" />
    }
  }

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "passport":
        return <CreditCard className="h-5 w-5" />
      case "address":
        return <FileText className="h-5 w-5" />
      case "selfie":
        return <Camera className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  const requiredDocuments = documents.filter((doc) => doc.required)
  const uploadedRequired = requiredDocuments.filter(
    (doc) => doc.status === "uploaded" || doc.status === "verified",
  ).length
  const canProceed = uploadedRequired === requiredDocuments.length

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-emerald-600" />
          Загрузка документов
        </CardTitle>
        <CardDescription>Загрузите необходимые документы для верификации личности</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Progress */}
          <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Прогресс загрузки</span>
              <span className="text-sm text-slate-600">
                {uploadedRequired} из {requiredDocuments.length} обязательных документов
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div
                className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(uploadedRequired / requiredDocuments.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Document List */}
          <div className="space-y-4">
            {documents.map((document) => (
              <div key={document.id} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-slate-100 rounded-lg text-slate-600">{getDocumentIcon(document.type)}</div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium">{document.name}</h4>
                        {document.required && (
                          <Badge variant="outline" className="text-xs">
                            Обязательно
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{document.description}</p>
                    </div>
                  </div>
                  <Badge className={`${getStatusColor(document.status)} text-white`}>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(document.status)}
                      {document.status === "pending" && "Ожидает"}
                      {document.status === "uploaded" && "Загружено"}
                      {document.status === "verified" && "Проверено"}
                      {document.status === "rejected" && "Отклонено"}
                    </div>
                  </Badge>
                </div>

                {document.status === "pending" && (
                  <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
                    <p className="text-sm text-slate-600 mb-3">Перетащите файл сюда или нажмите для выбора</p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleFileUpload(document.id, file)
                        }
                      }}
                      className="hidden"
                      id={`file-${document.id}`}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => document.getElementById(`file-${document.id}`)?.click()}
                    >
                      Выбрать файл
                    </Button>
                  </div>
                )}

                {document.status === "uploaded" && document.file && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">{document.file.name}</span>
                      <span className="text-xs text-blue-600">({Math.round(document.file.size / 1024)} KB)</span>
                    </div>
                  </div>
                )}

                {document.status === "verified" && (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-emerald-700">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Документ успешно проверен</span>
                    </div>
                  </div>
                )}

                {document.status === "rejected" && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-red-700">
                      <AlertCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">Документ отклонен. Загрузите новый файл.</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2">Требования к документам:</h4>
            <ul className="text-sm text-amber-800 space-y-1">
              <li>• Документы должны быть четкими и читаемыми</li>
              <li>• Формат файлов: JPG, PNG, PDF</li>
              <li>• Максимальный размер файла: 10 МБ</li>
              <li>• Документы не должны быть старше 3 месяцев (кроме паспорта)</li>
              <li>• Все углы документа должны быть видны</li>
            </ul>
          </div>

          {/* Navigation */}
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack}>
              Назад
            </Button>
            <Button onClick={onNext} disabled={!canProceed} className="bg-emerald-600 hover:bg-emerald-700">
              {canProceed
                ? "Отправить на проверку"
                : `Загрузите ${requiredDocuments.length - uploadedRequired} документов`}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
