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
        className="w-[220px] justify-between"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-2 truncate">
          <Building className="h-4 w-4 shrink-0 opacity-50" />
          <span className="truncate">{selectedTenant}</span>
        </div>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>
      
      {open && (
        <div className="absolute top-full mt-2 w-[220px] rounded-md border bg-popover text-popover-foreground shadow-md z-50">
          <div className="p-1">
            {tenants.map((tenant) => (
              <div
                key={tenant.name}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                  selectedTenant === tenant.name ? "bg-accent/50" : ""
                )}
                onClick={() => {
                  setSelectedTenant(tenant.name)
                  setOpen(false)
                }}
              >
                <div className="flex flex-col gap-0.5 w-full">
                  <span className="font-medium text-left truncate">{tenant.name}</span>
                  <span className="text-xs text-muted-foreground text-left">{tenant.role}</span>
                </div>
                {selectedTenant === tenant.name && (
                  <Check className="ml-auto h-4 w-4 shrink-0" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
