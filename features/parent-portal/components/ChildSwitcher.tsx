"use client"
import React from "react"
import { ChildProfile } from "../types/parent.types"
import { cn } from "@/lib/utils"

interface ChildSwitcherProps {
  childrenProfiles: ChildProfile[];
  activeChildId: string | null;
  onSelect: (childId: string) => void;
  className?: string;
}

export function ChildSwitcher({ childrenProfiles, activeChildId, onSelect, className }: ChildSwitcherProps) {
  if (!childrenProfiles || childrenProfiles.length === 0) return null;

  return (
    <div className={cn("flex gap-3 overflow-x-auto pb-2 hide-scrollbar", className)}>
      {childrenProfiles.map((child) => {
        const isActive = activeChildId === child.id;
        return (
          <button
            key={child.id}
            onClick={() => onSelect(child.id)}
            className={`flex items-center gap-3 p-3 rounded-2xl border transition-all min-w-[160px] ${
              isActive 
                ? "bg-primary text-primary-foreground border-primary shadow-md" 
                : "bg-card hover:bg-muted/50"
            }`}
          >
            <div className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center font-bold ${
              isActive ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
            }`}>
              {child.avatarUrl || child.firstName.charAt(0)}
            </div>
            <div className="text-left overflow-hidden">
              <div className="font-semibold text-sm truncate">{child.firstName}</div>
              <div className={`text-xs truncate ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {child.teamName}
              </div>
            </div>
          </button>
        )
      })}
    </div>
  )
}
