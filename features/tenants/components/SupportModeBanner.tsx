"use client"

import React from "react"
import { useAuthContext } from "@/features/auth/contexts/AuthContext"
import { useTenant } from "../contexts/TenantContext"
import { AlertTriangle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function SupportModeBanner() {
  const { hasRole } = useAuthContext()
  const { tenant } = useTenant()

  // Only show if user is SUPER_ADMIN
  const isSuperAdmin = hasRole(["SUPER_ADMIN"])

  return (
    <AnimatePresence>
      {isSuperAdmin && tenant && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="bg-amber-500 text-amber-950 px-4 py-2 flex items-center justify-between text-sm shadow-sm z-50 sticky top-0"
        >
          <div className="flex items-center gap-2 font-medium">
            <AlertTriangle className="h-4 w-4" />
            <span>Support Mode: Viewing as <strong>{tenant.name}</strong></span>
          </div>
          <Button variant="ghost" size="sm" className="h-6 px-2 hover:bg-amber-600/20 text-amber-950 font-semibold text-xs">
            <XCircle className="mr-1 h-3.5 w-3.5" />
            Exit Support Mode
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
