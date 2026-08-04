"use client"

import { motion, Variants } from "framer-motion"
import { Calendar, Play, Trophy, Star } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
}

export function PlayerDashboard() {
  const { user } = useAuth()
  
  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
      className="space-y-6 pb-6"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold tracking-tight">My Hub</h1>
        <p className="text-muted-foreground text-sm">
          Hey {user?.name?.split(' ')[0]}, ready for today's session?
        </p>
      </div>

      <motion.div variants={itemVariants} className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-2 text-primary-foreground/80 font-medium mb-2 text-sm uppercase tracking-wider">
          <Calendar className="h-4 w-4" /> Next Up
        </div>
        <h2 className="text-3xl font-bold mb-1">Match vs City FC</h2>
        <p className="opacity-90">Tomorrow • 14:00 • Main Stadium</p>
      </motion.div>

      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div variants={itemVariants} className="bg-card border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
             <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
             <h3 className="font-semibold">My Stats</h3>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-2">
             <div className="text-center p-3 bg-muted/30 rounded-xl">
               <div className="text-2xl font-bold">12</div>
               <div className="text-xs text-muted-foreground">Goals</div>
             </div>
             <div className="text-center p-3 bg-muted/30 rounded-xl">
               <div className="text-2xl font-bold">8</div>
               <div className="text-xs text-muted-foreground">Assists</div>
             </div>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-card border rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
             <Play className="h-5 w-5 text-primary" />
             <h3 className="font-semibold">Latest Video</h3>
          </div>
          <div className="aspect-video bg-muted rounded-xl flex items-center justify-center relative overflow-hidden group cursor-pointer">
             <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors z-10" />
             <Play className="h-10 w-10 text-white z-20 opacity-80 group-hover:scale-110 transition-transform" />
          </div>
          <div className="text-sm font-medium text-center">Last Match Highlights</div>
        </motion.div>
      </div>
    </motion.div>
  )
}
