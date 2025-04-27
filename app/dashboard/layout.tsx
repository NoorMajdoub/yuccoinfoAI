import type { ReactNode } from "react"
import DashboardHeader from "@/components/dashboard-header"
import DashboardSidebar from "@/components/dashboard-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="min-h-screen bg-muted/30 flex">
        <DashboardSidebar />
        <div className="flex-1">
          <DashboardHeader />
          <main className="p-4 md:p-6 md:ml-64">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
