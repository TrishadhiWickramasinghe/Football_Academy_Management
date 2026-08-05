"use client"
import React, { useEffect, useState } from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { parentService } from "@/features/parent-portal/services/parent.service"
import { ChildProfile, ParentEvent } from "@/features/parent-portal/types/parent.types"
import { ChildSwitcher } from "@/features/parent-portal/components/ChildSwitcher"
import { ParentScheduleList } from "@/features/parent-portal/components/ParentScheduleList"
import { Loader2 } from "lucide-react"

export default function ParentSchedulePage() {
  const { user } = useAuth()
  const [children, setChildren] = useState<ChildProfile[]>([])
  const [activeChildId, setActiveChildId] = useState<string | null>(null)
  const [events, setEvents] = useState<ParentEvent[]>([])
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
    async function loadEvents() {
      if (!activeChildId) return;
      setIsLoading(true);
      try {
        const data = await parentService.getSchedule(activeChildId);
        setEvents(data);
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false);
      }
    }
    loadEvents();
  }, [activeChildId])

  if (!user || (children.length === 0 && isLoading)) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  }

  return (
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in space-y-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
          <p className="text-muted-foreground mt-1">Upcoming training and matches.</p>
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
      ) : activeChildId ? (
        <ParentScheduleList events={events} childId={activeChildId} />
      ) : null}
    </div>
  )
}
