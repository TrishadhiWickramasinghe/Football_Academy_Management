"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { parentService } from "@/features/parent-portal/services/parent.service"
import { ChildProfile } from "@/features/parent-portal/types/parent.types"
import { Loader2, UserCircle, ChevronRight, Activity, Calendar } from "lucide-react"

export default function ParentChildrenPage() {
  const { user } = useAuth()
  const [children, setChildren] = useState<ChildProfile[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function load() {
      if (!user) return;
      try {
        const data = await parentService.getChildren(user.id);
        setChildren(data);
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    load();
  }, [user])

  if (isLoading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Children</h1>
          <p className="text-muted-foreground mt-1">Manage and view profiles for your registered children.</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {children.map(child => (
          <Link key={child.id} href={`/dashboard/parent/children/${child.id}`}>
            <div className="bg-card border rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-primary/50 transition-all group">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-16 w-16 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold">
                  {child.avatarUrl || child.firstName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">{child.fullName}</h3>
                  <p className="text-sm text-muted-foreground">{child.teamName} • {child.ageGroupName}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-muted/30 p-3 rounded-xl">
                  <div className="text-xs text-muted-foreground mb-1">Development Phase</div>
                  <div className="font-semibold text-sm truncate" title={child.developmentPhase}>{child.developmentPhase}</div>
                </div>
                <div className="bg-muted/30 p-3 rounded-xl">
                  <div className="text-xs text-muted-foreground mb-1">Attendance</div>
                  <div className="font-semibold text-sm">{child.attendanceRate}%</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm text-primary font-medium border-t pt-4">
                <span>View Full Profile</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
        {children.length === 0 && (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-xl bg-muted/10">
            <UserCircle className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No children found</h3>
            <p className="text-muted-foreground text-sm">Please contact the academy to link your child's profile to your account.</p>
          </div>
        )}
      </div>
    </div>
  )
}
