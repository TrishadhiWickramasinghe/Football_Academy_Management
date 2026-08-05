"use client"
import React, { useState } from "react"
import Link from "next/link"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { MOCK_TRIALS } from "@/features/players/services/players.service"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon, Clock, MapPin, User, ChevronRight } from "lucide-react"

export default function TrialsDashboard() {
  const { tenant } = useTenant()
  const [trials] = useState(MOCK_TRIALS)

  if (!tenant) return null;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trials & Evaluations</h1>
          <p className="text-muted-foreground mt-1">Manage prospective players and evaluation sessions.</p>
        </div>
        <Button>Schedule Trial</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trials.map(trial => (
          <Card key={trial.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <Badge status={trial.status} />
                <span className="text-xs font-mono text-muted-foreground">{trial.id}</span>
              </div>
              <CardTitle className="text-lg mt-2">{trial.playerId}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground gap-2">
                  <CalendarIcon className="w-4 h-4" /> {new Date(trial.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-muted-foreground gap-2">
                  <Clock className="w-4 h-4" /> {trial.time}
                </div>
                <div className="flex items-center text-muted-foreground gap-2">
                  <MapPin className="w-4 h-4" /> {trial.location}
                </div>
                <div className="flex items-center text-muted-foreground gap-2">
                  <User className="w-4 h-4" /> Evaluator: {trial.coachName}
                </div>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link href={`/dashboard/players/${trial.playerId}?tab=evaluations`}>View Details <ChevronRight className="w-4 h-4 ml-1"/></Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

function Badge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    "Scheduled": "bg-blue-100 text-blue-800 border-blue-200",
    "Completed": "bg-green-100 text-green-800 border-green-200",
    "Cancelled": "bg-red-100 text-red-800 border-red-200",
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colors[status] || "bg-gray-100"}`}>
      {status}
    </span>
  )
}
