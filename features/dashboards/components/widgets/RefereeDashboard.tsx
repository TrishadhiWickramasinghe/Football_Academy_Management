"use client"

import { motion } from "framer-motion"
import { Calendar, ClipboardList } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"

export function RefereeDashboard() {
  const { user } = useAuth()
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Referee Hub</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back, {user?.name}.
        </p>
      </div>

      <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b pb-3">
           <Calendar className="h-5 w-5 text-muted-foreground" />
           <h3 className="font-semibold">My Assignments</h3>
        </div>
        <div className="text-sm text-muted-foreground text-center py-6">
          No matches assigned for this week.
        </div>
      </div>
      
      <div className="bg-card border rounded-2xl p-5 shadow-sm space-y-4">
        <div className="flex items-center gap-2 border-b pb-3">
           <ClipboardList className="h-5 w-5 text-muted-foreground" />
           <h3 className="font-semibold">Pending Match Reports</h3>
        </div>
        <div className="text-sm text-muted-foreground text-center py-6">
          All reports submitted.
        </div>
      </div>
    </motion.div>
  )
}
