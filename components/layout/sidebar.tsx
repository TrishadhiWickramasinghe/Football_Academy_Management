"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Users, 
  Trophy, 
  Activity, 
  Play, 
  CreditCard, 
  BarChart, 
  Settings, 
  Shield, 
  Menu
} from "lucide-react"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { name: "Dashboard", href: "/dashboard", icon: Activity },
  { name: "Players", href: "/dashboard/players", icon: Users },
  { name: "Tournaments", href: "/dashboard/tournaments", icon: Trophy },
  { name: "Coaching", href: "/dashboard/coaching", icon: Shield },
  { name: "Video Analysis", href: "/dashboard/video", icon: Play },
  { name: "Finance", href: "/dashboard/finance", icon: CreditCard },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/20 lg:block lg:w-64 lg:shrink-0 h-screen sticky top-0">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="">AcademySphere</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    isActive 
                      ? "bg-muted text-primary" 
                      : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
