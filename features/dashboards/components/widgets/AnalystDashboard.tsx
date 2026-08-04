"use client"

import { motion } from "framer-motion"
import { Play, BarChart, HardDrive } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"

export function AnalystDashboard() {
  const { user } = useAuth()
  
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Analysis Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
             <Play className="h-5 w-5 text-muted-foreground" />
             <h3 className="font-semibold">Recent Uploads</h3>
          </div>
          <div className="text-sm text-muted-foreground text-center py-6">
            All videos processed.
          </div>
        </div>
        
        <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
             <BarChart className="h-5 w-5 text-muted-foreground" />
             <h3 className="font-semibold">Data Processing</h3>
          </div>
          <div className="text-sm text-muted-foreground text-center py-6">
            Systems normal.
          </div>
        </div>
        
        <div className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
             <HardDrive className="h-5 w-5 text-muted-foreground" />
             <h3 className="font-semibold">Storage</h3>
          </div>
          <div className="text-sm text-center py-6">
            <div className="text-2xl font-bold mb-1">45%</div>
            <div className="text-muted-foreground text-xs">Capacity Used (225GB / 500GB)</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
