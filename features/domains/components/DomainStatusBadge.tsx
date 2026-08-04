import React from "react"
import { DomainStatus } from "../types"
import { CheckCircle2, Clock, AlertCircle, RefreshCw } from "lucide-react"

export function DomainStatusBadge({ status }: { status: DomainStatus }) {
  let colorClass = ""
  let icon = null
  let label = ""

  switch (status) {
    case "active":
    case "verified":
      colorClass = "bg-green-100 text-green-800 border-green-200"
      icon = <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
      label = status === "active" ? "Active" : "Verified"
      break
    case "pending":
    case "verification_required":
    case "verifying":
    case "ssl_provisioning":
      colorClass = "bg-amber-100 text-amber-800 border-amber-200"
      icon = <Clock className="w-3.5 h-3.5 mr-1" />
      label = status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      if (status === "verifying") icon = <RefreshCw className="w-3.5 h-3.5 mr-1 animate-spin" />
      break
    case "failed":
    case "suspended":
    case "ssl_expiring":
      colorClass = "bg-red-100 text-red-800 border-red-200"
      icon = <AlertCircle className="w-3.5 h-3.5 mr-1" />
      label = status.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')
      break
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorClass}`}>
      {icon}
      {label}
    </span>
  )
}
