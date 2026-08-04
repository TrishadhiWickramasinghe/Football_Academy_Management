"use client"

import React, { useState, useRef, useEffect } from "react"
import { Building, Check, ChevronsUpDown } from "lucide-react"
import { useTenant } from "../contexts/TenantContext"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TenantSwitcher() {
  const { tenant, availableTenants, switchTenant } = useTenant()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  if (!tenant || availableTenants.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button 
        variant="outline" 
        role="combobox" 
        aria-expanded={isOpen}
        className="w-full justify-between overflow-hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2 truncate">
          <Building className="h-4 w-4 shrink-0 opacity-50" />
          <span className="truncate font-medium">{tenant.name}</span>
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full sm:w-[240px] rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0 zoom-in-95">
          <div className="px-2 py-1.5 text-sm font-semibold">Your Organisations</div>
          <div className="h-px bg-muted my-1" />
          <div className="p-1">
            {availableTenants.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  switchTenant(t.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "relative flex cursor-pointer select-none items-center justify-between rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground",
                  t.id === tenant.id && "bg-accent text-accent-foreground"
                )}
              >
                <span className="truncate">{t.name}</span>
                {t.id === tenant.id && (
                  <Check className="h-4 w-4 shrink-0 ml-2" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
