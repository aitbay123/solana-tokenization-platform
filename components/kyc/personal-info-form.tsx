"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { User, MapPin, Phone } from "lucide-react"

interface PersonalInfoFormProps {
  onNext: () => void
}

export function PersonalInfoForm({ onNext }: PersonalInfoFormProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    nationality: "",
    country: "",
    city: "",
    address: "",
    postalCode: "",
    phone: "",
    email: "",
    occupation: "",
    sourceOfFunds: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate and submit the form data
    console.log("[v0] Personal info form submitted:", formData)
    onNext()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5 text-emerald-600" />
          Личная информация
        </CardTitle>
        <CardDescription>Заполните все поля для прохождения верификации личности</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Details */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Персональные данные</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="firstName">Имя *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange("firstName", e.target.value)}
                  placeholder="Введите имя"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Фамилия *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange("lastName", e.target.value)}
                  placeholder="Введите фамилию"
                  required
                />
              </div>
              <div>
                <Label htmlFor="middleName">Отчество</Label>
                <Input
                  id="middleName"
                  value={formData.middleName}
                  onChange={(e) => handleInputChange("middleName", e.target.value)}
                  placeholder="Введите отчество"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="dateOfBirth">Дата рождения *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="nationality">Гражданство *</Label>
                <Select onValueChange={(value) => handleInputChange("nationality", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите гражданство" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Российская Федерация</SelectItem>
                    <SelectItem value="us">США</SelectItem>
                    <SelectItem value="gb">Великобритания</SelectItem>
                    <SelectItem value="de">Германия</SelectItem>
                    <SelectItem value="fr">Франция</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Адрес проживания
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="country">Страна *</Label>
                <Select onValueChange={(value) => handleInputChange("country", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите страну" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Россия</SelectItem>
                    <SelectItem value="us">США</SelectItem>
                    <SelectItem value="gb">Великобритания</SelectItem>
                    <SelectItem value="de">Германия</SelectItem>
                    <SelectItem value="other">Другая</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="city">Город *</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  placeholder="Введите город"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Полный адрес *</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                placeholder="Введите полный адрес проживания"
                required
              />
            </div>

            <div>
              <Label htmlFor="postalCode">Почтовый индекс *</Label>
              <Input
                id="postalCode"
                value={formData.postalCode}
                onChange={(e) => handleInputChange("postalCode", e.target.value)}
                placeholder="Введите почтовый индекс"
                required
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Контактная информация
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+7 (999) 123-45-67"
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="example@email.com"
                  required
                />
              </div>
            </div>
          </div>

          {/* Financial Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-slate-900">Финансовая информация</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="occupation">Род деятельности *</Label>
                <Input
                  id="occupation"
                  value={formData.occupation}
                  onChange={(e) => handleInputChange("occupation", e.target.value)}
                  placeholder="Ваша профессия или должность"
                  required
                />
              </div>
              <div>
                <Label htmlFor="sourceOfFunds">Источник средств *</Label>
                <Select onValueChange={(value) => handleInputChange("sourceOfFunds", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите источник" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="salary">Заработная плата</SelectItem>
                    <SelectItem value="business">Предпринимательская деятельность</SelectItem>
                    <SelectItem value="investments">Инвестиции</SelectItem>
                    <SelectItem value="inheritance">Наследство</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6">
            <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700">
              Продолжить
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
