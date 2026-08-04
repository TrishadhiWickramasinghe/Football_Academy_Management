"use client"
import React, { useState } from "react"
import { ParentEvent } from "../types/parent.types"
import { parentService } from "../services/parent.service"
import { Calendar, MapPin, Clock, CheckCircle2, XCircle, HelpCircle } from "lucide-react"

export function ParentScheduleList({ events, childId }: { events: ParentEvent[], childId: string }) {
  const [localEvents, setLocalEvents] = useState(events)

  const handleRsvp = async (eventId: string, status: "going" | "not_going" | "maybe") => {
    try {
      // Optimistic update
      setLocalEvents(prev => prev.map(e => e.id === eventId ? { ...e, rsvpStatus: status } : e))
      await parentService.updateRsvp(eventId, childId, status);
    } catch (e) {
      console.error("Failed to RSVP", e)
    }
  }

  if (localEvents.length === 0) {
    return (
      <div className="p-8 text-center bg-muted/20 border border-dashed rounded-xl">
        <Calendar className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
        <p className="text-muted-foreground">No upcoming events found.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {localEvents.map(event => (
        <div key={event.id} className="bg-card border rounded-2xl p-4 shadow-sm animate-in fade-in slide-in-from-bottom-2">
          <div className="flex justify-between items-start mb-3">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                {event.type}
              </div>
              <h3 className="font-bold text-lg leading-tight">{event.title}</h3>
            </div>
            <div className="text-right">
              <div className="font-bold">{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {event.startTime} - {event.endTime}</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {event.location}</span>
          </div>

          <div className="flex items-center gap-2 pt-4 border-t">
            <span className="text-xs font-semibold mr-auto">RSVP:</span>
            <button 
              onClick={() => handleRsvp(event.id, "going")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                event.rsvpStatus === "going" ? "bg-success/20 text-success border border-success/30" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Going
            </button>
            <button 
              onClick={() => handleRsvp(event.id, "not_going")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                event.rsvpStatus === "not_going" ? "bg-destructive/20 text-destructive border border-destructive/30" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <XCircle className="w-3.5 h-3.5" /> Not Going
            </button>
            <button 
              onClick={() => handleRsvp(event.id, "maybe")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
                event.rsvpStatus === "maybe" ? "bg-amber-100 text-amber-700 border border-amber-200" : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" /> Maybe
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
