"use client"

import { motion } from "framer-motion"
import { Calendar, Users, ClipboardCheck, ArrowRight, Play } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { Button } from "@/components/ui/button"

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

export function CoachDashboard() {
  const { user } = useAuth()
  
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
      className="space-y-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Coach Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome back, Coach {user?.name?.split(' ')[0]}.
        </p>
      </div>

      {/* Mobile-optimized quick action for coaches */}
      <motion.div variants={itemVariants} className="bg-primary text-primary-foreground rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="absolute -right-6 -top-6 h-32 w-32 bg-white/10 rounded-full blur-2xl"></div>
        <div className="relative z-10">
          <div className="text-primary-foreground/80 font-medium mb-1 uppercase tracking-wider text-xs">Today's Session</div>
          <h2 className="text-2xl font-bold mb-1">U15 Elite</h2>
          <p className="opacity-90 mb-6 flex items-center gap-2">
            <Calendar className="h-4 w-4" /> 16:30 • Training Ground A
          </p>
          <Button className="w-full sm:w-auto bg-white text-primary hover:bg-white/90 font-bold">
            <ClipboardCheck className="mr-2 h-4 w-4" /> Take Attendance
          </Button>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <motion.div variants={itemVariants} className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Users className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">My Teams</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors">
              <span className="font-medium">U15 Elite</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex items-center justify-between group cursor-pointer hover:bg-muted/50 p-2 rounded-md transition-colors">
              <span className="font-medium">U14 Development</span>
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </motion.div>
        
        <motion.div variants={itemVariants} className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <ClipboardCheck className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Pending Evaluations</h3>
          </div>
          <div className="text-sm text-muted-foreground text-center py-6">
            You're up to date!
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card border rounded-xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 border-b pb-3">
            <Play className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-semibold">Recent Videos</h3>
          </div>
          <div className="text-sm text-muted-foreground text-center py-6 flex flex-col items-center gap-2">
             <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
               <Play className="h-4 w-4" />
             </div>
             No new match footage
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
