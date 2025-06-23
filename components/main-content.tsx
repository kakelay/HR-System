"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Eye,
  AlertCircle,
  DollarSign,
  Percent,
  Target,
} from "lucide-react";
import { PerformanceCharts } from "./charts BI/performance-charts";

const performanceData = [
  {
    description: "Net Profit",
    mar25: "$410,242",
    apr25: "$493,696",
    bp2025: "$2,420,107",
    trend: "up",
    change: "+20.3%",
    status: "good",
  },
  {
    description: "ROA",
    mar25: "0.22%",
    apr25: "0.21%",
    bp2025: "0.33%",
    trend: "down",
    change: "-4.5%",
    status: "warning",
  },
  {
    description: "ROE",
    mar25: "1.20%",
    apr25: "1.10%",
    bp2025: "1.78%",
    trend: "down",
    change: "-8.3%",
    status: "warning",
  },
  {
    description: "Loan Portfolio",
    mar25: "$45.2M",
    apr25: "$47.8M",
    bp2025: "$52.1M",
    trend: "up",
    change: "+5.8%",
    status: "good",
  },
  {
    description: "NPL Ratio",
    mar25: "2.1%",
    apr25: "1.9%",
    bp2025: "1.5%",
    trend: "up",
    change: "-9.5%",
    status: "excellent",
  },
];

const kpiCards = [
  {
    title: "Total Revenue",
    value: "$2.4M",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    title: "Active Loans",
    value: "15,847",
    change: "+8.2%",
    trend: "up",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Default Rate",
    value: "1.9%",
    change: "-0.3%",
    trend: "down",
    icon: AlertCircle,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
  },
  {
    title: "ROI",
    value: "18.5%",
    change: "+2.1%",
    trend: "up",
    icon: Percent,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

export function MainContent() {
  const [selectedPeriod, setSelectedPeriod] = useState("current");
  const [selectedView, setSelectedView] = useState("table");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-100 text-green-800 border-green-200";
      case "good":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "warning":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "danger":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getTrendIcon = (trend: string, change: string) => {
    const isPositive = change.startsWith("+");
    if (trend === "up") {
      return (
        <TrendingUp
          className={`h-4 w-4 ${
            isPositive ? "text-green-500" : "text-red-500"
          }`}
        />
      );
    }
    return (
      <TrendingDown
        className={`h-4 w-4 ${isPositive ? "text-green-500" : "text-red-500"}`}
      />
    );
  };

  return (
    <div className="space-y-6">
      {/* Announcements */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Latest Announcements
            </CardTitle>
            <Badge
              variant="secondary"
              className="bg-orange-100 text-orange-800"
            >
              2 New
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-2">
                    អនុសាសន៍ ចំ រៀន ទេ ទូលបានការអនុវត្ត
                  </h3>
                  <p className="text-sm opacity-90">ប្រាក់ដុល</p>
                </div>
                <Badge className="bg-yellow-500 text-black">Priority</Badge>
              </div>
              <div className="flex items-center gap-4 text-sm opacity-75">
                <span>📅 Posted: Dec 15, 2024</span>
                <span>👁️ 1,247 views</span>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 right-0 text-6xl opacity-20">
              🏆
            </div>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              <p className="mb-2">
                អនុសាសន៍ ចំ រៀន ទេ ទូលបានការអនុវត្តនិងការអនុវត្ត...
              </p>
              <a
                href="#"
                className="text-blue-600 hover:underline flex items-center gap-1"
              >
                <Eye className="h-4 w-4" />
                https://intranet.NETOcambodia.com
              </a>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {kpi.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {kpi.value}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {getTrendIcon(kpi.trend, kpi.change)}
                    <span
                      className={`text-sm font-medium ${
                        kpi.change.startsWith("+")
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                  <kpi.icon className={`h-6 w-6 ${kpi.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Dashboard */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-blue-600">
                Performance Analytics Dashboard
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <SelectTrigger className="w-[140px]">
                  <Calendar className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current Period</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="custom">Custom Range</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedView} onValueChange={setSelectedView}>
                <SelectTrigger className="w-[120px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="table">Table View</SelectItem>
                  <SelectItem value="chart">Chart View</SelectItem>
                  <SelectItem value="cards">Card View</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2"
              >
                <RefreshCw
                  className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-purple-600 text-lg">
                Achievement Summary 2025
              </h3>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200"
              >
                Last Updated: 2 hours ago
              </Badge>
            </div>
          </div>

          {selectedView === "table" && (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">METRICS</TableHead>
                    <TableHead className="font-semibold">
                      Mar/25 (Unaudited)
                    </TableHead>
                    <TableHead className="font-semibold">
                      Apr/25 (Unaudited)
                    </TableHead>
                    <TableHead className="font-semibold">
                      BP2025 Target
                    </TableHead>
                    <TableHead className="font-semibold">Trend</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {performanceData.map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">
                        {row.description}
                      </TableCell>
                      <TableCell className="font-mono">{row.mar25}</TableCell>
                      <TableCell className="font-mono">{row.apr25}</TableCell>
                      <TableCell className="font-mono font-semibold">
                        {row.bp2025}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTrendIcon(row.trend, row.change)}
                          <span
                            className={`text-sm font-medium ${
                              row.change.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {row.change}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={getStatusColor(row.status)}
                          variant="outline"
                        >
                          {row.status.charAt(0).toUpperCase() +
                            row.status.slice(1)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {selectedView === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {performanceData.map((item, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900">
                        {item.description}
                      </h4>
                      <Badge
                        className={getStatusColor(item.status)}
                        variant="outline"
                      >
                        {item.status}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Mar/25:</span>
                        <span className="font-mono">{item.mar25}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Apr/25:</span>
                        <span className="font-mono">{item.apr25}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold">
                        <span className="text-gray-600">Target:</span>
                        <span className="font-mono">{item.bp2025}</span>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t">
                        <div className="flex items-center gap-1">
                          {getTrendIcon(item.trend, item.change)}
                          <span
                            className={`text-sm font-medium ${
                              item.change.startsWith("+")
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {item.change}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {selectedView === "chart" && (
            <PerformanceCharts selectedPeriod={selectedPeriod} />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
