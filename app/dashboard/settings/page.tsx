"use client"
import React from "react"
import Link from "next/link"
import { Globe, Palette, Crown, Building } from "lucide-react"

export default function SettingsIndexPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your organisation's configuration and platform settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/dashboard/settings/domain" className="block group">
          <div className="bg-card border rounded-xl p-6 h-full shadow-sm hover:shadow-md hover:border-primary transition-all">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Domain & Web Address</h3>
            <p className="text-sm text-muted-foreground">Configure custom domains, DNS, and SSL for your academy portal.</p>
          </div>
        </Link>
        
        <Link href="/dashboard/settings/branding" className="block group">
          <div className="bg-card border rounded-xl p-6 h-full shadow-sm hover:shadow-md hover:border-primary transition-all">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Palette className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Brand Identity</h3>
            <p className="text-sm text-muted-foreground">Customise your logo, colours, and the visual appearance of the app.</p>
          </div>
        </Link>

        <Link href="/dashboard/settings/white-label" className="block group">
          <div className="bg-card border rounded-xl p-6 h-full shadow-sm hover:shadow-md hover:border-primary transition-all">
            <div className="bg-primary/10 text-primary w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
              <Crown className="w-6 h-6" />
            </div>
            <h3 className="font-semibold text-lg mb-2">White-Label</h3>
            <p className="text-sm text-muted-foreground">Manage email identity, app branding, and legal links for Enterprise.</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
