"use client"

import { motion } from "framer-motion"
import { Users, Users2, Calendar, TrendingUp, AlertCircle } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function OrgAdminDashboard() {
  const { user } = useAuth()
  
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Organisation Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}. Here's the overview for your academy.
        </p>
      </div>

      {/* Priority Alerts */}
      <motion.div variants={itemVariants} className="bg-warning/10 border border-warning/20 rounded-xl p-4 flex items-center gap-4 text-warning-foreground">
        <AlertCircle className="h-5 w-5 text-warning" />
        <div className="flex-1">
          <h4 className="font-semibold text-sm">Action Required</h4>
          <p className="text-xs opacity-90">3 pending coach approvals, 12 outstanding payments</p>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Total Players", value: "342", icon: Users, trend: "+12" },
          { title: "Active Teams", value: "14", icon: Users2, trend: "Stable" },
          { title: "Today's Sessions", value: "8", icon: Calendar, trend: "View Schedule" },
          { title: "Attendance Rate", value: "94%", icon: TrendingUp, trend: "+2.1%" },
        ].map((kpi, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">{kpi.title}</div>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-3xl font-bold">{kpi.value}</div>
              <div className="text-xs font-medium text-muted-foreground">{kpi.trend}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={itemVariants} className="col-span-4 bg-card border rounded-xl p-6 shadow-sm h-96 flex flex-col">
          <h3 className="font-semibold mb-4">Player Development Overview</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
            <span className="text-muted-foreground">Development Chart</span>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="col-span-3 bg-card border rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="font-semibold mb-4">Today's Schedule</h3>
          <div className="space-y-4">
            {[
              { team: "U15 Elite", time: "16:00", type: "Training" },
              { team: "U12 Dev", time: "16:30", type: "Training" },
              { team: "U17 Pro", time: "18:00", type: "Match" },
            ].map((session, i) => (
              <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/50 transition-colors">
                <div>
                  <div className="text-sm font-semibold">{session.team}</div>
                  <div className="text-xs text-muted-foreground">{session.type}</div>
                </div>
                <div className="font-mono text-sm font-medium">{session.time}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
