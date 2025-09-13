"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { X, FileText, AlertCircle } from "lucide-react"

interface CreateProposalProps {
  onClose: () => void
}

export function CreateProposal({ onClose }: CreateProposalProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    details: "",
    duration: "7",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically submit the proposal to the blockchain
    console.log("[v0] Creating proposal:", formData)
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-emerald-600" />
                Создать предложение
              </CardTitle>
              <CardDescription>Предложите изменения в платформе для голосования сообщества</CardDescription>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <Label htmlFor="title">Заголовок предложения *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Краткое описание предложения"
                required
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category">Категория *</Label>
              <Select onValueChange={(value) => handleInputChange("category", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="platform">Платформа</SelectItem>
                  <SelectItem value="technical">Техническое</SelectItem>
                  <SelectItem value="finance">Финансы</SelectItem>
                  <SelectItem value="governance">Управление</SelectItem>
                  <SelectItem value="marketing">Маркетинг</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Краткое описание *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Опишите суть предложения в 2-3 предложениях"
                rows={3}
                required
              />
            </div>

            {/* Detailed Description */}
            <div>
              <Label htmlFor="details">Подробное описание *</Label>
              <Textarea
                id="details"
                value={formData.details}
                onChange={(e) => handleInputChange("details", e.target.value)}
                placeholder="Детальное описание предложения, обоснование, ожидаемые результаты"
                rows={6}
                required
              />
            </div>

            {/* Duration */}
            <div>
              <Label htmlFor="duration">Длительность голосования</Label>
              <Select onValueChange={(value) => handleInputChange("duration", value)} defaultValue="7">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 дня</SelectItem>
                  <SelectItem value="7">7 дней</SelectItem>
                  <SelectItem value="14">14 дней</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Requirements Notice */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-amber-900 mb-1">Требования для создания предложения</h4>
                  <ul className="text-sm text-amber-800 space-y-1">
                    <li>• Минимум 10,000 ST токенов для создания предложения</li>
                    <li>• Предложение будет рассмотрено модераторами в течение 24 часов</li>
                    <li>• Для принятия необходимо 10% кворум и простое большинство</li>
                    <li>• Комиссия за создание предложения: 100 ST</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-6">
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
                Создать предложение
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
