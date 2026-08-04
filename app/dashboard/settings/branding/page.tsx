"use client"
import React, { useState, useEffect } from "react"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { ColorPicker } from "@/features/branding/components/ColorPicker"
import { LogoUploader } from "@/features/branding/components/LogoUploader"
import { BrandPreview } from "@/features/branding/components/BrandPreview"
import { Button } from "@/components/ui/button"
import { Loader2, Save } from "lucide-react"

export default function BrandingSettingsPage() {
  const { tenant, isLoading: isTenantLoading } = useTenant()
  const [primaryColor, setPrimaryColor] = useState("#0f172a")
  const [secondaryColor, setSecondaryColor] = useState("#10b981")
  const [logo, setLogo] = useState<string | undefined>(undefined)
  const [favicon, setFavicon] = useState<string | undefined>(undefined)
  const [isSaving, setIsSaving] = useState(false)

  // Initialize with tenant data once loaded
  useEffect(() => {
    if (tenant) {
      setPrimaryColor(tenant.theme.primary || "#0f172a")
      setSecondaryColor(tenant.theme.secondary || "#10b981")
      setLogo(tenant.theme.logo)
      setFavicon(tenant.theme.favicon)
    }
  }, [tenant])

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      // In a real app we'd update the backend and tenant context here
    }, 1000)
  }

  if (isTenantLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!tenant) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">Organisation Not Found</h3>
        <p className="text-muted-foreground">Please select an organisation to manage its branding settings.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8 pt-4">
      <div className="flex justify-end border-b pb-4">
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? (
            <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving...</>
          ) : (
            <><Save className="w-4 h-4 mr-2" /> Save Changes</>
          )}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Logos & Assets</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <LogoUploader 
                label="Primary Logo" 
                currentUrl={logo}
                onUpload={(url) => setLogo(url)}
                onRemove={() => setLogo(undefined)}
              />
              <LogoUploader 
                label="Favicon" 
                description="Square icon (ICO or PNG, 32x32px)"
                currentUrl={favicon}
                onUpload={(url) => setFavicon(url)}
                onRemove={() => setFavicon(undefined)}
              />
            </div>
          </div>

          <div className="bg-card border rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold mb-6">Brand Colours</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <ColorPicker 
                label="Primary Colour" 
                value={primaryColor} 
                onChange={setPrimaryColor} 
              />
              <ColorPicker 
                label="Secondary Colour" 
                value={secondaryColor} 
                onChange={setSecondaryColor} 
              />
            </div>
          </div>
        </div>
        
        {/* Live Preview Sidebar */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Live Preview</h3>
            <BrandPreview 
              primary={primaryColor}
              secondary={secondaryColor}
              logo={logo}
              tenantName={tenant.name}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
