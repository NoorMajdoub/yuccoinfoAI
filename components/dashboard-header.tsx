"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Search, X, FileText, Menu } from "lucide-react"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"

export default function DashboardHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-30 border-b bg-background">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={toggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        <div className="flex items-center mr-4">
          <Link href="/" className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">DocuAI</span>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-4 lg:space-x-6 mx-6">
          <Link href="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link href="/dashboard/documents" className="text-sm font-medium transition-colors hover:text-primary">
            Documents
          </Link>
          <Link href="/dashboard/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Categories
          </Link>
          <Link href="/dashboard/upload" className="text-sm font-medium transition-colors hover:text-primary">
            Upload
          </Link>
          <Link href="/dashboard/settings" className="text-sm font-medium transition-colors hover:text-primary">
            Settings
          </Link>
        </nav>

        {showSearch ? (
          <div className="flex flex-1 items-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search documents..." className="w-full pl-8" autoFocus />
            </div>
            <Button variant="ghost" size="icon" className="ml-2" onClick={() => setShowSearch(false)}>
              <X className="h-4 w-4" />
              <span className="sr-only">Close search</span>
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-1">
              <Button variant="outline" size="icon" className="md:hidden" onClick={() => setShowSearch(true)}>
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
              <div className="hidden md:flex md:relative md:w-full md:max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search documents..." className="w-full pl-8" />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Notifications</span>
                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-primary"></span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/">Log out</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </>
        )}
      </div>
    </header>
  )
}
