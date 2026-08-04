"use client"

import { useState } from "react"
import { Upload, Save, Building2, Globe, Palette, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export function BrandingSettings() {
  const [brandConfig, setBrandConfig] = useState({
    name: "One Premier Academy",
    domain: "opaacademy.academysphere.com",
    primaryColor: "#0f172a", // Default deep navy
    secondaryColor: "#10b981", // Emerald
    accentColor: "#84cc16", // Lime
  })

  return (
    <div className="flex flex-col gap-8 h-full max-w-7xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Brand Identity</h1>
          <p className="text-muted-foreground">Customise the look and feel of your academy platform.</p>
        </div>
        <Button className="gap-2"><Save className="h-4 w-4" /> Save Changes</Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-start">
        {/* Settings Form */}
        <div className="space-y-6">
          
          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b pb-4 mb-4">
              <Building2 className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-bold">Organisation Details</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Organisation Name</label>
                <Input 
                  value={brandConfig.name}
                  onChange={(e) => setBrandConfig({...brandConfig, name: e.target.value})}
                />
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Logo</label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/50 overflow-hidden">
                    <img src="/pattern.svg" alt="Logo preview" className="opacity-20" />
                  </div>
                  <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" /> Upload Logo</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b pb-4 mb-4">
              <Palette className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-bold">Colours</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Primary Colour</label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    className="w-12 h-10 p-1 cursor-pointer"
                    value={brandConfig.primaryColor}
                    onChange={(e) => setBrandConfig({...brandConfig, primaryColor: e.target.value})}
                  />
                  <Input 
                    value={brandConfig.primaryColor}
                    onChange={(e) => setBrandConfig({...brandConfig, primaryColor: e.target.value})}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Secondary Colour</label>
                <div className="flex gap-2">
                  <Input 
                    type="color" 
                    className="w-12 h-10 p-1 cursor-pointer"
                    value={brandConfig.secondaryColor}
                    onChange={(e) => setBrandConfig({...brandConfig, secondaryColor: e.target.value})}
                  />
                  <Input 
                    value={brandConfig.secondaryColor}
                    onChange={(e) => setBrandConfig({...brandConfig, secondaryColor: e.target.value})}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b pb-4 mb-4">
              <Globe className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-bold">Custom Domain</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Tenant Domain</label>
                <Input 
                  value={brandConfig.domain}
                  onChange={(e) => setBrandConfig({...brandConfig, domain: e.target.value})}
                  className="font-mono text-sm"
                />
              </div>
              <div className="bg-success/10 text-success text-sm px-4 py-3 rounded-lg flex gap-2 items-center border border-success/20">
                <div className="h-2 w-2 bg-success rounded-full"></div>
                Domain connected and SSL configured
              </div>
            </div>
          </div>

        </div>

        {/* Live Preview Pane */}
        <div className="sticky top-24 space-y-4">
          <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">Live Tenant Preview</h3>
          
          <div className="rounded-2xl border bg-background overflow-hidden shadow-xl" style={{ '--preview-primary': brandConfig.primaryColor, '--preview-secondary': brandConfig.secondaryColor } as React.CSSProperties}>
            {/* Fake Browser Chrome */}
            <div className="bg-muted/50 border-b p-3 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <div className="mx-auto bg-background rounded text-xs font-mono py-1 px-4 text-muted-foreground">
                {brandConfig.domain}
              </div>
            </div>

            {/* Preview Content */}
            <div className="flex h-96">
              {/* Fake Sidebar */}
              <div className="w-48 bg-muted/20 border-r flex flex-col p-4">
                <div className="font-bold text-sm mb-6 flex items-center gap-2 truncate" style={{ color: 'var(--preview-primary)' }}>
                  <div className="h-6 w-6 rounded flex items-center justify-center shrink-0 text-white shadow-sm" style={{ backgroundColor: 'var(--preview-primary)' }}>
                    {brandConfig.name.charAt(0)}
                  </div>
                  <span className="truncate">{brandConfig.name}</span>
                </div>
                <div className="space-y-2">
                  <div className="h-8 rounded flex items-center px-2 text-xs font-medium text-white shadow-sm transition-colors" style={{ backgroundColor: 'var(--preview-primary)' }}>Dashboard</div>
                  <div className="h-8 rounded flex items-center px-2 text-xs text-muted-foreground">Players</div>
                  <div className="h-8 rounded flex items-center px-2 text-xs text-muted-foreground">Tournaments</div>
                </div>
              </div>
              {/* Fake Main Content */}
              <div className="flex-1 p-6 bg-background">
                <h4 className="text-xl font-bold mb-4">Welcome back</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-card border rounded-lg p-4 shadow-sm">
                    <div className="text-xs text-muted-foreground mb-1">Active Players</div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--preview-primary)' }}>245</div>
                  </div>
                  <div className="bg-card border rounded-lg p-4 shadow-sm">
                    <div className="text-xs text-muted-foreground mb-1">Development Score</div>
                    <div className="text-2xl font-bold" style={{ color: 'var(--preview-secondary)' }}>8.4</div>
                  </div>
                </div>
                
                <div className="rounded-lg p-4 text-white text-sm font-medium shadow-sm transition-colors" style={{ backgroundColor: 'var(--preview-primary)' }}>
                  Primary Button Style
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
