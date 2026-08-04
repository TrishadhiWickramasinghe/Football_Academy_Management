"use client"
import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { domainService } from "../services/domainService"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { DnsRecords } from "./DnsRecords"
import { DomainRecord } from "../types"
import { Loader2 } from "lucide-react"

export function DomainSetupModal({ onDomainAdded }: { onDomainAdded: (domain: DomainRecord) => void }) {
  const { tenant } = useTenant()
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<1 | 2>(1)
  const [hostname, setHostname] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [domainRecord, setDomainRecord] = useState<DomainRecord | null>(null)

  const handleAddDomain = async () => {
    if (!tenant || !hostname) return
    setIsLoading(true)
    try {
      const record = await domainService.addCustomDomain(tenant.id, hostname)
      setDomainRecord(record)
      setStep(2)
      onDomainAdded(record)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
    setTimeout(() => {
      setStep(1)
      setHostname("")
      setDomainRecord(null)
    }, 300)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Custom Domain</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect your own domain</DialogTitle>
          <DialogDescription>
            {step === 1 ? "Enter the domain you want to connect to your organisation." : "Configure your DNS records to verify ownership."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="py-4 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Domain Name</label>
              <Input 
                placeholder="portal.opaacademy.com" 
                value={hostname} 
                onChange={(e) => setHostname(e.target.value)} 
              />
              <p className="text-xs text-muted-foreground">Do not include http:// or https://</p>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleAddDomain} disabled={!hostname || isLoading}>
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Continue
              </Button>
            </div>
          </div>
        )}

        {step === 2 && domainRecord && (
          <div className="py-4 space-y-6">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">1. Configure DNS</h4>
              <p className="text-sm text-muted-foreground">Add the following records to your domain provider's DNS settings.</p>
              {domainRecord.dnsRecords && <DnsRecords records={domainRecord.dnsRecords} />}
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium text-sm mb-1">2. Verification</h4>
              <p className="text-sm text-muted-foreground">DNS changes can take up to 48 hours to propagate, but often happen within minutes.</p>
            </div>

            <div className="flex justify-end gap-3">
              <Button onClick={handleClose}>Done for now</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
