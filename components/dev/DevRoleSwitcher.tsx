"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { UserRole } from "@/features/auth/types"
import { ROLE_DEFINITIONS } from "@/features/auth/constants/roles"
import { Settings2, X, ChevronRight } from "lucide-react"

export function DevRoleSwitcher() {
  const { role, switchRole } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null
  
  if (process.env.NODE_ENV === "production") return null

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 lg:bottom-4 right-4 z-50 p-3 bg-foreground text-background rounded-full shadow-lg hover:scale-105 transition-transform"
        aria-label="Open Dev Role Switcher"
      >
        <Settings2 className="h-5 w-5" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-20 lg:bottom-4 right-4 z-50 w-72 bg-card border rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5">
      <div className="flex items-center justify-between p-4 border-b bg-muted/30">
        <div>
          <h3 className="font-bold text-sm">Dev Tools</h3>
          <p className="text-xs text-muted-foreground">Switch Active Role</p>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="p-1.5 hover:bg-muted rounded-full transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      
      <div className="max-h-[60vh] overflow-y-auto p-2">
        {Object.values(ROLE_DEFINITIONS).map((def) => {
          const isActive = role === def.role
          
          return (
            <button
              key={def.role}
              onClick={() => {
                switchRole(def.role)
                setIsOpen(false)
              }}
              className={`w-full text-left p-3 rounded-xl flex items-center justify-between transition-colors ${
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "hover:bg-muted"
              }`}
            >
              <div>
                <div className="font-medium text-sm">{def.label}</div>
                <div className={`text-[10px] ${isActive ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                  Scope: {def.scope}
                </div>
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </button>
          )
        })}
      </div>
    </div>
  )
}
