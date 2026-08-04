"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { parentService } from "@/features/parent-portal/services/parent.service"
import { ChildProfile } from "@/features/parent-portal/types/parent.types"
import { Loader2, ArrowLeft, Calendar, Activity, Trophy, Shield, User } from "lucide-react"

export default function ParentChildProfilePage({ params }: { params: { id: string } }) {
  const [child, setChild] = useState<ChildProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const data = await parentService.getChild(params.id);
        setChild(data);
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    load();
  }, [params.id])

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  }

  if (!child) {
    return <div className="p-12 text-center font-bold">Profile not found.</div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in space-y-8">
      <Link href="/dashboard/parent/children" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to My Children
      </Link>

      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden relative">
        <div className="h-32 bg-gradient-to-r from-primary to-primary/80 absolute top-0 left-0 right-0" />
        <div className="p-6 pt-16 relative z-10 flex flex-col sm:flex-row items-center sm:items-end gap-6 text-center sm:text-left">
          <div className="h-28 w-28 shrink-0 rounded-full bg-background p-1 shadow-lg">
            <div className="h-full w-full rounded-full bg-primary/10 flex items-center justify-center text-4xl font-bold text-primary">
              {child.avatarUrl || child.firstName.charAt(0)}
            </div>
          </div>
          <div className="flex-1 space-y-1">
            <h1 className="text-3xl font-black tracking-tight">{child.fullName}</h1>
            <p className="text-muted-foreground font-medium">{child.teamName} • {child.position} • #{child.jerseyNumber}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Age Group", value: child.ageGroupName, icon: User },
          { label: "DOB", value: new Date(child.dateOfBirth).toLocaleDateString(), icon: Calendar },
          { label: "Phase", value: child.developmentPhase, icon: Activity },
          { label: "Attendance", value: `${child.attendanceRate}%`, icon: Shield },
        ].map((stat, idx) => (
          <div key={idx} className="bg-muted/30 border rounded-xl p-4 flex flex-col items-center justify-center text-center">
            <stat.icon className="w-5 h-5 text-muted-foreground mb-2" />
            <div className="text-xs text-muted-foreground uppercase tracking-wider font-semibold mb-1">{stat.label}</div>
            <div className="font-bold">{stat.value}</div>
          </div>
        ))}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-card border rounded-2xl p-6 shadow-sm">
          <h3 className="text-lg font-bold flex items-center gap-2 mb-4"><Calendar className="text-primary w-5 h-5" /> Quick Links</h3>
          <div className="space-y-2">
            <Link href={`/dashboard/parent/schedule?child=${child.id}`} className="block p-3 rounded-lg hover:bg-muted transition-colors font-medium text-sm border border-transparent hover:border-border">
              View Schedule
            </Link>
            <Link href={`/dashboard/parent/development?child=${child.id}`} className="block p-3 rounded-lg hover:bg-muted transition-colors font-medium text-sm border border-transparent hover:border-border">
              View Development Reports
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
