"use client"

import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { Calendar, UserCircle, Activity, CreditCard, ChevronRight } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function ParentDashboard() {
  const { user } = useAuth()
  const [activeChild, setActiveChild] = useState(0)
  
  const children = [
    { name: "Lucas", team: "U15 Elite", avatar: "L" },
    { name: "Emma", team: "U12 Girls", avatar: "E" }
  ]
  
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
      className="space-y-6 pb-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">Family Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Welcome back, {user?.name?.split(' ')[0]}.
        </p>
      </div>

      {/* Child Selector */}
      <motion.div variants={itemVariants} className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 hide-scrollbar">
        {children.map((child, idx) => (
          <button
            key={idx}
            onClick={() => setActiveChild(idx)}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all min-w-[160px] ${
              activeChild === idx 
                ? "bg-primary text-primary-foreground border-primary shadow-md" 
                : "bg-card hover:bg-muted/50"
            }`}
          >
            <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${
              activeChild === idx ? "bg-white/20" : "bg-primary/10 text-primary"
            }`}>
              {child.avatar}
            </div>
            <div className="text-left">
              <div className="font-semibold text-sm">{child.name}</div>
              <div className={`text-xs ${activeChild === idx ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {child.team}
              </div>
            </div>
          </button>
        ))}
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div variants={itemVariants} className="bg-card border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                <Calendar className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Next Session</h3>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold">Today, 16:30</div>
            <div className="text-sm text-muted-foreground">Training Ground A • {children[activeChild].team}</div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card border rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Latest Evaluation</h3>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-1">
            <div className="text-lg font-bold">Mid-Season Review</div>
            <div className="text-sm text-muted-foreground text-success">Overall: 4.2/5 • 2 weeks ago</div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-card border rounded-2xl p-5 shadow-sm sm:col-span-2">
           <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                <CreditCard className="h-5 w-5" />
              </div>
              <h3 className="font-semibold">Payments</h3>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
             <div>
               <div className="font-medium text-sm">Monthly Subscription</div>
               <div className="text-xs text-muted-foreground">Due in 5 days</div>
             </div>
             <div className="font-bold">$45.00</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
