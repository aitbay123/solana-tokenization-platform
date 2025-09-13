"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AssetAnalyticsProps {
  assetId: string
}

// Mock data for charts
const priceHistory = [
  { month: "Янв", price: 118.5 },
  { month: "Фев", price: 120.25 },
  { month: "Мар", price: 122.1 },
  { month: "Апр", price: 123.75 },
  { month: "Май", price: 125.5 },
]

const yieldHistory = [
  { month: "Янв", yield: 8.2 },
  { month: "Фев", yield: 8.3 },
  { month: "Мар", price: 8.4 },
  { month: "Апр", yield: 8.5 },
  { month: "Май", yield: 8.5 },
]

const investorDistribution = [
  { name: "Институциональные", value: 45, color: "#059669" },
  { name: "Частные инвесторы", value: 35, color: "#10b981" },
  { name: "Фонды", value: 20, color: "#34d399" },
]

export function AssetAnalytics({ assetId }: AssetAnalyticsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Аналитика и статистика</CardTitle>
        <CardDescription>Детальная информация о производительности актива</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="price" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="price">Цена токена</TabsTrigger>
            <TabsTrigger value="yield">Доходность</TabsTrigger>
            <TabsTrigger value="investors">Инвесторы</TabsTrigger>
          </TabsList>

          <TabsContent value="price" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={priceHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`$${value}`, "Цена токена"]}
                    labelStyle={{ color: "var(--foreground)" }}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#059669"
                    strokeWidth={2}
                    dot={{ fill: "#059669", strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">+5.9%</div>
                <div className="text-sm text-muted-foreground">Рост за 5 месяцев</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">$125.50</div>
                <div className="text-sm text-muted-foreground">Текущая цена</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">$118.50</div>
                <div className="text-sm text-muted-foreground">Стартовая цена</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="yield" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yieldHistory}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Доходность"]}
                    labelStyle={{ color: "var(--foreground)" }}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="yield" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-green-600">8.5%</div>
                <div className="text-sm text-muted-foreground">Текущая доходность</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">8.35%</div>
                <div className="text-sm text-muted-foreground">Средняя за период</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">+0.3%</div>
                <div className="text-sm text-muted-foreground">Рост доходности</div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="investors" className="space-y-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={investorDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {investorDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Доля"]}
                    labelStyle={{ color: "var(--foreground)" }}
                    contentStyle={{
                      backgroundColor: "var(--background)",
                      border: "1px solid var(--border)",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-3">
              {investorDistribution.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: item.color }} />
                    <span className="text-foreground">{item.name}</span>
                  </div>
                  <span className="font-medium text-foreground">{item.value}%</span>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
