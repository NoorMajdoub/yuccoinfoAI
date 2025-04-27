"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  FileText,
  LayoutDashboard,
  FolderOpen,
  Settings,
  Users,
  Star,
  Clock,
  Trash,
  LogOut,
  FileSpreadsheet,
  FileUp,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar"

export default function DashboardSidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">DocuAI</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1 py-4">
          <SidebarMenu className="px-2 space-y-1">
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard")} tooltip="Dashboard">
                <Link href="/dashboard">
                  <LayoutDashboard className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/documents")} tooltip="Documents">
                <Link href="/dashboard/documents">
                  <FileText className="h-5 w-5" />
                  <span>Documents</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/categories")} tooltip="Categories">
                <Link href="/dashboard/categories">
                  <FolderOpen className="h-5 w-5" />
                  <span>Categories</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/upload")} tooltip="Upload">
                <Link href="/dashboard/upload">
                  <FileUp className="h-5 w-5" />
                  <span>Upload</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/starred")} tooltip="Starred">
                <Link href="/dashboard/starred">
                  <Star className="h-5 w-5" />
                  <span>Starred</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/recent")} tooltip="Recent">
                <Link href="/dashboard/recent">
                  <Clock className="h-5 w-5" />
                  <span>Recent</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={isActive("/dashboard/trash")} tooltip="Trash">
                <Link href="/dashboard/trash">
                  <Trash className="h-5 w-5" />
                  <span>Trash</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <div className="py-4">
              <div className="px-3 mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Financial</h3>
              </div>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/documents?category=Balance Sheets")}
                  tooltip="Balance Sheets"
                >
                  <Link href="/dashboard/documents?category=Balance Sheets">
                    <FileSpreadsheet className="h-5 w-5" />
                    <span>Balance Sheets</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={isActive("/dashboard/documents?category=Income Statements")}
                  tooltip="Income Statements"
                >
                  <Link href="/dashboard/documents?category=Income Statements">
                    <FileSpreadsheet className="h-5 w-5" />
                    <span>Income Statements</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>

            <div className="py-2">
              <div className="px-3 mb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Admin</h3>
              </div>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/users")} tooltip="Users">
                  <Link href="/dashboard/users">
                    <Users className="h-5 w-5" />
                    <span>Users</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton asChild isActive={isActive("/dashboard/settings")} tooltip="Settings">
                  <Link href="/dashboard/settings">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter className="border-t p-4">
        <Button variant="outline" className="w-full justify-start" asChild>
          <Link href="/">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}
