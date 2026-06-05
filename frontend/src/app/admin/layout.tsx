import "@/styles/admin.css"
import { AdminThemeManager } from "./admin-theme-manager"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AdminThemeManager />
      <div className="admin-scope min-h-screen" style={{ background: "var(--admin-bg)" }}>
        {children}
      </div>
    </>
  )
}
