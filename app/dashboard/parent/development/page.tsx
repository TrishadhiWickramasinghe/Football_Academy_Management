"use client"
import React, { useEffect, useState } from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { parentService } from "@/features/parent-portal/services/parent.service"
import { ChildProfile, DevelopmentReport } from "@/features/parent-portal/types/parent.types"
import { ChildSwitcher } from "@/features/parent-portal/components/ChildSwitcher"
import { DevelopmentReportCard } from "@/features/parent-portal/components/DevelopmentReportCard"
import { Loader2, Activity } from "lucide-react"

export default function ParentDevelopmentPage() {
  const { user } = useAuth()
  const [children, setChildren] = useState<ChildProfile[]>([])
  const [activeChildId, setActiveChildId] = useState<string | null>(null)
  const [reports, setReports] = useState<DevelopmentReport[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadChildren() {
      if (!user) return;
      try {
        const data = await parentService.getChildren(user.id);
        setChildren(data);
        if (data.length > 0 && !activeChildId) {
          setActiveChildId(data[0].id)
        }
      } catch (e) {
        console.error(e)
      }
    }
    loadChildren();
  }, [user])

  useEffect(() => {
    async function loadReports() {
      if (!activeChildId) return;
      setIsLoading(true);
      try {
        const data = await parentService.getDevelopmentReports(activeChildId);
        setReports(data);
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false);
      }
    }
    loadReports();
  }, [activeChildId])

  if (!user || (children.length === 0 && isLoading)) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in space-y-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Development</h1>
          <p className="text-muted-foreground mt-1">Coach evaluations and progress reports.</p>
        </div>
      </div>

      <ChildSwitcher 
        childrenProfiles={children} 
        activeChildId={activeChildId} 
        onSelect={setActiveChildId} 
        className="mb-6"
      />

      {isLoading ? (
        <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
      ) : reports.length > 0 ? (
        <div className="space-y-6">
          {reports.map(report => (
            <DevelopmentReportCard key={report.id} report={report} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-muted/20 border-2 border-dashed rounded-xl">
          <Activity className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
          <h3 className="text-lg font-semibold">No reports available</h3>
          <p className="text-sm text-muted-foreground">Development reports will appear here once submitted by coaches.</p>
        </div>
      )}
    </div>
  )
}
