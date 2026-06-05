"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  UsersIcon,
  GraduationCapIcon,
  CalendarIcon,
  IndianRupeeIcon,
  TrendingUpIcon,
} from "lucide-react"

const kpiCards = [
  {
    title: "Active Students",
    value: "1,284",
    growth: "+12.4%",
    description: "Students currently enrolled",
    icon: UsersIcon,
    accentColor: "var(--admin-blue)",
    accentBg: "rgba(79, 140, 255, 0.1)",
  },
  {
    title: "New Enrollments",
    value: "146",
    growth: "+18.7%",
    description: "Joined this month",
    icon: GraduationCapIcon,
    accentColor: "var(--admin-green)",
    accentBg: "rgba(54, 194, 117, 0.1)",
  },
  {
    title: "Upcoming Sessions",
    value: "28",
    growth: "6 Today",
    description: "Scheduled coaching sessions",
    icon: CalendarIcon,
    accentColor: "var(--admin-orange)",
    accentBg: "rgba(246, 166, 35, 0.1)",
    isNeutralGrowth: true,
  },
  {
    title: "Monthly Revenue",
    value: "₹12,45,000",
    growth: "+18.2%",
    description: "Course sales and coaching fees",
    icon: IndianRupeeIcon,
    accentColor: "var(--admin-purple)",
    accentBg: "rgba(167, 139, 250, 0.1)",
  },
]

export function SectionCards() {
  return (
    <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:px-6 xl:grid-cols-4">
      {kpiCards.map((kpi) => (
        <Card
          key={kpi.title}
          className="relative overflow-hidden transition-all duration-200 hover:-translate-y-0.5"
          style={{
            padding: "24px",
            borderRadius: "var(--admin-radius-lg)",
            border: "1px solid var(--admin-border)",
            background: "var(--admin-surface)",
          }}
        >
          {/* Icon badge */}
          <div
            className="mb-4 flex size-11 items-center justify-center rounded-xl"
            style={{
              background: kpi.accentBg,
              color: kpi.accentColor,
            }}
          >
            <kpi.icon className="size-5" />
          </div>

          {/* Large number */}
          <div className="stat-number" style={{ color: "var(--admin-text-primary)" }}>
            {kpi.value}
          </div>

          {/* Label + growth row */}
          <div className="mt-2 flex items-center justify-between">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--admin-text-secondary)" }}
            >
              {kpi.title}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold tabular-nums"
              style={{
                background: kpi.isNeutralGrowth
                  ? kpi.accentBg
                  : "rgba(54, 194, 117, 0.1)",
                color: kpi.isNeutralGrowth
                  ? kpi.accentColor
                  : "var(--admin-green)",
              }}
            >
              {!kpi.isNeutralGrowth && <TrendingUpIcon className="size-3" />}
              {kpi.growth}
            </span>
          </div>

          {/* Description */}
          <p
            className="mt-1 text-xs"
            style={{ color: "var(--admin-text-muted)" }}
          >
            {kpi.description}
          </p>
        </Card>
      ))}
    </div>
  )
}
