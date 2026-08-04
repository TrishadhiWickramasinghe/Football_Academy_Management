"use client"
import React, { useState } from "react"
import { WhiteLabelSettings } from "../types"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { Loader2, Mail, ExternalLink, Smartphone } from "lucide-react"

export function WhiteLabelSettingsForm({ initialSettings }: { initialSettings?: Partial<WhiteLabelSettings> }) {
  const [settings, setSettings] = useState<Partial<WhiteLabelSettings>>(initialSettings || {
    showAcademySphereBranding: true
  })
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (key: keyof WhiteLabelSettings, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
    }, 1000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Email Identity</h3>
            <p className="text-sm text-muted-foreground">Customise how emails appear to your users.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Sender Name</label>
            <Input 
              placeholder="e.g. One Premier Academy" 
              value={settings.emailSenderName || ""}
              onChange={(e) => handleChange("emailSenderName", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Reply-To Address</label>
            <Input 
              type="email"
              placeholder="e.g. support@onepremieracademy.com" 
              value={settings.emailReplyTo || ""}
              onChange={(e) => handleChange("emailReplyTo", e.target.value)}
            />
          </div>
        </div>
        
        {settings.emailSenderName && settings.emailReplyTo && (
          <div className="mt-6 p-4 bg-muted/50 rounded-lg text-sm font-mono border">
            <div className="text-muted-foreground mb-1">Preview</div>
            <div><span className="text-muted-foreground">From:</span> {settings.emailSenderName} &lt;noreply@academysphere.com&gt;</div>
            <div><span className="text-muted-foreground">Reply-To:</span> {settings.emailReplyTo}</div>
          </div>
        )}
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <Smartphone className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Platform & Mobile</h3>
            <p className="text-sm text-muted-foreground">Configure your app identity.</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mobile App Name</label>
            <Input 
              placeholder="e.g. OPA Connect" 
              value={settings.appName || ""}
              onChange={(e) => handleChange("appName", e.target.value)}
            />
            <p className="text-xs text-muted-foreground">
              A separate App Store / Google Play submission may be required for fully branded mobile applications.
            </p>
          </div>
          
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div>
              <p className="font-medium">Show AcademySphere Branding</p>
              <p className="text-sm text-muted-foreground">Toggle "Powered by AcademySphere" in the footer.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={settings.showAcademySphereBranding}
              onClick={() => handleChange("showAcademySphereBranding", !settings.showAcademySphereBranding)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 ${
                settings.showAcademySphereBranding ? "bg-primary" : "bg-input"
              }`}
            >
              <span
                className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                  settings.showAcademySphereBranding ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-6 border-b pb-4">
          <div className="p-2 bg-primary/10 text-primary rounded-lg">
            <ExternalLink className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Legal Links</h3>
            <p className="text-sm text-muted-foreground">Provide your own terms and privacy policy.</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Terms of Service URL</label>
            <Input 
              placeholder="https://..." 
              value={settings.termsUrl || ""}
              onChange={(e) => handleChange("termsUrl", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Privacy Policy URL</label>
            <Input 
              placeholder="https://..." 
              value={settings.privacyUrl || ""}
              onChange={(e) => handleChange("privacyUrl", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Save White-Label Settings
        </Button>
      </div>
    </div>
  )
}
