"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/admin/theme-toggle"
import { BellIcon, SearchIcon } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

function getGreeting(): string {
  const hour = new Date().getHours()
  if (hour < 12) return "Good morning"
  if (hour < 17) return "Good afternoon"
  return "Good evening"
}

export function SiteHeader({ title = "Dashboard" }: { title?: string }) {
  return (
    <header
      className="flex shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)"
      style={{ height: "72px" }}
    >
      <div className="flex w-full items-center gap-3 px-4 lg:px-6">
        {/* Sidebar trigger */}
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-1 data-[orientation=vertical]:h-5"
        />

        {/* Greeting */}
        <h1
          className="hidden text-base font-semibold md:block"
          style={{ color: "var(--admin-text-primary)" }}
        >
          {getGreeting()}, Shabna 👋
        </h1>

        {/* Spacer */}
        <div className="ml-auto flex items-center gap-2">
          {/* Search */}
          <div className="relative hidden lg:block">
            <SearchIcon
              className="absolute left-3 top-1/2 size-4 -translate-y-1/2"
              style={{ color: "var(--admin-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search..."
              className="admin-search pl-9!"
              style={{ paddingLeft: "36px" }}
            />
          </div>

          {/* Search icon (mobile) */}
          <Button variant="outline" size="icon" className="size-9 lg:hidden">
            <SearchIcon className="size-4" />
          </Button>

          {/* Notifications */}
          <Button variant="outline" size="icon" className="relative size-9">
            <BellIcon className="size-4" />
            <span
              className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: "var(--admin-red)" }}
            >
              3
            </span>
          </Button>

          {/* Theme toggle */}
          <ThemeToggle />

          {/* User avatar */}
          <Avatar className="size-9 cursor-pointer">
            <AvatarFallback
              className="text-xs font-semibold"
              style={{
                background: "var(--admin-purple)",
                color: "#ffffff",
              }}
            >
              SN
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
