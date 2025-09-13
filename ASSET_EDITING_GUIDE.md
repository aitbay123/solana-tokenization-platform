# 🛠️ Руководство по редактированию объявлений

## 📍 Где хранятся объявления локально

### 1. **Основные активы (Mock данные)**
```
📁 app/api/assets/route.ts
```
- Содержит массив `mockAssets` с базовыми активами
- Используется для главной страницы маркетплейса

### 2. **Детальная информация активов**
```
📁 app/api/assets/[id]/route.ts
```
- Содержит расширенную информацию для страниц отдельных активов
- Включает дополнительные поля: highlights, documents, priceHistory

### 3. **Созданные пользователями активы**
```
📁 app/api/assets/create/route.ts
```
- Хранятся в памяти (переменная `createdAssets`)
- Добавляются через форму создания

## 🎯 Способы редактирования

### 1. **Через веб-интерфейс** (Рекомендуется)

#### Доступ к редактированию:
1. Перейдите на страницу актива: `/marketplace/asset/{id}`
2. Нажмите кнопку **"Редактировать"** в правом верхнем углу
3. Или перейдите напрямую: `/edit/asset/{id}`

#### Что можно редактировать:
- ✅ Название актива
- ✅ Описание
- ✅ Местоположение
- ✅ Общая стоимость
- ✅ Количество токенов
- ✅ Ожидаемая доходность
- ✅ Минимальная инвестиция
- ✅ Ключевые особенности
- ✅ Требование KYC

### 2. **Прямое редактирование файлов**

#### Для основных активов:
```typescript
// app/api/assets/route.ts
const mockAssets = [
  {
    id: "real-estate-1",
    title: "Ваше новое название", // ← Измените здесь
    description: "Ваше новое описание", // ← И здесь
    totalValue: 3000000, // ← И здесь
    // ... остальные поля
  }
]
```

#### Для детальной информации:
```typescript
// app/api/assets/[id]/route.ts
const mockAssets = [
  {
    id: "real-estate-1",
    title: "Ваше название",
    highlights: [
      "Ваша особенность 1",
      "Ваша особенность 2",
      // ← Добавьте новые особенности
    ],
    monthlyRevenue: 12000, // ← Измените доходность
    // ... остальные поля
  }
]
```

## 🔧 API для редактирования

### Получить данные для редактирования:
```bash
GET /api/assets/{id}/edit
```

### Обновить актив:
```bash
PUT /api/assets/{id}/edit
Content-Type: application/json

{
  "title": "Новое название",
  "description": "Новое описание",
  "totalValue": 3000000,
  "tokenSupply": 1000000,
  "expectedYield": 10.5,
  "minimumInvestment": 500,
  "kycRequired": true,
  "highlights": [
    "Новая особенность 1",
    "Новая особенность 2"
  ]
}
```

## 📝 Примеры изменений

### 1. **Изменить цену недвижимости**
```typescript
// В app/api/assets/route.ts
{
  id: "real-estate-1",
  totalValue: 3000000, // Было: 2500000
  pricePerToken: 0.30, // Автоматически пересчитается
  // ...
}
```

### 2. **Добавить новые особенности**
```typescript
// В app/api/assets/[id]/route.ts
highlights: [
  "Премиальное расположение в центре Манхэттена",
  "Современные удобства и панорамные виды", 
  "Стабильная арендная доходность 12.5% годовых",
  "Полностью документированная история владения",
  "Новая особенность", // ← Добавьте здесь
]
```

### 3. **Обновить доходность**
```typescript
{
  expectedYield: 15.0, // Было: 12.5
  annualYield: 15.0,
  monthlyRevenue: 10625, // Пересчитайте: (3000000 * 0.15) / 12
  netIncome: 8125, // monthlyRevenue - operatingExpenses
}
```

## ⚠️ Важные замечания

### 1. **Автоматические расчеты**
- `pricePerToken` = `totalValue` / `tokenSupply`
- `monthlyRevenue` = (`totalValue` * `expectedYield`) / 12 / 100
- `netIncome` = `monthlyRevenue` - `operatingExpenses`

### 2. **Совместимость полей**
Убедитесь, что обновляете оба файла:
- `app/api/assets/route.ts` (базовые данные)
- `app/api/assets/[id]/route.ts` (детальная информация)

### 3. **Перезапуск сервера**
После изменения файлов перезапустите сервер разработки:
```bash
npm run dev
```

## 🚀 Быстрые команды

### Найти актив по ID:
```bash
grep -r "real-estate-1" app/api/assets/
```

### Найти все активы определенного типа:
```bash
grep -r "real_estate" app/api/assets/
```

### Обновить все цены на 10%:
```bash
# Используйте поиск и замену в редакторе
# totalValue: 2500000 → totalValue: 2750000
```

## 📊 Структура данных актива

```typescript
interface Asset {
  id: string                    // Уникальный идентификатор
  title: string                 // Название актива
  description: string           // Описание
  type: string                  // Тип: real_estate, art, music, gaming
  location: string              // Местоположение
  totalValue: number            // Общая стоимость в USD
  tokenSupply: number           // Общее количество токенов
  pricePerToken: number         // Цена за токен (автоматически)
  expectedYield: number         // Ожидаемая доходность %
  minimumInvestment: number     // Минимальная инвестиция USD
  kycRequired: boolean          // Требуется ли KYC
  highlights: string[]          // Ключевые особенности
  images: string[]              // Пути к изображениям
  audio?: string               // Путь к аудиофайлу
  panorama360?: string         // Путь к 360° панораме
}
```

Теперь вы знаете все способы редактирования объявлений! 🎉
