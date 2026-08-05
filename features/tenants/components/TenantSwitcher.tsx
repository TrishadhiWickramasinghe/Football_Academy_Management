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
        variant="ghost" 
        role="combobox" 
        aria-expanded={isOpen}
        className="w-full justify-between overflow-hidden bg-slate-800 text-white hover:bg-slate-700 hover:text-white border-none rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2 truncate">
          <Building className="h-4 w-4 shrink-0 text-slate-400" />
          <span className="truncate font-medium">{tenant.name}</span>
        </span>
        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 text-slate-400" />
      </Button>

      {isOpen && (
        <div className="absolute z-50 mt-2 w-full sm:w-[240px] rounded-xl border border-slate-700 bg-slate-800 text-slate-200 shadow-xl outline-none animate-in fade-in-0 zoom-in-95 overflow-hidden">
          <div className="px-3 py-2 text-xs font-bold text-slate-400 uppercase tracking-wider">Your Organisations</div>
          <div className="h-px bg-slate-700 w-full" />
          <div className="p-1">
            {availableTenants.map((t) => (
              <div
                key={t.id}
                onClick={() => {
                  switchTenant(t.id)
                  setIsOpen(false)
                }}
                className={cn(
                  "relative flex cursor-pointer select-none items-center justify-between rounded-lg px-3 py-2 text-sm outline-none transition-all hover:bg-slate-700 hover:text-white font-medium",
                  t.id === tenant.id && "bg-purple-600 text-white hover:bg-purple-700"
                )}
              >
                <span className="truncate">{t.name}</span>
                {t.id === tenant.id && (
                  <Check className="h-4 w-4 shrink-0 ml-2 text-white" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
