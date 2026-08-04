"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Users, 
  Activity, 
  Play, 
  Calendar,
  MoreHorizontal,
  Home,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/features/auth/hooks/useAuth"

const getMobileNavItems = (role: string | null) => {
  const items = [];
  
  if (role === "COACH" || role === "HEAD_COACH") {
    items.push(
      { name: "Home", href: "/dashboard", icon: Home },
      { name: "Teams", href: "/dashboard/teams", icon: Users },
      { name: "Training", href: "/dashboard/schedule", icon: Calendar },
      { name: "Videos", href: "/dashboard/video-analysis", icon: Play },
      { name: "More", href: "#more", icon: MoreHorizontal }
    );
  } else if (role === "PARENT_GUARDIAN") {
    items.push(
      { name: "Home", href: "/dashboard", icon: Home },
      { name: "Child", href: "/dashboard/players", icon: Heart },
      { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
      { name: "More", href: "#more", icon: MoreHorizontal }
    );
  } else if (role === "PLAYER") {
    items.push(
      { name: "Home", href: "/dashboard", icon: Home },
      { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
      { name: "Progress", href: "/dashboard/evaluations", icon: Activity },
      { name: "More", href: "#more", icon: MoreHorizontal }
    );
  } else if (role === "REFEREE") {
    items.push(
      { name: "Home", href: "/dashboard", icon: Home },
      { name: "Matches", href: "/dashboard/schedule", icon: Calendar },
      { name: "More", href: "#more", icon: MoreHorizontal }
    );
  } else {
    // Admin / Manager / Analyst default mobile view
    items.push(
      { name: "Home", href: "/dashboard", icon: Home },
      { name: "Teams", href: "/dashboard/teams", icon: Users },
      { name: "Schedule", href: "/dashboard/schedule", icon: Calendar },
      { name: "More", href: "#more", icon: MoreHorizontal }
    );
  }

  return items;
}

export function MobileNav() {
  const pathname = usePathname()
  const { role } = useAuth()
  
  const navItems = getMobileNavItems(role)

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-background border-t pb-safe">
      <nav className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + '/'))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className="flex flex-col items-center justify-center w-full h-full gap-1"
            >
              <div className={cn(
                "p-1.5 rounded-full transition-colors",
                isActive ? "bg-primary/10" : ""
              )}>
                <item.icon className={cn(
                  "h-5 w-5 transition-colors", 
                  isActive ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <span className={cn(
                "text-[10px] font-medium transition-colors",
                isActive ? "text-primary" : "text-muted-foreground"
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
