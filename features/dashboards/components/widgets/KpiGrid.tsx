import { motion } from "framer-motion"
import { TrendingUp, TrendingDown, Minus, Building2, Users, DollarSign, Activity, Users2, FileText, ArrowUpRight, ArrowDownRight, UserPlus } from "lucide-react"
import { KpiMetrics } from "../../types/dashboard.types"
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

interface KpiGridProps {
  metrics?: KpiMetrics
  isLoading: boolean
}

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

function KpiCard({ title, value, trend, percentageChange, previousValue, icon: Icon, isLoading }: any) {
  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </div>
          <div className="mt-4 flex flex-col gap-1">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-3 w-32 mt-1" />
          </div>
        </CardContent>
      </Card>
    )
  }

  const isUp = trend === "up"
  const isDown = trend === "down"
  const isNeutral = trend === "neutral"
  
  // For negative metrics like churn, down is good. Let's assume standard up=good for most.
  // This can be customized per metric later.
  const TrendIcon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus
  const trendColor = isUp ? "text-success" : isDown ? "text-destructive" : "text-muted-foreground"

  return (
    <motion.div variants={itemVariants}>
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-muted-foreground">{title}</div>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-4 w-4 text-primary" />
            </div>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <div className="text-3xl font-bold tracking-tight">
              {value}
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs text-muted-foreground">
            <span className={`flex items-center font-medium mr-2 ${trendColor}`}>
              <TrendIcon className="mr-1 h-3 w-3" />
              {percentageChange}%
            </span>
            <span>vs prev period ({previousValue})</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function KpiGrid({ metrics, isLoading }: KpiGridProps) {
  if (isLoading || !metrics) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <KpiCard key={i} isLoading={true} />
        ))}
      </div>
    )
  }

  return (
    <motion.div 
      variants={containerVariants} 
      initial="hidden" 
      animate="show"
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
    >
      <KpiCard title="Total Organisations" {...metrics.totalOrganisations} icon={Building2} />
      <KpiCard title="Active Organisations" {...metrics.activeOrganisations} icon={Activity} />
      <KpiCard title="Total Players" {...metrics.totalPlayers} icon={Users} />
      <KpiCard title="Active Coaches" {...metrics.activeCoaches} icon={Users2} />
      
      <KpiCard title="MRR" {...metrics.mrr} icon={DollarSign} />
      <KpiCard title="ARR" {...metrics.arr} icon={DollarSign} />
      <KpiCard title="Monthly Revenue" {...metrics.monthlyRevenue} icon={TrendingUp} />
      <KpiCard title="Outstanding Invoices" {...metrics.outstandingInvoices} icon={FileText} />
      
      <KpiCard title="New Organisations" {...metrics.newOrganisations} icon={Building2} />
      <KpiCard title="New Players" {...metrics.newPlayers} icon={UserPlus} />
      <KpiCard title="Active Users" {...metrics.activeUsers} icon={Users} />
      <KpiCard title="Churn Rate" {...metrics.churnRate} icon={TrendingDown} />
    </motion.div>
  )
}
