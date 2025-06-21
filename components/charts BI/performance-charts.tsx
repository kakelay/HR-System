"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, LineChart, PieChart, TrendingUp, Settings, Maximize2, Download } from "lucide-react"

// Mock chart data
const performanceChartData = {
  months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  netProfit: [380000, 420000, 410000, 493000, 520000, 580000],
  roa: [0.18, 0.2, 0.22, 0.21, 0.23, 0.25],
  roe: [1.05, 1.15, 1.2, 1.1, 1.25, 1.35],
  loanPortfolio: [42.1, 43.8, 45.2, 47.8, 49.5, 52.1],
}

const pieChartData = [
  { name: "Personal Loans", value: 35, color: "#8B5CF6" },
  { name: "Business Loans", value: 28, color: "#06B6D4" },
  { name: "Agricultural Loans", value: 22, color: "#10B981" },
  { name: "Housing Loans", value: 15, color: "#F59E0B" },
]

const regionData = [
  { region: "Phnom Penh", loans: 4200, revenue: 850000 },
  { region: "Siem Reap", loans: 3100, revenue: 620000 },
  { region: "Battambang", loans: 2800, revenue: 560000 },
  { region: "Kampong Cham", loans: 2400, revenue: 480000 },
  { region: "Kandal", loans: 3300, revenue: 660000 },
]

interface PerformanceChartsProps {
  selectedPeriod: string
}

export function PerformanceCharts({ selectedPeriod }: PerformanceChartsProps) {
  const [selectedChart, setSelectedChart] = useState("overview")
  const [chartType, setChartType] = useState("line")

  // Simple Line Chart Component
  const LineChartComponent = ({ data, label, color = "#8B5CF6" }: any) => {
    const maxValue = Math.max(...data)
    const minValue = Math.min(...data)
    const range = maxValue - minValue

    return (
      <div className="relative h-64 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700">{label}</h4>
          <Badge variant="outline" style={{ color }}>
            {data[data.length - 1]}
          </Badge>
        </div>
        <div className="relative h-48">
          <svg className="w-full h-full" viewBox="0 0 400 200">
            {/* Grid lines */}
            {[0, 1, 2, 3, 4].map((i) => (
              <line
                key={i}
                x1="0"
                y1={i * 40}
                x2="400"
                y2={i * 40}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
            ))}

            {/* Chart line */}
            <polyline
              fill="none"
              stroke={color}
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={data
                .map((value: number, index: number) => {
                  const x = (index / (data.length - 1)) * 380 + 10
                  const y = 180 - ((value - minValue) / range) * 160
                  return `${x},${y}`
                })
                .join(" ")}
            />

            {/* Data points */}
            {data.map((value: number, index: number) => {
              const x = (index / (data.length - 1)) * 380 + 10
              const y = 180 - ((value - minValue) / range) * 160
              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r="4"
                  fill={color}
                  className="hover:r-6 transition-all cursor-pointer"
                />
              )
            })}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between mt-2 text-xs text-gray-500">
            {performanceChartData.months.map((month) => (
              <span key={month}>{month}</span>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // Simple Bar Chart Component
  const BarChartComponent = ({ data, labels, label, color = "#8B5CF6" }: any) => {
    const maxValue = Math.max(...data)

    return (
      <div className="relative h-64 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700">{label}</h4>
          <Badge variant="outline" style={{ color }}>
            Total: {data.reduce((a: number, b: number) => a + b, 0).toLocaleString()}
          </Badge>
        </div>
        <div className="flex items-end justify-between h-48 gap-2">
          {data.map((value: number, index: number) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div
                className="w-full rounded-t-md transition-all duration-300 hover:opacity-80 cursor-pointer relative group"
                style={{
                  height: `${(value / maxValue) * 180}px`,
                  backgroundColor: color,
                  minHeight: "4px",
                }}
              >
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {value.toLocaleString()}
                </div>
              </div>
              <span className="text-xs text-gray-500 mt-2 text-center">{labels[index]}</span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Simple Pie Chart Component
  const PieChartComponent = ({ data, label }: any) => {
    const total = data.reduce((sum: number, item: any) => sum + item.value, 0)
    let currentAngle = 0

    return (
      <div className="relative h-64 bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-700">{label}</h4>
          <Badge variant="outline">Total: 100%</Badge>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="relative">
            <svg width="180" height="180" className="transform -rotate-90">
              {data.map((item: any, index: number) => {
                const percentage = (item.value / total) * 100
                const angle = (percentage / 100) * 360
                const startAngle = currentAngle
                const endAngle = currentAngle + angle
                currentAngle += angle

                const startAngleRad = (startAngle * Math.PI) / 180
                const endAngleRad = (endAngle * Math.PI) / 180

                const largeArcFlag = angle > 180 ? 1 : 0
                const x1 = 90 + 70 * Math.cos(startAngleRad)
                const y1 = 90 + 70 * Math.sin(startAngleRad)
                const x2 = 90 + 70 * Math.cos(endAngleRad)
                const y2 = 90 + 70 * Math.sin(endAngleRad)

                const pathData = [`M 90 90`, `L ${x1} ${y1}`, `A 70 70 0 ${largeArcFlag} 1 ${x2} ${y2}`, `Z`].join(" ")

                return (
                  <path
                    key={index}
                    d={pathData}
                    fill={item.color}
                    className="hover:opacity-80 cursor-pointer transition-opacity"
                  />
                )
              })}
            </svg>

            {/* Legend */}
            <div className="absolute -right-32 top-0 space-y-2">
              {data.map((item: any, index: number) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600">{item.name}</span>
                  <span className="font-semibold">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Chart Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-4">
          <Select value={selectedChart} onValueChange={setSelectedChart}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Performance Overview</SelectItem>
              <SelectItem value="financial">Financial Metrics</SelectItem>
              <SelectItem value="portfolio">Loan Portfolio</SelectItem>
              <SelectItem value="regional">Regional Analysis</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings className="h-4 w-4 mr-2" />
            Configure
          </Button>
          <Button variant="outline" size="sm">
            <Maximize2 className="h-4 w-4 mr-2" />
            Fullscreen
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Chart Tabs */}
      <Tabs value={selectedChart} onValueChange={setSelectedChart} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="financial" className="flex items-center gap-2">
            <LineChart className="h-4 w-4" />
            Financial
          </TabsTrigger>
          <TabsTrigger value="portfolio" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            Portfolio
          </TabsTrigger>
          <TabsTrigger value="regional" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Regional
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChartComponent data={performanceChartData.netProfit} label="Net Profit Trend ($)" color="#10B981" />
            <LineChartComponent data={performanceChartData.loanPortfolio} label="Loan Portfolio (M$)" color="#8B5CF6" />
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LineChartComponent data={performanceChartData.roa} label="Return on Assets (%)" color="#06B6D4" />
            <LineChartComponent data={performanceChartData.roe} label="Return on Equity (%)" color="#F59E0B" />
          </div>
        </TabsContent>

        <TabsContent value="portfolio" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <PieChartComponent data={pieChartData} label="Loan Distribution by Type" />
            <BarChartComponent
              data={pieChartData.map((item) => item.value)}
              labels={pieChartData.map((item) => item.name)}
              label="Portfolio Breakdown (%)"
              color="#8B5CF6"
            />
          </div>
        </TabsContent>

        <TabsContent value="regional" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <BarChartComponent
              data={regionData.map((item) => item.loans)}
              labels={regionData.map((item) => item.region)}
              label="Active Loans by Region"
              color="#10B981"
            />
            <BarChartComponent
              data={regionData.map((item) => item.revenue)}
              labels={regionData.map((item) => item.region)}
              label="Revenue by Region ($)"
              color="#F59E0B"
            />
          </div>
        </TabsContent>
      </Tabs>

      {/* Chart Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Key Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">📈 Growth Trend</h4>
              <p className="text-sm text-green-700">
                Net profit shows consistent upward trend with 20.3% growth over the period.
              </p>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Watch Area</h4>
              <p className="text-sm text-yellow-700">
                ROA and ROE showing slight decline - monitor operational efficiency.
              </p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">🎯 Opportunity</h4>
              <p className="text-sm text-blue-700">
                Personal loans dominate portfolio - consider diversification strategies.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
