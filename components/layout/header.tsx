"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search, CircleUser, ChevronDown, LogOut, Settings as SettingsIcon, User } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TenantSwitcher } from "@/components/layout/tenant-switcher"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { getRoleLabel } from "@/features/auth/constants/roles"

export function Header() {
  const { user, role } = useAuth();
  const [showProfile, setShowProfile] = useState(false);

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 z-20">
      <div className="flex items-center gap-4">
        {role !== "SUPER_ADMIN" && <TenantSwitcher />}
      </div>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search players, tournaments..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Toggle notifications</span>
      </Button>
      
      <div className="relative">
        <Button 
          variant="ghost" 
          className="gap-2 px-2"
          onClick={() => setShowProfile(!showProfile)}
        >
          <CircleUser className="h-5 w-5" />
          <div className="hidden md:flex flex-col items-start text-xs">
            <span className="font-medium leading-none">{user?.name || "User"}</span>
            <span className="text-muted-foreground mt-1">{role ? getRoleLabel(role) : ""}</span>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </Button>

        {showProfile && (
          <div className="absolute right-0 top-full mt-2 w-56 rounded-md border bg-popover text-popover-foreground shadow-md outline-none">
            <div className="px-2 py-1.5 text-sm font-semibold">My Account</div>
            <div className="h-px bg-border"></div>
            <div className="p-1">
              <Button variant="ghost" className="w-full justify-start text-sm h-9 px-2">
                <User className="mr-2 h-4 w-4" /> Profile
              </Button>
              <Button variant="ghost" className="w-full justify-start text-sm h-9 px-2">
                <SettingsIcon className="mr-2 h-4 w-4" /> Preferences
              </Button>
            </div>
            <div className="h-px bg-border"></div>
            <div className="p-1">
              <Button variant="ghost" className="w-full justify-start text-sm h-9 px-2 text-destructive hover:text-destructive hover:bg-destructive/10">
                <LogOut className="mr-2 h-4 w-4" /> Log out
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
