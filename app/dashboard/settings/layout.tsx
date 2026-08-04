"use client"
import React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const TABS = [
  { name: "Overview", href: "/dashboard/settings" },
  { name: "Domain & Web Address", href: "/dashboard/settings/domain" },
  { name: "Brand Identity", href: "/dashboard/settings/branding" },
  { name: "White-Label", href: "/dashboard/settings/white-label" },
]

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="max-w-5xl mx-auto space-y-6 p-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Organisation Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your domain, branding, and platform preferences.</p>
      </div>

      <div className="border-b">
        <nav className="flex space-x-8 overflow-x-auto hide-scrollbar" aria-label="Settings">
          {TABS.map((tab) => {
            const isActive = pathname === tab.href
            return (
              <Link
                key={tab.name}
                href={tab.href}
                className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                {tab.name}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="pt-2">
        {children}
      </div>
    </div>
  )
}
