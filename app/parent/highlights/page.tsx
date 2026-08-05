"use client"
import React, { useEffect, useState } from "react"
import { useAuth } from "@/features/auth/hooks/useAuth"
import { parentService } from "@/features/parent-portal/services/parent.service"
import { ChildProfile, HighlightClip } from "@/features/parent-portal/types/parent.types"
import { ChildSwitcher } from "@/features/parent-portal/components/ChildSwitcher"
import { HighlightGallery } from "@/features/parent-portal/components/HighlightGallery"
import { Loader2 } from "lucide-react"

export default function ParentHighlightsPage() {
  const { user } = useAuth()
  const [children, setChildren] = useState<ChildProfile[]>([])
  const [activeChildId, setActiveChildId] = useState<string | null>(null)
  const [highlights, setHighlights] = useState<HighlightClip[]>([])
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
    async function loadHighlights() {
      if (!activeChildId) return;
      setIsLoading(true);
      try {
        const data = await parentService.getHighlights(activeChildId);
        setHighlights(data);
      } catch (e) {
        console.error(e)
      } finally {
        setIsLoading(false);
      }
    }
    loadHighlights();
  }, [activeChildId])

  if (!user || (children.length === 0 && isLoading)) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  }

  return (
    <div className="p-6 max-w-6xl mx-auto animate-in fade-in space-y-6">
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Highlights</h1>
          <p className="text-muted-foreground mt-1">Match clips and training highlights.</p>
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
        <HighlightGallery highlights={highlights} />
      ) : null}
    </div>
  )
}
