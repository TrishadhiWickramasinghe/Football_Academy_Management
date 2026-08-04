"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Activity, Trophy, CreditCard, BrainCircuit, Sparkles, TrendingUp, Zap, Target, LineChart } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
}

export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <motion.div 
      className="flex flex-1 flex-col gap-6 md:gap-10 p-2 md:p-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 dark:from-primary dark:to-purple-400">
            Academy Intelligence
          </h1>
          <p className="text-muted-foreground mt-1 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            AI-powered insights and academy overview
          </p>
        </div>
        <Button className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity border-0 shadow-lg shadow-purple-500/25 text-white">
          <BrainCircuit className="mr-2 h-4 w-4" />
          Generate AI Report
        </Button>
      </motion.div>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
        {[
          { title: "Total Players", value: "245", change: "+12", trend: "up", icon: Users, color: "from-blue-500 to-cyan-400" },
          { title: "Performance Score", value: "94.2", change: "+2.4", trend: "up", icon: Target, color: "from-emerald-500 to-teal-400" },
          { title: "Active Tournaments", value: "3", change: "1 ending", trend: "neutral", icon: Trophy, color: "from-orange-500 to-amber-400" },
          { title: "Monthly Revenue", value: "$12,450", change: "+8%", trend: "up", icon: CreditCard, color: "from-purple-500 to-pink-400" },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} whileHover={{ y: -5 }} transition={{ type: "spring", stiffness: 300 }}>
            <Card className="relative overflow-hidden border-0 shadow-lg group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 group-hover:opacity-20 transition-opacity duration-500`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg bg-gradient-to-br ${stat.color} text-white shadow-sm`}>
                  <stat.icon className="h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="relative z-10">
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs font-medium text-emerald-500 flex items-center gap-1 mt-1">
                  <TrendingUp className="w-3 h-3" />
                  {stat.change} from last month
                </p>
              </CardContent>
              {/* Decorative background element */}
              <div className={`absolute -right-6 -bottom-6 w-24 h-24 bg-gradient-to-br ${stat.color} rounded-full blur-2xl opacity-20 group-hover:scale-150 transition-transform duration-700 ease-out`} />
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        {/* AI Analysis Section */}
        <motion.div variants={itemVariants} className="xl:col-span-2 h-full">
          <Card className="h-full border-0 shadow-lg overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <BrainCircuit className="w-5 h-5 text-purple-500" />
                    AI Performance Predictor
                  </CardTitle>
                  <CardDescription>Machine learning insights for upcoming fixtures</CardDescription>
                </div>
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/50 dark:text-purple-300 dark:border-purple-800">
                  <Zap className="w-3 h-3 mr-1 fill-current" />
                  Live Model
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3 mb-6">
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
                  <div className="text-sm text-muted-foreground mb-1">Win Probability</div>
                  <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">78%</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "78%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                      className="bg-emerald-500 h-full rounded-full"
                    />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
                  <div className="text-sm text-muted-foreground mb-1">Injury Risk</div>
                  <div className="text-2xl font-bold text-amber-500">Low</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "15%" }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                      className="bg-amber-500 h-full rounded-full"
                    />
                  </div>
                </div>
                <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-inner">
                  <div className="text-sm text-muted-foreground mb-1">Tactical Match</div>
                  <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">92%</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-2 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "92%" }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                      className="bg-indigo-500 h-full rounded-full"
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 relative overflow-hidden">
                <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
                <h4 className="font-semibold flex items-center gap-2 mb-2 text-primary">
                  <Sparkles className="w-4 h-4" />
                  AI Recommendation
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Based on recent training telemetry and opponent historical data, shifting to a 4-3-3 formation with high pressing in the first 20 minutes yields the highest probability of success. Key player readiness is optimal.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Activity Feed */}
        <motion.div variants={itemVariants} className="h-full">
          <Card className="h-full border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-blue-500" />
                System Activity
              </CardTitle>
              <CardDescription>Real-time academy updates</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              {[
                { title: "Tactical analysis complete", desc: "U15 Elite vs. Rovers FC", time: "2 min ago", icon: LineChart, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
                { title: "New player registered", desc: "Mateo Hernandez joined U15 Elite.", time: "1 hour ago", icon: Users, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
                { title: "Payment processed", desc: "Monthly fees collected: $4,200", time: "3 hours ago", icon: CreditCard, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
              ].map((activity, i) => (
                <motion.div 
                  key={i} 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 1 + (i * 0.2) }}
                  className="flex items-start gap-4 group"
                >
                  <div className={`w-10 h-10 rounded-full ${activity.bg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <activity.icon className={`w-5 h-5 ${activity.color}`} />
                  </div>
                  <div className="grid gap-1">
                    <p className="text-sm font-semibold leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.desc}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-xs text-muted-foreground shrink-0 whitespace-nowrap">
                    {activity.time}
                  </div>
                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
}
