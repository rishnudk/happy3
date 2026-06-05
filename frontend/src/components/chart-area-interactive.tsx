"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import { useIsMobile } from "@/hooks/use-mobile"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

export const description = "Student Growth & Enrollment Trends"

/* ----- Chart data (static, spec-driven) ----- */
const chartData = [
  { date: "2024-01-01", active: 890, enrollments: 45, completions: 12 },
  { date: "2024-02-01", active: 920, enrollments: 52, completions: 18 },
  { date: "2024-03-01", active: 965, enrollments: 61, completions: 22 },
  { date: "2024-04-01", active: 1010, enrollments: 58, completions: 28 },
  { date: "2024-05-01", active: 1068, enrollments: 72, completions: 34 },
  { date: "2024-06-01", active: 1125, enrollments: 84, completions: 40 },
  { date: "2024-07-01", active: 1180, enrollments: 92, completions: 45 },
  { date: "2024-08-01", active: 1198, enrollments: 78, completions: 52 },
  { date: "2024-09-01", active: 1210, enrollments: 65, completions: 58 },
  { date: "2024-10-01", active: 1225, enrollments: 88, completions: 42 },
  { date: "2024-11-01", active: 1254, enrollments: 102, completions: 38 },
  { date: "2024-12-01", active: 1284, enrollments: 146, completions: 48 },
  /* Extend for daily views */
  { date: "2024-12-01", active: 1252, enrollments: 110, completions: 35 },
  { date: "2024-12-03", active: 1255, enrollments: 112, completions: 36 },
  { date: "2024-12-05", active: 1258, enrollments: 116, completions: 37 },
  { date: "2024-12-08", active: 1260, enrollments: 118, completions: 38 },
  { date: "2024-12-10", active: 1263, enrollments: 120, completions: 39 },
  { date: "2024-12-12", active: 1265, enrollments: 124, completions: 40 },
  { date: "2024-12-15", active: 1268, enrollments: 128, completions: 41 },
  { date: "2024-12-18", active: 1271, enrollments: 132, completions: 42 },
  { date: "2024-12-20", active: 1274, enrollments: 136, completions: 44 },
  { date: "2024-12-22", active: 1277, enrollments: 138, completions: 45 },
  { date: "2024-12-25", active: 1280, enrollments: 142, completions: 46 },
  { date: "2024-12-28", active: 1282, enrollments: 144, completions: 47 },
  { date: "2024-12-31", active: 1284, enrollments: 146, completions: 48 },
]

const chartConfig = {
  active: {
    label: "Active Students",
    color: "var(--admin-blue, var(--chart-1))",
  },
  enrollments: {
    label: "New Enrollments",
    color: "var(--admin-green, var(--chart-2))",
  },
  completions: {
    label: "Program Completions",
    color: "var(--admin-purple, var(--chart-4))",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("30d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-12-31")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    } else if (timeRange === "12m") {
      daysToSubtract = 365
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Student Growth & Enrollment Trends</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Track academy growth across enrollments and active students.
          </span>
          <span className="@[540px]/card:hidden">Growth & enrollments</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="7d">Last 7 Days</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 Days</ToggleGroupItem>
            <ToggleGroupItem value="90d">Last 90 Days</ToggleGroupItem>
            <ToggleGroupItem value="12m">Last 12 Months</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 90 Days" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="7d" className="rounded-lg">Last 7 Days</SelectItem>
              <SelectItem value="30d" className="rounded-lg">Last 30 Days</SelectItem>
              <SelectItem value="90d" className="rounded-lg">Last 90 Days</SelectItem>
              <SelectItem value="12m" className="rounded-lg">Last 12 Months</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[280px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillActive" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-active)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-active)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillEnrollments" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-enrollments)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-enrollments)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillCompletions" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-completions)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-completions)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="completions"
              type="monotone"
              fill="url(#fillCompletions)"
              stroke="var(--color-completions)"
              strokeWidth={2}
            />
            <Area
              dataKey="enrollments"
              type="monotone"
              fill="url(#fillEnrollments)"
              stroke="var(--color-enrollments)"
              strokeWidth={2}
            />
            <Area
              dataKey="active"
              type="monotone"
              fill="url(#fillActive)"
              stroke="var(--color-active)"
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
