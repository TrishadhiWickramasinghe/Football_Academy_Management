"use client"

import { motion } from "framer-motion"
import { Building2, Users, DollarSign, Activity, ArrowUpRight, TrendingUp } from "lucide-react"
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

export function SuperAdminDashboard() {
  const { user } = useAuth()
  
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Platform Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, {user?.name}. Here's what's happening across AcademySphere.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* KPI Cards */}
        {[
          { title: "Organisations", value: "248", icon: Building2, trend: "+12.4%" },
          { title: "Total Players", value: "12,450", icon: Users, trend: "+5.2%" },
          { title: "Monthly Revenue", value: "$42,500", icon: DollarSign, trend: "+18.1%" },
          { title: "Active Tournaments", value: "14", icon: Activity, trend: "Stable" },
        ].map((kpi, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-card border rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium text-muted-foreground">{kpi.title}</div>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-4 flex items-baseline gap-2">
              <motion.div 
                className="text-3xl font-bold"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.4 }}
              >
                {kpi.value}
              </motion.div>
              <div className="flex items-center text-xs font-medium text-success">
                <TrendingUp className="mr-1 h-3 w-3" />
                {kpi.trend}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <motion.div variants={itemVariants} className="col-span-4 bg-card border rounded-xl p-6 shadow-sm h-96 flex flex-col">
          <h3 className="font-semibold mb-4">Tenant Growth</h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed rounded-lg bg-muted/20">
            <span className="text-muted-foreground">Chart Component</span>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="col-span-3 bg-card border rounded-xl p-6 shadow-sm flex flex-col">
          <h3 className="font-semibold mb-4">Recent Onboarding</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    O{i}
                  </div>
                  <div>
                    <div className="text-sm font-semibold">Organisation {i}</div>
                    <div className="text-xs text-muted-foreground">Joined 2 days ago</div>
                  </div>
                </div>
                <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
