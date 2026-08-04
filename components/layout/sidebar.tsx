"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { 
  Users, 
  Trophy, 
  Activity, 
  Play, 
  CreditCard, 
  BarChart, 
  Settings, 
  Shield, 
  Menu,
  Heart,
  Building,
  Users2,
  Calendar,
  ClipboardList
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/features/auth/hooks/useAuth"

// Role-based navigation maps
const getNavItems = (role: string | null) => {
  const items = [];
  
  if (role === "SUPER_ADMIN") {
    items.push(
      { name: "Platform", href: "/admin", icon: Activity },
      { name: "Organisations", href: "/dashboard/organisation", icon: Building },
      { name: "Users", href: "/dashboard/users", icon: Users },
      { name: "Subscriptions", href: "/dashboard/billing", icon: CreditCard },
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
      { name: "System", href: "/dashboard/settings", icon: Settings }
    );
  } else if (role === "ORG_ADMIN" || role === "CLUB_MANAGER") {
    items.push(
      { name: "Dashboard", href: "/dashboard", icon: Activity },
      { name: "Teams", href: "/dashboard/teams", icon: Users2 },
      { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
      { name: "Tournaments", href: "/dashboard/tournaments", icon: Trophy },
      { name: "Players", href: "/dashboard/players", icon: Users },
      { name: "Parents", href: "/dashboard/parents", icon: Heart },
      { name: "Finance", href: "/dashboard/finance", icon: CreditCard },
      { name: "Settings", href: "/dashboard/settings", icon: Settings }
    );
  } else if (role === "HEAD_COACH") {
    items.push(
      { name: "Dashboard", href: "/dashboard", icon: Activity },
      { name: "Teams", href: "/dashboard/teams", icon: Users2 },
      { name: "Coaching", href: "/dashboard/coaching/curriculum", icon: Shield },
      { name: "Players", href: "/dashboard/players", icon: Users },
      { name: "Evaluations", href: "/dashboard/evaluations", icon: ClipboardList },
      { name: "Video Analysis", href: "/dashboard/video-analysis", icon: Play }
    );
  } else if (role === "COACH") {
    items.push(
      { name: "Dashboard", href: "/dashboard", icon: Activity },
      { name: "My Teams", href: "/dashboard/teams", icon: Users2 },
      { name: "Training", href: "/dashboard/schedule", icon: Calendar },
      { name: "Attendance", href: "/dashboard/attendance", icon: ClipboardList },
      { name: "Evaluations", href: "/dashboard/evaluations", icon: ClipboardList },
      { name: "Video", href: "/dashboard/video-analysis", icon: Play }
    );
  } else if (role === "PARENT_GUARDIAN") {
    items.push(
      { name: "Home", href: "/dashboard", icon: Activity },
      { name: "My Children", href: "/dashboard/players", icon: Heart },
      { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
      { name: "Development", href: "/dashboard/evaluations", icon: BarChart },
      { name: "Payments", href: "/dashboard/finance", icon: CreditCard }
    );
  } else if (role === "PLAYER") {
    items.push(
      { name: "Home", href: "/dashboard", icon: Activity },
      { name: "My Schedule", href: "/dashboard/schedule", icon: Calendar },
      { name: "My Team", href: "/dashboard/teams", icon: Users2 },
      { name: "My Development", href: "/dashboard/evaluations", icon: BarChart },
      { name: "Highlights", href: "/dashboard/video-analysis", icon: Play }
    );
  } else if (role === "REFEREE") {
    items.push(
      { name: "Dashboard", href: "/dashboard", icon: Activity },
      { name: "My Matches", href: "/dashboard/schedule", icon: Calendar },
      { name: "Match Reports", href: "/dashboard/evaluations", icon: ClipboardList }
    );
  } else if (role === "ANALYST") {
    items.push(
      { name: "Dashboard", href: "/dashboard", icon: Activity },
      { name: "Video Analysis", href: "/dashboard/video-analysis", icon: Play },
      { name: "Players", href: "/dashboard/players", icon: Users },
      { name: "Teams", href: "/dashboard/teams", icon: Users2 },
      { name: "Reports", href: "/dashboard/analytics", icon: BarChart }
    );
  } else {
    // Default fallback
    items.push({ name: "Dashboard", href: "/dashboard", icon: Activity });
  }

  return items;
}

export function Sidebar() {
  const pathname = usePathname()
  const { role } = useAuth()
  
  const navItems = getNavItems(role)

  return (
    <div className="hidden border-r bg-muted/20 lg:block lg:w-64 lg:shrink-0 h-screen sticky top-0 overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Trophy className="h-6 w-6 text-primary" />
            <span className="">AcademySphere</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            {navItems.map((item, index) => {
              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + '/'))
              
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-sidebar-nav"
                      className="absolute inset-0 bg-primary/10 border-l-4 border-primary rounded-r-lg"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  
                  <item.icon className={cn(
                    "h-4 w-4 relative z-10 transition-colors", 
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"
                  )} />
                  <span className={cn(
                    "relative z-10 font-medium transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                  )}>
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
