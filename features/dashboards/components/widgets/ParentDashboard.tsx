"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { motion, Variants } from "framer-motion"
import { Calendar, Activity, CreditCard, ChevronRight, Loader2 } from "lucide-react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { parentService } from "@/features/parent-portal/services/parent.service"
import { ChildProfile, ParentEvent, DevelopmentReport, ParentInvoice } from "@/features/parent-portal/types/parent.types"
import { ChildSwitcher } from "@/features/parent-portal/components/ChildSwitcher"

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
  const [children, setChildren] = useState<ChildProfile[]>([])
  const [activeChildId, setActiveChildId] = useState<string | null>(null)
  
  const [nextEvent, setNextEvent] = useState<ParentEvent | null>(null)
  const [latestReport, setLatestReport] = useState<DevelopmentReport | null>(null)
  const [invoices, setInvoices] = useState<ParentInvoice[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const data = await parentService.getChildren(user.id);
        setChildren(data);
        if (data.length > 0 && !activeChildId) {
          setActiveChildId(data[0].id)
        }
        
        const invs = await parentService.getInvoices(user.id);
        setInvoices(invs);
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    load();
  }, [user])

  useEffect(() => {
    async function loadChildData() {
      if (!activeChildId) return;
      try {
        const events = await parentService.getSchedule(activeChildId);
        if (events.length > 0) setNextEvent(events[0]);
        else setNextEvent(null);

        const reports = await parentService.getDevelopmentReports(activeChildId);
        if (reports.length > 0) setLatestReport(reports[0]);
        else setLatestReport(null);
      } catch (e) {
        console.error(e)
      }
    }
    loadChildData();
  }, [activeChildId])
  
  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  }

  const outstandingInvoices = invoices.filter(i => i.status !== "paid");
  
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

      {children.length > 0 && (
        <motion.div variants={itemVariants}>
          <ChildSwitcher 
            childrenProfiles={children}
            activeChildId={activeChildId}
            onSelect={setActiveChildId}
          />
        </motion.div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <motion.div variants={itemVariants}>
          <Link href="/dashboard/parent/schedule" className="block bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/50 transition-all h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-500/10 text-blue-500 rounded-lg">
                  <Calendar className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Next Session</h3>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            {nextEvent ? (
              <div className="space-y-1">
                <div className="text-lg font-bold">{nextEvent.title}</div>
                <div className="text-sm text-muted-foreground">{new Date(nextEvent.date).toLocaleDateString()} • {nextEvent.startTime}</div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No upcoming sessions.</div>
            )}
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Link href="/dashboard/parent/development" className="block bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/50 transition-all h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-green-500/10 text-green-500 rounded-lg">
                  <Activity className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Latest Evaluation</h3>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            {latestReport ? (
              <div className="space-y-1">
                <div className="text-lg font-bold">{latestReport.title}</div>
                <div className="text-sm text-muted-foreground text-success font-medium">Overall: {latestReport.overallScore}/5</div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">No recent evaluations.</div>
            )}
          </Link>
        </motion.div>
        
        <motion.div variants={itemVariants} className="sm:col-span-2">
          <Link href="/dashboard/parent/payments" className="block bg-card border rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-primary/50 transition-all h-full">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-orange-500/10 text-orange-500 rounded-lg">
                  <CreditCard className="h-5 w-5" />
                </div>
                <h3 className="font-semibold">Payments</h3>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            {outstandingInvoices.length > 0 ? (
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-xl">
                <div>
                  <div className="font-medium text-sm">{outstandingInvoices[0].description}</div>
                  <div className="text-xs text-destructive font-semibold">Due: {new Date(outstandingInvoices[0].dueDate).toLocaleDateString()}</div>
                </div>
                <div className="font-bold tabular-nums">${outstandingInvoices[0].amount.toFixed(2)}</div>
              </div>
            ) : (
              <div className="text-sm text-muted-foreground">All payments are up to date.</div>
            )}
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
