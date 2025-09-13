"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Building, MapPin, DollarSign, FileText, Upload } from "lucide-react"
import { useProgram } from "@/hooks/use-program"
import { toast } from "sonner"

const realEstateSchema = z.object({
  propertyName: z.string().min(1, "Название обязательно"),
  propertyType: z.string().min(1, "Выберите тип недвижимости"),
  address: z.string().min(1, "Адрес обязателен"),
  city: z.string().min(1, "Город обязателен"),
  country: z.string().min(1, "Страна обязательна"),
  totalValue: z.string().min(1, "Общая стоимость обязательна"),
  tokenSupply: z.string().min(1, "Количество токенов обязательно"),
  description: z.string().min(10, "Описание должно содержать минимум 10 символов"),
  rentalYield: z.string().optional(),
  propertySize: z.string().min(1, "Площадь обязательна"),
  yearBuilt: z.string().min(1, "Год постройки обязателен"),
  hasDocuments: z.boolean().default(false),
  hasInsurance: z.boolean().default(false),
})

type RealEstateFormData = z.infer<typeof realEstateSchema>

export function RealEstateTokenizeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { initializeAsset, connected } = useProgram()

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RealEstateFormData>({
    resolver: zodResolver(realEstateSchema),
  })

  const onSubmit = async (data: RealEstateFormData) => {
    if (!connected) {
      toast.error("Подключите кошелек для продолжения")
      return
    }

    setIsSubmitting(true)
    try {
      // Create metadata object
      const metadata = {
        name: data.propertyName,
        description: data.description,
        image: "", // Would be uploaded separately
        attributes: [
          { trait_type: "Property Type", value: data.propertyType },
          { trait_type: "Address", value: data.address },
          { trait_type: "City", value: data.city },
          { trait_type: "Country", value: data.country },
          { trait_type: "Size", value: data.propertySize },
          { trait_type: "Year Built", value: data.yearBuilt },
          { trait_type: "Rental Yield", value: data.rentalYield || "N/A" },
        ],
      }

      // In a real implementation, you would upload metadata to IPFS
      const metadataUri = "https://example.com/metadata.json"

      const result = await initializeAsset(
        `RE-${Date.now()}`, // Asset ID
        0, // Real Estate type
        Number.parseInt(data.tokenSupply),
        metadataUri,
        Number.parseInt(data.totalValue.replace(/[^0-9]/g, "")),
      )

      toast.success("Актив успешно токенизирован!")
      console.log("Transaction:", result.transaction)
      console.log("Asset Public Key:", result.assetPublicKey.toString())
    } catch (error) {
      console.error("Error tokenizing asset:", error)
      toast.error("Ошибка при токенизации актива")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Building className="w-5 h-5 mr-2" />
            Основная информация
          </CardTitle>
          <CardDescription>Базовые данные о недвижимости</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="propertyName">Название недвижимости</Label>
              <Input
                id="propertyName"
                placeholder="Например: Офисное здание на Тверской"
                {...register("propertyName")}
              />
              {errors.propertyName && <p className="text-sm text-destructive">{errors.propertyName.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="propertyType">Тип недвижимости</Label>
              <Select onValueChange={(value) => setValue("propertyType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Жилая</SelectItem>
                  <SelectItem value="commercial">Коммерческая</SelectItem>
                  <SelectItem value="industrial">Промышленная</SelectItem>
                  <SelectItem value="land">Земельный участок</SelectItem>
                </SelectContent>
              </Select>
              {errors.propertyType && <p className="text-sm text-destructive">{errors.propertyType.message}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              placeholder="Подробное описание недвижимости, её особенностей и преимуществ..."
              rows={4}
              {...register("description")}
            />
            {errors.description && <p className="text-sm text-destructive">{errors.description.message}</p>}
          </div>
        </CardContent>
      </Card>

      {/* Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <MapPin className="w-5 h-5 mr-2" />
            Местоположение
          </CardTitle>
          <CardDescription>Адрес и географические данные</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="address">Полный адрес</Label>
            <Input id="address" placeholder="Улица, дом, квартира/офис" {...register("address")} />
            {errors.address && <p className="text-sm text-destructive">{errors.address.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="city">Город</Label>
              <Input id="city" placeholder="Москва" {...register("city")} />
              {errors.city && <p className="text-sm text-destructive">{errors.city.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Страна</Label>
              <Input id="country" placeholder="Россия" {...register("country")} />
              {errors.country && <p className="text-sm text-destructive">{errors.country.message}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Финансовая информация
          </CardTitle>
          <CardDescription>Стоимость и параметры токенизации</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="totalValue">Общая стоимость (USD)</Label>
              <Input id="totalValue" placeholder="1,000,000" {...register("totalValue")} />
              {errors.totalValue && <p className="text-sm text-destructive">{errors.totalValue.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="tokenSupply">Количество токенов</Label>
              <Input id="tokenSupply" placeholder="1000000" {...register("tokenSupply")} />
              {errors.tokenSupply && <p className="text-sm text-destructive">{errors.tokenSupply.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <Label htmlFor="propertySize">Площадь (м²)</Label>
              <Input id="propertySize" placeholder="150" {...register("propertySize")} />
              {errors.propertySize && <p className="text-sm text-destructive">{errors.propertySize.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="yearBuilt">Год постройки</Label>
              <Input id="yearBuilt" placeholder="2020" {...register("yearBuilt")} />
              {errors.yearBuilt && <p className="text-sm text-destructive">{errors.yearBuilt.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rentalYield">Доходность (%)</Label>
              <Input id="rentalYield" placeholder="8.5" {...register("rentalYield")} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Документация
          </CardTitle>
          <CardDescription>Подтверждение права собственности и страхование</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox id="hasDocuments" onCheckedChange={(checked) => setValue("hasDocuments", !!checked)} />
            <Label htmlFor="hasDocuments">У меня есть все необходимые документы на недвижимость</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="hasInsurance" onCheckedChange={(checked) => setValue("hasInsurance", !!checked)} />
            <Label htmlFor="hasInsurance">Недвижимость застрахована</Label>
          </div>

          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Upload className="w-8 h-8 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground mb-2">Загрузите документы</p>
            <p className="text-xs text-muted-foreground">
              Свидетельство о собственности, технический паспорт, страховой полис
            </p>
            <Button variant="outline" size="sm" className="mt-4 bg-transparent">
              Выбрать файлы
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" type="button">
          Сохранить черновик
        </Button>
        <Button type="submit" disabled={isSubmitting || !connected} className="bg-primary hover:bg-primary/90">
          {isSubmitting ? "Создание токенов..." : "Токенизировать актив"}
        </Button>
      </div>
    </form>
  )
}
