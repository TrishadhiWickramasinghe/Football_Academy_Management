"use client"

import * as React from "react"
import { Building, Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function TenantSwitcher() {
  const [open, setOpen] = React.useState(false)
  const [selectedTenant, setSelectedTenant] = React.useState("One Premier Academy")

  const tenants = [
    { name: "One Premier Academy", role: "Admin" },
    { name: "Mexico City Academy", role: "Coach" },
    { name: "Elite Youth School", role: "Admin" },
  ]

  return (
    <div className="relative">
      <Button
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="w-[220px] justify-between rounded-full bg-gray-50 border-gray-200 text-gray-900 hover:bg-gray-100 shadow-sm transition-all"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 truncate">
          <Building className="h-4 w-4 shrink-0 text-gray-400" />
          <span className="truncate font-medium">{selectedTenant}</span>
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-gray-400" />
      </Button>
      
      {open && (
        <div className="absolute top-full mt-2 w-[220px] rounded-xl border border-gray-100 bg-white text-gray-900 shadow-lg z-50 overflow-hidden">
          <div className="p-1">
            {tenants.map((tenant) => (
              <div
                key={tenant.name}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors hover:bg-gray-50",
                  selectedTenant === tenant.name ? "bg-purple-50 text-purple-900" : ""
                )}
                onClick={() => {
                  setSelectedTenant(tenant.name)
                  setOpen(false)
                }}
              >
                <div className="flex flex-col gap-0.5 w-full">
                  <span className={`text-left truncate ${selectedTenant === tenant.name ? 'font-bold' : 'font-medium'}`}>{tenant.name}</span>
                  <span className="text-xs text-gray-500 text-left">{tenant.role}</span>
                </div>
                {selectedTenant === tenant.name && (
                  <Check className="ml-auto h-4 w-4 shrink-0 text-purple-600" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
