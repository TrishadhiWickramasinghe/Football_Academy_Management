"use client"

import { useState } from "react"
import { Trophy, Calendar, Users, MapPin, Search, Filter, Plus, ChevronRight, Activity } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { LiveTournamentBracket } from "./LiveTournamentBracket"
import { LiveMatchUI } from "./LiveMatchUI"

export function TournamentDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto">
      {/* Tournament Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/90 to-primary text-primary-foreground p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full bg-success/20 text-success-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-success/30">
              <span className="flex h-2 w-2 rounded-full bg-success mr-2 animate-pulse"></span>
              Live Tournament
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">U15 International Youth Cup</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium opacity-90">
              <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Mexico City</span>
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> 12 Teams</span>
              <span className="flex items-center gap-1.5"><Activity className="h-4 w-4" /> 32 Matches</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> 24 May – 28 May</span>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="rounded-full shadow-sm">Manage Teams</Button>
            <Button variant="outline" className="rounded-full bg-background/10 border-border/20 hover:bg-background/20 text-primary-foreground">Edit Settings</Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 border-b scrollbar-hide">
        <div className="flex gap-6">
          {["Overview", "Bracket", "Matches", "Teams", "Standings", "Referees", "Statistics"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab.toLowerCase())}
              className={cn(
                "pb-3 text-sm font-semibold transition-colors whitespace-nowrap border-b-2",
                activeTab === tab.toLowerCase() 
                  ? "border-primary text-foreground" 
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="mt-4">
        {activeTab === "overview" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Live Matches</h3>
                <Button variant="ghost" size="sm" className="text-primary h-8">View All <ChevronRight className="ml-1 h-4 w-4" /></Button>
              </div>
              <LiveMatchUI />
            </div>
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Upcoming</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-card border rounded-xl p-4 shadow-sm flex items-center justify-between hover:border-primary/50 cursor-pointer transition-colors">
                    <div className="flex flex-col items-center gap-2 font-bold w-1/3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">O</div>
                      <span className="text-xs truncate max-w-full">OPA U15</span>
                    </div>
                    <div className="flex flex-col items-center justify-center text-xs text-muted-foreground w-1/3">
                      <span className="font-bold text-foreground">14:00</span>
                      <span>Pitch {i}</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 font-bold w-1/3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">E</div>
                      <span className="text-xs truncate max-w-full">Elite FC</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "bracket" && (
          <div className="bg-card border rounded-2xl shadow-sm p-2 md:p-8 overflow-x-auto">
            <LiveTournamentBracket />
          </div>
        )}

        {activeTab !== "overview" && activeTab !== "bracket" && (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-2xl bg-muted/20">
            <Trophy className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Module</h3>
            <p className="text-sm text-muted-foreground">Select Overview or Bracket to see active demo components.</p>
          </div>
        )}
      </div>
    </div>
  )
}
