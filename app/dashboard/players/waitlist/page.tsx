"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Clock } from "lucide-react"

export default function WaitlistDashboard() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Waitlist Queue</h1>
          <p className="text-muted-foreground mt-1">Manage players waiting for team placements.</p>
        </div>
      </div>

      <div className="bg-card border rounded-xl p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Clock className="w-8 h-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-bold mb-2">No Players on Waitlist</h3>
        <p className="text-muted-foreground max-w-md mx-auto mb-6">
          There are currently no players on the waitlist for any age group. 
          When teams reach capacity, new registrations will automatically be queued here.
        </p>
        <Button asChild>
          <Link href="/dashboard/players">Return to Directory</Link>
        </Button>
      </div>
    </div>
  )
}
