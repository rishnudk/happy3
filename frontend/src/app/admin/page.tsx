import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import {
  QuickActions,
  ProgramPerformance,
  EnrollmentFunnel,
  UpcomingSessions,
  RecentEnrollments,
  CoachPerformance,
  NotificationsPanel,
} from "@/components/admin/dashboard-widgets"

export default function AdminDashboardPage() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "280px",
          "--header-height": "72px",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-6 py-6">
            {/* --- KPI Stat Cards --- */}
            <SectionCards />

            {/* --- Quick Actions --- */}
            <QuickActions />

            {/* --- Student Growth Chart --- */}
            <div className="px-4 lg:px-6">
              <ChartAreaInteractive />
            </div>

            {/* --- Program Performance + Enrollment Funnel --- */}
            <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
              <ProgramPerformance />
              <EnrollmentFunnel />
            </div>

            {/* --- Upcoming Sessions --- */}
            <div className="px-4 lg:px-6">
              <UpcomingSessions />
            </div>

            {/* --- Recent Enrollments --- */}
            <div className="px-4 lg:px-6">
              <RecentEnrollments />
            </div>

            {/* --- Coach Performance + Notifications --- */}
            <div className="grid grid-cols-1 gap-4 px-4 lg:grid-cols-2 lg:px-6">
              <CoachPerformance />
              <NotificationsPanel />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
