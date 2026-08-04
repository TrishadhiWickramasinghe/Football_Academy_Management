"use client"
import React, { useEffect, useState } from "react"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { DomainCard } from "@/features/domains/components/DomainCard"
import { DomainSetupModal } from "@/features/domains/components/DomainSetupModal"
import { domainService } from "@/features/domains/services/domainService"
import { DomainRecord } from "@/features/domains/types"
import { Loader2, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DomainSettingsPage() {
  const { tenant, isLoading: isTenantLoading } = useTenant()
  const [domain, setDomain] = useState<DomainRecord | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const fetchDomain = async () => {
    if (!tenant) return
    setIsRefreshing(true)
    try {
      const data = await domainService.getDomain(tenant.id)
      setDomain(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    if (!isTenantLoading && tenant) {
      fetchDomain()
    } else if (!isTenantLoading && !tenant) {
      setIsLoading(false)
    }
  }, [tenant, isTenantLoading])

  const handleVerify = async () => {
    if (!tenant || !domain) return
    setIsRefreshing(true)
    try {
      const updated = await domainService.verifyDomain(tenant.id, domain.id)
      setDomain(updated)
    } catch (error) {
      console.error(error)
    } finally {
      setIsRefreshing(false)
    }
  }

  if (isTenantLoading || isLoading) {
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
        <p className="text-muted-foreground">Please select an organisation to manage its domain settings.</p>
      </div>
    )
  }

  const isStarter = tenant.plan === "STARTER"

  return (
    <div className="space-y-8 pt-4">
      <div className="flex justify-end mb-4">
        {!isStarter && (
          <DomainSetupModal onDomainAdded={setDomain} />
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Your AcademySphere address</h2>
          {domain ? (
            <DomainCard domain={domain} />
          ) : (
            <div className="bg-card border rounded-xl p-6 shadow-sm relative overflow-hidden group">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
                    <Globe className="h-5 w-5" />
                  </div>
                  <h3 className="font-medium text-lg">{tenant.subdomain || `${tenant.slug}.academysphere.com`}</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">This is your default platform address.</p>
              </div>
              <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
            </div>
          )}
        </div>

        {domain && domain.status === "verification_required" && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-amber-900 mb-2">DNS Verification Required</h3>
            <p className="text-amber-800 text-sm mb-4">
              We need to verify that you own <strong>{domain.hostname}</strong>. 
              Please add the required DNS records to your domain provider.
            </p>
            <div className="flex items-center gap-3">
              <Button onClick={handleVerify} disabled={isRefreshing} className="bg-amber-600 hover:bg-amber-700 text-white">
                {isRefreshing && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Verify DNS Now
              </Button>
              <span className="text-xs text-amber-700 font-medium">Last checked: Just now</span>
            </div>
          </div>
        )}

        {isStarter && (
          <div className="bg-slate-50 border rounded-xl p-8 text-center space-y-4 mt-8">
            <div className="mx-auto w-12 h-12 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-slate-500" />
            </div>
            <h3 className="text-xl font-semibold">Custom Domains</h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Available with Professional & Enterprise plans. Connect your own domain to create a fully branded AcademySphere experience.
            </p>
            <Button className="mt-4">View Upgrade Options</Button>
          </div>
        )}
      </div>
    </div>
  )
}
