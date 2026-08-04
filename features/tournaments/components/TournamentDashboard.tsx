"use client"

import { useState, useEffect } from "react"
import { Trophy, Calendar, Users, MapPin, Search, Filter, Plus, ChevronRight, Activity, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { LiveTournamentBracket } from "./LiveTournamentBracket"
import { LiveMatchUI } from "./LiveMatchUI"
import { ScheduleBuilder } from "./ScheduleBuilder"
import { StandingsTable } from "./StandingsTable"
import { LiveScoreEntry } from "./LiveScoreEntry"
import { tournamentsService } from "../services/tournaments.service"
import { matchesService } from "../services/matches.service"
import { Tournament } from "../types/tournament.types"
import { Match, StandingsEntry } from "../types/match.types"

export function TournamentDashboard({ tournamentId }: { tournamentId?: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [standings, setStandings] = useState<StandingsEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadData = async () => {
    if (!tournamentId) return;
    try {
      const [tData, mData] = await Promise.all([
        tournamentsService.getTournament(tournamentId),
        matchesService.getMatchesByTournament(tournamentId)
      ]);
      setTournament(tData);
      setMatches(mData);
      
      if (tData && tData.ageGroups.length > 0) {
        const sData = await matchesService.getStandings(tournamentId, tData.ageGroups[0].id);
        setStandings(sData);
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadData();
  }, [tournamentId]);

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!tournament) {
    return <div className="p-6">Tournament not found</div>
  }

  const liveMatches = matches.filter(m => m.status === "live");
  const upcomingMatches = matches.filter(m => ["scheduled", "warm_up"].includes(m.status));

  return (
    <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Tournament Header */}
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/90 to-primary text-primary-foreground p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10 mix-blend-overlay"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            {tournament.status === "live" && (
              <div className="inline-flex items-center rounded-full bg-success/20 text-success-foreground px-3 py-1 text-xs font-bold uppercase tracking-wider backdrop-blur-sm border border-success/30">
                <span className="flex h-2 w-2 rounded-full bg-success mr-2 animate-pulse"></span>
                Live Tournament
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-black tracking-tight">{tournament.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium opacity-90">
              {tournament.location && <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {tournament.location}</span>}
              <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {tournament.ageGroups.length} Age Groups</span>
              <span className="flex items-center gap-1.5"><Activity className="h-4 w-4" /> {matches.length} Matches</span>
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4" /> {new Date(tournament.startDate).toLocaleDateString()}</span>
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
          {["Overview", "Matches", "Schedule", "Standings", "Bracket", "Teams"].map((tab) => (
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
                <Button variant="ghost" size="sm" className="text-primary h-8" onClick={() => setActiveTab("matches")}>
                  View All <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
              
              {liveMatches.length > 0 ? (
                liveMatches.map(m => (
                  <LiveScoreEntry key={m.id} match={m} onScoreUpdate={loadData} />
                ))
              ) : (
                <div className="p-8 border border-dashed rounded-xl text-center bg-muted/20 text-muted-foreground">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  No live matches at the moment.
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Upcoming</h3>
              <div className="space-y-4">
                {upcomingMatches.length > 0 ? (
                  upcomingMatches.map((m) => (
                    <div key={m.id} className="bg-card border rounded-xl p-4 shadow-sm flex items-center justify-between hover:border-primary/50 cursor-pointer transition-colors">
                      <div className="flex flex-col items-center gap-2 font-bold w-1/3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">{m.homeTeamName.charAt(0)}</div>
                        <span className="text-xs truncate max-w-full">{m.homeTeamName}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center text-xs text-muted-foreground w-1/3">
                        <span className="font-bold text-foreground">{m.startTime}</span>
                        <span>{m.fieldId === "fld_1" ? "Field 1" : "Field 2"}</span>
                      </div>
                      <div className="flex flex-col items-center gap-2 font-bold w-1/3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">{m.awayTeamName.charAt(0)}</div>
                        <span className="text-xs truncate max-w-full">{m.awayTeamName}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-8 border border-dashed rounded-xl text-center bg-muted/20 text-muted-foreground text-sm">
                    No upcoming matches.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "matches" && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold">All Matches & Live Scoring</h3>
            {matches.map(m => (
              <LiveScoreEntry key={m.id} match={m} onScoreUpdate={loadData} />
            ))}
          </div>
        )}

        {activeTab === "schedule" && (
          <ScheduleBuilder matches={matches} />
        )}

        {activeTab === "standings" && (
          <div className="space-y-4">
            <div className="flex gap-2">
              {tournament.ageGroups.map(ag => (
                <Button key={ag.id} variant="secondary" size="sm">{ag.name}</Button>
              ))}
            </div>
            <StandingsTable standings={standings} />
          </div>
        )}

        {activeTab === "bracket" && (
          <div className="bg-card border rounded-2xl shadow-sm p-2 md:p-8 overflow-x-auto">
            <LiveTournamentBracket />
          </div>
        )}

        {activeTab === "teams" && (
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-2xl bg-muted/20">
            <Users className="h-12 w-12 text-muted-foreground/30 mb-4" />
            <h3 className="text-lg font-semibold">Teams Management</h3>
            <p className="text-sm text-muted-foreground">Manage registrations and waitlists.</p>
          </div>
        )}
      </div>
    </div>
  )
}
