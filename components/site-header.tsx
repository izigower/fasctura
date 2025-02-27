"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, Home, LayoutDashboard, Settings } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { UserNav } from "@/components/user-nav"

export function SiteHeader() {
  const pathname = usePathname()
  
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6" />
            <span className="inline-block font-bold">QuoteCraft</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname === "/" && "text-foreground"
              )}
            >
              <Home className="mr-1 h-4 w-4" />
              Home
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname === "/dashboard" && "text-foreground"
              )}
            >
              <LayoutDashboard className="mr-1 h-4 w-4" />
              Dashboard
            </Link>
            <Link
              href="/settings"
              className={cn(
                "flex items-center text-sm font-medium text-muted-foreground",
                pathname === "/settings" && "text-foreground"
              )}
            >
              <Settings className="mr-1 h-4 w-4" />
              Settings
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}