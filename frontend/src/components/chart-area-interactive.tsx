"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

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

export const description = "Website visitors vs course sign-ups"

const chartData = [
  { date: "2024-04-01", visitors: 320, signups: 18 },
  { date: "2024-04-02", visitors: 280, signups: 12 },
  { date: "2024-04-03", visitors: 410, signups: 24 },
  { date: "2024-04-04", visitors: 390, signups: 22 },
  { date: "2024-04-05", visitors: 520, signups: 35 },
  { date: "2024-04-06", visitors: 340, signups: 15 },
  { date: "2024-04-07", visitors: 290, signups: 10 },
  { date: "2024-04-08", visitors: 450, signups: 28 },
  { date: "2024-04-09", visitors: 380, signups: 20 },
  { date: "2024-04-10", visitors: 500, signups: 32 },
  { date: "2024-04-11", visitors: 470, signups: 30 },
  { date: "2024-04-12", visitors: 360, signups: 19 },
  { date: "2024-04-13", visitors: 410, signups: 25 },
  { date: "2024-04-14", visitors: 330, signups: 14 },
  { date: "2024-04-15", visitors: 440, signups: 27 },
  { date: "2024-04-16", visitors: 510, signups: 33 },
  { date: "2024-04-17", visitors: 490, signups: 31 },
  { date: "2024-04-18", visitors: 420, signups: 26 },
  { date: "2024-04-19", visitors: 380, signups: 21 },
  { date: "2024-04-20", visitors: 310, signups: 13 },
  { date: "2024-04-21", visitors: 270, signups: 9 },
  { date: "2024-04-22", visitors: 460, signups: 29 },
  { date: "2024-04-23", visitors: 530, signups: 36 },
  { date: "2024-04-24", visitors: 480, signups: 30 },
  { date: "2024-04-25", visitors: 420, signups: 25 },
  { date: "2024-04-26", visitors: 350, signups: 17 },
  { date: "2024-04-27", visitors: 390, signups: 22 },
  { date: "2024-04-28", visitors: 440, signups: 28 },
  { date: "2024-04-29", visitors: 510, signups: 34 },
  { date: "2024-04-30", visitors: 490, signups: 31 },
  { date: "2024-05-01", visitors: 380, signups: 20 },
  { date: "2024-05-02", visitors: 420, signups: 26 },
  { date: "2024-05-03", visitors: 460, signups: 29 },
  { date: "2024-05-04", visitors: 540, signups: 38 },
  { date: "2024-05-05", visitors: 580, signups: 42 },
  { date: "2024-05-06", visitors: 520, signups: 35 },
  { date: "2024-05-07", visitors: 450, signups: 27 },
  { date: "2024-05-08", visitors: 390, signups: 22 },
  { date: "2024-05-09", visitors: 430, signups: 26 },
  { date: "2024-05-10", visitors: 500, signups: 33 },
  { date: "2024-05-11", visitors: 470, signups: 30 },
  { date: "2024-05-12", visitors: 410, signups: 24 },
  { date: "2024-05-13", visitors: 380, signups: 21 },
  { date: "2024-05-14", visitors: 550, signups: 39 },
  { date: "2024-05-15", visitors: 520, signups: 36 },
  { date: "2024-05-16", visitors: 480, signups: 31 },
  { date: "2024-05-17", visitors: 560, signups: 40 },
  { date: "2024-05-18", visitors: 440, signups: 27 },
  { date: "2024-05-19", visitors: 370, signups: 19 },
  { date: "2024-05-20", visitors: 340, signups: 16 },
  { date: "2024-05-21", visitors: 310, signups: 14 },
  { date: "2024-05-22", visitors: 360, signups: 18 },
  { date: "2024-05-23", visitors: 450, signups: 28 },
  { date: "2024-05-24", visitors: 490, signups: 32 },
  { date: "2024-05-25", visitors: 430, signups: 25 },
  { date: "2024-05-26", visitors: 380, signups: 20 },
  { date: "2024-05-27", visitors: 530, signups: 37 },
  { date: "2024-05-28", visitors: 460, signups: 29 },
  { date: "2024-05-29", visitors: 400, signups: 23 },
  { date: "2024-05-30", visitors: 510, signups: 34 },
  { date: "2024-05-31", visitors: 470, signups: 30 },
  { date: "2024-06-01", visitors: 420, signups: 26 },
  { date: "2024-06-02", visitors: 560, signups: 41 },
  { date: "2024-06-03", visitors: 390, signups: 22 },
  { date: "2024-06-04", visitors: 530, signups: 36 },
  { date: "2024-06-05", visitors: 350, signups: 17 },
  { date: "2024-06-06", visitors: 480, signups: 31 },
  { date: "2024-06-07", visitors: 510, signups: 34 },
  { date: "2024-06-08", visitors: 440, signups: 27 },
  { date: "2024-06-09", visitors: 570, signups: 42 },
  { date: "2024-06-10", visitors: 400, signups: 24 },
  { date: "2024-06-11", visitors: 360, signups: 18 },
  { date: "2024-06-12", visitors: 590, signups: 44 },
  { date: "2024-06-13", visitors: 340, signups: 16 },
  { date: "2024-06-14", visitors: 520, signups: 36 },
  { date: "2024-06-15", visitors: 460, signups: 29 },
  { date: "2024-06-16", visitors: 500, signups: 33 },
  { date: "2024-06-17", visitors: 580, signups: 43 },
  { date: "2024-06-18", visitors: 370, signups: 19 },
  { date: "2024-06-19", visitors: 490, signups: 32 },
  { date: "2024-06-20", visitors: 540, signups: 38 },
  { date: "2024-06-21", visitors: 410, signups: 25 },
  { date: "2024-06-22", visitors: 470, signups: 30 },
  { date: "2024-06-23", visitors: 600, signups: 46 },
  { date: "2024-06-24", visitors: 380, signups: 21 },
  { date: "2024-06-25", visitors: 420, signups: 26 },
  { date: "2024-06-26", visitors: 550, signups: 39 },
  { date: "2024-06-27", visitors: 570, signups: 41 },
  { date: "2024-06-28", visitors: 430, signups: 27 },
  { date: "2024-06-29", visitors: 390, signups: 22 },
  { date: "2024-06-30", visitors: 560, signups: 40 },
]

const chartConfig = {
  visitors: {
    label: "Website Visitors",
    color: "var(--primary)",
  },
  signups: {
    label: "Course Sign-ups",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = React.useState("90d")

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d")
    }
  }, [isMobile])

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Visitors & Sign-ups</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Website visitors vs course sign-ups over time
          </span>
          <span className="@[540px]/card:hidden">Visitors & sign-ups</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:px-4! @[767px]/card:flex"
          >
            <ToggleGroupItem value="90d">Last 3 months</ToggleGroupItem>
            <ToggleGroupItem value="30d">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="7d">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Last 3 months
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillVisitors" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-visitors)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSignups" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-signups)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-signups)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
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
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="signups"
              type="natural"
              fill="url(#fillSignups)"
              stroke="var(--color-signups)"
              stackId="a"
            />
            <Area
              dataKey="visitors"
              type="natural"
              fill="url(#fillVisitors)"
              stroke="var(--color-visitors)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
