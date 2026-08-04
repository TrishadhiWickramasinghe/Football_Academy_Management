"use client"
import React, { useState } from "react"
import { Match } from "../types/match.types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MapPin, Clock, AlertTriangle, Play, Settings2 } from "lucide-react"

export function ScheduleBuilder({ matches }: { matches: Match[] }) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [schedule, setSchedule] = useState<Match[]>(matches)
  const [showConflict, setShowConflict] = useState(false)

  const handleGenerate = () => {
    setIsGenerating(true)
    setTimeout(() => {
      setIsGenerating(false)
      setShowConflict(true) // Simulate a conflict
    }, 1500)
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold">Schedule Builder</h3>
          <p className="text-sm text-muted-foreground mt-1">Automatically generate or manually tweak match schedules.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Settings2 className="w-4 h-4 mr-2" /> Settings</Button>
          <Button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? "Generating..." : "Auto-Generate Schedule"}
          </Button>
        </div>
      </div>

      {showConflict && (
        <div className="bg-destructive/10 border-destructive/20 border rounded-xl p-4 flex gap-3 text-destructive animate-in slide-in-from-top-2">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div>
            <h4 className="font-semibold text-sm">Scheduling Conflict Detected</h4>
            <p className="text-sm opacity-90">Academy Blue has a match at 14:30 and 15:00 on Field 1. Minimum rest requirement (30m) is not met.</p>
          </div>
        </div>
      )}

      <div className="bg-card border rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
              <tr>
                <th className="px-4 py-3 font-medium">Time</th>
                <th className="px-4 py-3 font-medium">Match</th>
                <th className="px-4 py-3 font-medium">Field</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {schedule.map(m => (
                <tr key={m.id} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> {m.startTime}</div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-medium">{m.homeTeamName} vs {m.awayTeamName}</div>
                    <div className="text-xs text-muted-foreground">{m.round}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {m.fieldId === "fld_1" ? "Field 1" : "Field 2"}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-muted">
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              ))}
              {schedule.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No matches scheduled yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
