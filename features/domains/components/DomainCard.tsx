"use client"
import React from "react"
import { DomainRecord } from "../types"
import { DomainStatusBadge } from "./DomainStatusBadge"
import { ExternalLink, Copy, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DomainCard({ domain }: { domain: DomainRecord }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(domain.hostname)
  }

  return (
    <div className="bg-card border rounded-xl overflow-hidden shadow-sm relative group hover:shadow-md transition-shadow">
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-primary/10 text-primary rounded-lg">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">{domain.hostname}</h3>
              <p className="text-sm text-muted-foreground">Your AcademySphere address</p>
            </div>
          </div>
          <DomainStatusBadge status={domain.status} />
        </div>

        {domain.sslStatus && (
          <div className="mb-6 pt-4 border-t">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">SSL Certificate</span>
              <span className="font-medium text-green-600 flex items-center">
                Valid
              </span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3">
          <Button variant="outline" className="flex-1" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" /> Copy URL
          </Button>
          <Button variant="secondary" className="flex-1" asChild>
            <a href={`https://${domain.hostname}`} target="_blank" rel="noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" /> Open Site
            </a>
          </Button>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -right-12 -top-12 w-40 h-40 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors pointer-events-none" />
    </div>
  )
}
