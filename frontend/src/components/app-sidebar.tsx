"use client"

import * as React from "react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  LayoutDashboardIcon,
  UsersIcon,
  GraduationCapIcon,
  BookOpenIcon,
  CalendarIcon,
  IndianRupeeIcon,
  FileChartColumnIcon,
  AwardIcon,
  BookMarkedIcon,
  Settings2Icon,
  CircleHelpIcon,
  SearchIcon,
  SunIcon,
  ClipboardListIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Admin User",
    email: "admin@happinesscoaching.in",
    avatar: "/avatars/admin.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Leads",
      url: "#",
      icon: <UsersIcon />,
    },
    {
      title: "Students",
      url: "#",
      icon: <GraduationCapIcon />,
    },
    {
      title: "Programs",
      url: "#",
      icon: <BookOpenIcon />,
    },
    {
      title: "Assessment",
      url: "/admin/assessment",
      icon: <ClipboardListIcon />,
    },
    {
      title: "Coaching Sessions",
      url: "#",
      icon: <CalendarIcon />,
    },
    {
      title: "Revenue",
      url: "#",
      icon: <IndianRupeeIcon />,
    },
  ],
  navClouds: [
    {
      title: "Reports",
      icon: <FileChartColumnIcon />,
      isActive: true,
      url: "#",
      items: [
        { title: "Monthly Overview", url: "#" },
        { title: "Lead Analytics", url: "#" },
      ],
    },
    {
      title: "Certificates",
      icon: <AwardIcon />,
      url: "#",
      items: [
        { title: "Issued", url: "#" },
        { title: "Pending", url: "#" },
      ],
    },
    {
      title: "Course Materials",
      icon: <BookMarkedIcon />,
      url: "#",
      items: [
        { title: "Active Courses", url: "#" },
        { title: "Archived", url: "#" },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: <Settings2Icon />,
    },
    {
      title: "Help Center",
      url: "#",
      icon: <CircleHelpIcon />,
    },
    {
      title: "Search",
      url: "#",
      icon: <SearchIcon />,
    },
  ],
  documents: [
    {
      name: "Reports",
      url: "#",
      icon: <FileChartColumnIcon />,
    },
    {
      name: "Certificates",
      url: "#",
      icon: <AwardIcon />,
    },
    {
      name: "Course Materials",
      url: "#",
      icon: <BookMarkedIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5!"
            >
              <a href="/admin">
                <SunIcon className="size-5! text-amber-500" />
                <span className="text-base font-semibold">Happiness Academy</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
