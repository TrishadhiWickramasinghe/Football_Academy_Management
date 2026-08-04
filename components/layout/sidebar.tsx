"use client"
import React from "react"
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
  ClipboardList,
  ChevronDown
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { TenantSwitcher } from "@/features/tenants/components/TenantSwitcher"

// Role-based navigation maps
export interface NavItem {
  name: string;
  href?: string;
  icon: any;
  subItems?: { name: string; href: string; icon: any }[];
}

const getNavItems = (role: string | null): NavItem[] => {
  const items: NavItem[] = [];
  
  if (role === "SUPER_ADMIN") {
    items.push(
      { name: "Platform", href: "/admin", icon: Activity },
      { name: "Organisations", href: "/dashboard/organisation", icon: Building },
      { name: "Users", href: "/dashboard/users", icon: Users },
      { name: "Subscriptions", href: "/dashboard/billing", icon: CreditCard },
      { name: "Analytics", href: "/dashboard/analytics", icon: BarChart },
      { 
        name: "System", 
        icon: Settings,
        subItems: [
          { name: "General", href: "/dashboard/settings", icon: Settings },
          { name: "Branding", href: "/dashboard/settings/branding", icon: Settings },
          { name: "White-Label", href: "/dashboard/settings/white-label", icon: Settings }
        ]
      }
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
      { 
        name: "Settings", 
        icon: Settings,
        subItems: [
          { name: "General", href: "/dashboard/settings", icon: Settings },
          { name: "Branding", href: "/dashboard/settings/branding", icon: Settings },
          { name: "White-Label", href: "/dashboard/settings/white-label", icon: Settings }
        ]
      }
    );
  } else if (role === "HEAD_COACH") {
    items.push(
      { name: "Dashboard", href: "/dashboard", icon: Activity },
      { name: "Teams", href: "/dashboard/teams", icon: Users2 },
      { name: "Coaching", href: "/dashboard/coaching/curriculum", icon: Shield },
      { name: "Players", href: "/dashboard/players", icon: Users },
      { name: "Evaluations", href: "/dashboard/evaluations", icon: ClipboardList },
      { name: "Video Analysis", href: "/dashboard/video-analysis", icon: Play },
      { 
        name: "Parent Portal", 
        icon: Heart,
        subItems: [
          { name: "Children", href: "/dashboard/parent/children", icon: Heart },
          { name: "Schedule", href: "/dashboard/parent/schedule", icon: Calendar },
          { name: "Development", href: "/dashboard/parent/development", icon: BarChart },
          { name: "Payments", href: "/dashboard/parent/payments", icon: CreditCard },
          { name: "Highlights", href: "/dashboard/parent/highlights", icon: Play }
        ]
      }
    );
  } else if (role === "COACH") {
    items.push(
      { name: "Dashboard", href: "/dashboard", icon: Activity },
      { name: "My Teams", href: "/dashboard/teams", icon: Users2 },
      { name: "Training", href: "/dashboard/schedule", icon: Calendar },
      { name: "Attendance", href: "/dashboard/attendance", icon: ClipboardList },
      { name: "Evaluations", href: "/dashboard/evaluations", icon: ClipboardList },
      { name: "Video", href: "/dashboard/video-analysis", icon: Play },
      { 
        name: "Parent Portal", 
        icon: Heart,
        subItems: [
          { name: "Children", href: "/dashboard/parent/children", icon: Heart },
          { name: "Schedule", href: "/dashboard/parent/schedule", icon: Calendar },
          { name: "Development", href: "/dashboard/parent/development", icon: BarChart },
          { name: "Payments", href: "/dashboard/parent/payments", icon: CreditCard },
          { name: "Highlights", href: "/dashboard/parent/highlights", icon: Play }
        ]
      }
    );
  } else if (role === "PARENT_GUARDIAN") {
    items.push(
      { name: "Home", href: "/dashboard", icon: Activity },
      { name: "My Children", href: "/dashboard/parent/children", icon: Heart },
      { name: "Schedule", href: "/dashboard/parent/schedule", icon: Calendar },
      { name: "Development", href: "/dashboard/parent/development", icon: BarChart },
      { name: "Payments", href: "/dashboard/parent/payments", icon: CreditCard },
      { name: "Highlights", href: "/dashboard/parent/highlights", icon: Play }
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
      { name: "Match Reports", href: "/dashboard/evaluations", icon: ClipboardList },
      { name: "Tournaments", href: "/dashboard/tournaments", icon: Trophy }
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
  const { tenant } = useTenant()
  
  const navItems = getNavItems(role)

  return (
    <div className="hidden border-r bg-muted/20 lg:block lg:w-64 lg:shrink-0 h-screen sticky top-0 overflow-hidden">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            {!tenant?.whiteLabelEnabled && <Trophy className="h-6 w-6 text-primary" />}
            <span className={cn(tenant?.whiteLabelEnabled && "font-bold text-lg")}>
              {tenant?.whiteLabelEnabled ? tenant.name : "AcademySphere"}
            </span>
          </Link>
        </div>
        <div className="px-4 py-3 border-b">
          <TenantSwitcher />
        </div>
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 gap-1">
            {navItems.map((item, index) => {
              if (item.subItems) {
                const isSubActive = item.subItems.some(sub => pathname === sub.href || pathname.startsWith(sub.href + '/'))
                return <CollapsibleNavItem key={item.name} item={item} pathname={pathname} defaultOpen={isSubActive} />
              }

              const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href + '/'))
              
              return (
                <Link
                  key={item.name}
                  href={item.href!}
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

function CollapsibleNavItem({ item, pathname, defaultOpen }: { item: NavItem, pathname: string, defaultOpen: boolean }) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen)

  return (
    <div className="flex flex-col gap-1">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex items-center justify-between w-full gap-3 rounded-lg px-3 py-2.5 transition-colors text-muted-foreground hover:text-foreground group"
      >
        <div className="flex items-center gap-3">
          <item.icon className="h-4 w-4 relative z-10 transition-colors group-hover:text-primary" />
          <span className="relative z-10 font-medium transition-colors">
            {item.name}
          </span>
        </div>
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </button>
      
      {isOpen && item.subItems && (
        <div className="flex flex-col gap-1 pl-9 mt-1 relative before:absolute before:left-5 before:top-0 before:bottom-2 before:w-[1px] before:bg-border">
          {item.subItems.map((subItem) => {
            const isActive = pathname === subItem.href || pathname.startsWith(subItem.href + '/')
            return (
              <Link
                key={subItem.name}
                href={subItem.href}
                className={cn(
                  "relative text-sm rounded-md px-3 py-2 transition-colors",
                  isActive ? "text-primary font-semibold bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                {subItem.name}
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
