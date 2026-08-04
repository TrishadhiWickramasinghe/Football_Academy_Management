"use client"
import React from "react"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { WhiteLabelSettingsForm } from "@/features/white-label/components/WhiteLabelSettingsForm"
import { Loader2, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WhiteLabelSettingsPage() {
  const { tenant, isLoading } = useTenant()

  if (isLoading) {
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
        <p className="text-muted-foreground">Please select an organisation to manage its settings.</p>
      </div>
    )
  }

  const isWhiteLabelEnabled = tenant.plan === "ENTERPRISE" || tenant.plan === "WHITE_LABEL" || tenant.whiteLabelEnabled

  if (!isWhiteLabelEnabled) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">White-Label Experience</h1>
          <p className="text-muted-foreground mt-1">
            Make AcademySphere completely yours.
          </p>
        </div>
        
        <div className="bg-slate-50 border rounded-xl p-8 text-center space-y-4 mt-8">
          <div className="mx-auto w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
            <Crown className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-semibold">White-Label Experience</h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Available with Enterprise plans. Customise emails, platform branding, mobile app name, and legal links.
          </p>
          <Button className="mt-4 bg-primary text-primary-foreground">View Upgrade Options</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">White-Label Experience</h1>
        <p className="text-muted-foreground mt-1">
          Make AcademySphere completely yours.
        </p>
      </div>
      
      <WhiteLabelSettingsForm initialSettings={{
        tenantId: tenant.id,
        emailSenderName: tenant.emailSenderName,
        emailReplyTo: tenant.emailReplyTo,
        showAcademySphereBranding: tenant.whiteLabelEnabled,
        termsUrl: tenant.termsUrl,
        privacyUrl: tenant.privacyUrl
      }} />
    </div>
  )
}
