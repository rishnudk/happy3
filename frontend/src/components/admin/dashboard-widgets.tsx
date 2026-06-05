"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  PlusIcon,
  CalendarPlusIcon,
  UserPlusIcon,
  BookPlusIcon,
  FileTextIcon,
  StarIcon,
  UsersIcon,
  GraduationCapIcon,
  ClockIcon,
  IndianRupeeIcon,
  BellIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  TrendingUpIcon,
} from "lucide-react"

/* =============================================================
   QUICK ACTIONS
   ============================================================= */

export function QuickActions() {
  const actions = [
    { label: "Add Student", icon: UserPlusIcon, primary: true },
    { label: "Schedule Session", icon: CalendarPlusIcon, primary: false },
    { label: "Add Lead", icon: PlusIcon, primary: false },
    { label: "Create Program", icon: BookPlusIcon, primary: false },
    { label: "Generate Report", icon: FileTextIcon, primary: false },
  ]

  return (
    <div className="flex flex-wrap gap-3 px-4 lg:px-6">
      {actions.map((action) => (
        <button
          key={action.label}
          className={`admin-quick-action ${action.primary ? "admin-quick-action-primary" : ""}`}
        >
          <action.icon className="size-4" />
          {action.label}
        </button>
      ))}
    </div>
  )
}

/* =============================================================
   PROGRAM PERFORMANCE TABLE
   ============================================================= */

const programData = [
  {
    program: "Happiness Foundations",
    students: 324,
    completion: 86,
    revenue: "₹4,25,000",
    status: "Active",
  },
  {
    program: "Emotional Intelligence",
    students: 198,
    completion: 82,
    revenue: "₹2,75,000",
    status: "Active",
  },
  {
    program: "Mindfulness Mastery",
    students: 167,
    completion: 91,
    revenue: "₹3,10,000",
    status: "Active",
  },
  {
    program: "Certification Program",
    students: 89,
    completion: 79,
    revenue: "₹5,80,000",
    status: "Active",
  },
]

export function ProgramPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Program Performance</CardTitle>
        <CardDescription>Top performing coaching programs.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Program</TableHead>
              <TableHead className="text-right">Students</TableHead>
              <TableHead className="text-right">Completion %</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {programData.map((row) => (
              <TableRow key={row.program}>
                <TableCell className="font-medium">{row.program}</TableCell>
                <TableCell className="text-right tabular-nums">{row.students}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="h-2 w-16 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${row.completion}%`,
                          background: "var(--admin-green)",
                        }}
                      />
                    </div>
                    <span className="tabular-nums text-muted-foreground">{row.completion}%</span>
                  </div>
                </TableCell>
                <TableCell className="text-right tabular-nums">{row.revenue}</TableCell>
                <TableCell>
                  <span className="status-active inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

/* =============================================================
   ENROLLMENT FUNNEL
   ============================================================= */

const funnelData = [
  { stage: "Website Visitors", value: 24500, color: "var(--admin-blue)" },
  { stage: "Leads", value: 4280, color: "var(--admin-purple)" },
  { stage: "Discovery Calls", value: 1240, color: "var(--admin-orange)" },
  { stage: "Applications", value: 630, color: "var(--admin-green)" },
  { stage: "Enrollments", value: 146, color: "var(--admin-red)" },
]

export function EnrollmentFunnel() {
  const maxValue = funnelData[0].value

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Enrollment Funnel</CardTitle>
        <CardDescription>Understand where prospects are dropping off.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center gap-3">
          {funnelData.map((item, index) => {
            const widthPercent = Math.max(
              (item.value / maxValue) * 100,
              20
            )
            const conversionRate =
              index > 0
                ? ((item.value / funnelData[index - 1].value) * 100).toFixed(1)
                : null

            return (
              <div key={item.stage} className="w-full">
                <div className="mb-1 flex items-center justify-between text-sm">
                  <span className="font-medium" style={{ color: "var(--admin-text-primary)" }}>
                    {item.stage}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="tabular-nums font-semibold" style={{ color: "var(--admin-text-primary)" }}>
                      {item.value.toLocaleString()}
                    </span>
                    {conversionRate && (
                      <span className="text-xs tabular-nums" style={{ color: "var(--admin-text-muted)" }}>
                        ({conversionRate}%)
                      </span>
                    )}
                  </div>
                </div>
                <div
                  className="funnel-stage flex h-9 items-center justify-center"
                  style={{
                    width: `${widthPercent}%`,
                    background: item.color,
                    opacity: 0.85,
                    margin: "0 auto",
                  }}
                />
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

/* =============================================================
   UPCOMING SESSIONS TABLE
   ============================================================= */

const sessionsData = [
  {
    session: "Emotional Awareness Workshop",
    coach: "Coach Anita",
    date: "Jul 12",
    time: "10:00 AM",
    students: 42,
    status: "Scheduled",
  },
  {
    session: "Mindfulness Mastery",
    coach: "Coach Vikram",
    date: "Jul 12",
    time: "03:00 PM",
    students: 31,
    status: "Scheduled",
  },
  {
    session: "Happiness Foundations",
    coach: "Coach Anita",
    date: "Jul 13",
    time: "11:00 AM",
    students: 56,
    status: "Scheduled",
  },
]

export function UpcomingSessions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Upcoming Sessions</CardTitle>
        <CardDescription>Scheduled coaching sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Session</TableHead>
              <TableHead>Coach</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead className="text-right">Students</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sessionsData.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{row.session}</TableCell>
                <TableCell>{row.coach}</TableCell>
                <TableCell className="tabular-nums">{row.date}</TableCell>
                <TableCell className="tabular-nums">{row.time}</TableCell>
                <TableCell className="text-right tabular-nums">{row.students}</TableCell>
                <TableCell>
                  <span className="status-scheduled inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

/* =============================================================
   RECENT ENROLLMENTS TABLE
   ============================================================= */

const enrollmentData = [
  {
    student: "Rahul Nair",
    program: "Happiness Foundations",
    source: "Website",
    date: "Jul 10",
    coach: "Coach Anita",
    fee: "₹12,500",
    status: "Active",
  },
  {
    student: "Priya Menon",
    program: "Mindfulness Mastery",
    source: "Instagram",
    date: "Jul 09",
    coach: "Coach Vikram",
    fee: "₹18,000",
    status: "Active",
  },
  {
    student: "Arjun Das",
    program: "Certification Program",
    source: "Referral",
    date: "Jul 08",
    coach: "Coach Anita",
    fee: "₹45,000",
    status: "Active",
  },
]

export function RecentEnrollments() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Recent Enrollments</CardTitle>
        <CardDescription>Latest student enrollments</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Program</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Coach</TableHead>
              <TableHead className="text-right">Fee</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollmentData.map((row, i) => (
              <TableRow key={i}>
                <TableCell className="font-medium">{row.student}</TableCell>
                <TableCell>{row.program}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="font-normal">
                    {row.source}
                  </Badge>
                </TableCell>
                <TableCell className="tabular-nums">{row.date}</TableCell>
                <TableCell>{row.coach}</TableCell>
                <TableCell className="text-right tabular-nums font-medium">{row.fee}</TableCell>
                <TableCell>
                  <span className="status-active inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium">
                    {row.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

/* =============================================================
   COACH PERFORMANCE TABLE
   ============================================================= */

const coachData = [
  {
    coach: "Coach Anita",
    students: 542,
    sessions: 68,
    rating: 4.9,
    revenue: "₹5.2L",
  },
  {
    coach: "Coach Vikram",
    students: 438,
    sessions: 54,
    rating: 4.8,
    revenue: "₹4.6L",
  },
  {
    coach: "Coach Sarah",
    students: 304,
    sessions: 39,
    rating: 4.9,
    revenue: "₹2.7L",
  },
]

function RatingStars({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <StarIcon
          key={i}
          className="size-3.5"
          style={{
            fill: i < fullStars || (i === fullStars && hasHalf)
              ? "var(--admin-orange)"
              : "transparent",
            color: i < fullStars || (i === fullStars && hasHalf)
              ? "var(--admin-orange)"
              : "var(--admin-text-muted)",
          }}
        />
      ))}
      <span className="ml-1.5 text-sm tabular-nums font-medium">{rating}</span>
    </div>
  )
}

export function CoachPerformance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Coach Performance</CardTitle>
        <CardDescription>Coach metrics this period</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Coach</TableHead>
              <TableHead className="text-right">Students</TableHead>
              <TableHead className="text-right">Sessions</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead className="text-right">Revenue</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coachData.map((row) => (
              <TableRow key={row.coach}>
                <TableCell className="font-medium">{row.coach}</TableCell>
                <TableCell className="text-right tabular-nums">{row.students}</TableCell>
                <TableCell className="text-right tabular-nums">{row.sessions}</TableCell>
                <TableCell>
                  <RatingStars rating={row.rating} />
                </TableCell>
                <TableCell className="text-right tabular-nums font-medium">{row.revenue}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

/* =============================================================
   NOTIFICATIONS PANEL
   ============================================================= */

const notifications = [
  {
    icon: UsersIcon,
    title: "12 new enrollments today",
    time: "2 min ago",
    unread: true,
  },
  {
    icon: ClockIcon,
    title: "Mindfulness Mastery starts in 1 hour",
    time: "15 min ago",
    unread: true,
  },
  {
    icon: CheckCircleIcon,
    title: "Coach Anita completed 3 sessions",
    time: "1 hour ago",
    unread: false,
  },
  {
    icon: TrendingUpIcon,
    title: "Monthly enrollment target reached",
    time: "2 hours ago",
    unread: false,
  },
  {
    icon: IndianRupeeIcon,
    title: "New payment received from Rahul Nair",
    time: "3 hours ago",
    unread: false,
  },
  {
    icon: AlertCircleIcon,
    title: "Certification Program reached 90% capacity",
    time: "5 hours ago",
    unread: false,
  },
]

export function NotificationsPanel() {
  return (
    <Card
      style={{
        background: "var(--admin-surface-secondary)",
        borderRadius: "var(--admin-radius-lg)",
        border: "1px solid var(--admin-border)",
      }}
    >
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Notifications</CardTitle>
        <CardDescription>
          {notifications.filter((n) => n.unread).length} unread
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        {notifications.map((notif, i) => (
          <div key={i} className="notification-item">
            {notif.unread && <div className="notification-unread-dot" />}
            <div
              className="flex size-9 shrink-0 items-center justify-center rounded-lg"
              style={{
                background: notif.unread ? "var(--admin-blue)" : "var(--admin-surface)",
                color: notif.unread ? "#fff" : "var(--admin-text-muted)",
                border: notif.unread ? "none" : "1px solid var(--admin-border)",
              }}
            >
              <notif.icon className="size-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p
                className="text-sm leading-snug"
                style={{
                  fontWeight: notif.unread ? 600 : 400,
                  color: "var(--admin-text-primary)",
                }}
              >
                {notif.title}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "var(--admin-text-muted)" }}>
                {notif.time}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
