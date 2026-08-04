"use client"
import React, { useState, useEffect } from "react"
import { tournamentsService } from "@/features/tournaments/services/tournaments.service"
import { matchesService } from "@/features/tournaments/services/matches.service"
import { Tournament } from "@/features/tournaments/types/tournament.types"
import { Match, StandingsEntry } from "@/features/tournaments/types/match.types"
import { StandingsTable } from "@/features/tournaments/components/StandingsTable"
import { LiveTournamentBracket } from "@/features/tournaments/components/LiveTournamentBracket"
import { Loader2, Calendar, MapPin, Users, Share2, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PublicTournamentPage({ params }: { params: { tournamentSlug: string } }) {
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [matches, setMatches] = useState<Match[]>([])
  const [standings, setStandings] = useState<StandingsEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("live")

  // For simplicity in this demo, we'll fetch the first tournament. 
  // In a real app, we'd query by publicSlug.
  useEffect(() => {
    async function load() {
      try {
        const trns = await tournamentsService.getTournaments("tenant_1");
        const found = trns.find(t => t.publicSlug === params.tournamentSlug) || trns[0];
        setTournament(found);
        
        if (found) {
          const m = await matchesService.getMatchesByTournament(found.id);
          setMatches(m);
          
          if (found.ageGroups.length > 0) {
            const s = await matchesService.getStandings(found.id, found.ageGroups[0].id);
            setStandings(s);
          }
        }
      } catch(e) {
        console.error(e)
      } finally {
        setIsLoading(false)
      }
    }
    load();
  }, [params.tournamentSlug])

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!tournament) {
    return <div className="p-12 text-center text-xl font-bold">Tournament not found</div>
  }

  const liveMatches = matches.filter(m => m.status === "live");

  return (
    <div className="min-h-screen bg-background">
      {/* Public Header */}
      <div className="bg-slate-900 text-white pt-16 pb-8 px-6 border-b-4 border-primary">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="space-y-4">
            {tournament.status === "live" && (
              <div className="inline-flex items-center rounded-full bg-red-500/20 text-red-400 px-3 py-1 text-xs font-bold uppercase tracking-wider border border-red-500/30">
                <span className="flex h-2 w-2 rounded-full bg-red-500 mr-2 animate-pulse"></span>
                Live Broadcast
              </div>
            )}
            <h1 className="text-4xl md:text-6xl font-black tracking-tight">{tournament.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium opacity-80">
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {new Date(tournament.startDate).toLocaleDateString()}</span>
              {tournament.location && <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {tournament.location}</span>}
              <span className="flex items-center gap-1.5"><Users className="w-4 h-4" /> {tournament.ageGroups.length} Age Groups</span>
            </div>
          </div>
          <div>
            <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-slate-900/95 sticky top-0 z-50 border-b border-slate-800 backdrop-blur">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex space-x-8 overflow-x-auto hide-scrollbar">
            {["Live", "Standings", "Bracket", "Schedule", "Awards"].map(tab => {
              const id = tab.toLowerCase();
              return (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`py-4 text-sm font-bold uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                    activeTab === id ? "border-primary text-primary" : "border-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12 animate-in fade-in">
        {activeTab === "live" && (
          <div className="space-y-8">
            <h2 className="text-2xl font-bold flex items-center gap-2"><Activity className="text-red-500" /> Live Matches</h2>
            
            {liveMatches.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-6">
                {liveMatches.map(m => (
                  <div key={m.id} className="bg-card border rounded-2xl shadow-md overflow-hidden relative group">
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />
                    <div className="p-3 bg-muted/30 border-b text-xs font-bold uppercase flex justify-between">
                      <span className="text-muted-foreground">{m.round} • {m.ageGroupId === "ag_1" ? "U13" : "U15"}</span>
                      <span className="text-red-500 animate-pulse">32'</span>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-4">
                        <div className="font-bold text-lg truncate w-1/3">{m.homeTeamName}</div>
                        <div className="text-3xl font-black bg-muted px-4 py-2 rounded-lg tabular-nums">
                          {m.homeScore} <span className="text-muted-foreground font-normal mx-1">-</span> {m.awayScore}
                        </div>
                        <div className="font-bold text-lg truncate w-1/3 text-right">{m.awayTeamName}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center text-muted-foreground border-2 border-dashed rounded-xl">
                No live matches to broadcast currently.
              </div>
            )}
          </div>
        )}

        {activeTab === "standings" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Group Standings</h2>
            <StandingsTable standings={standings} />
          </div>
        )}

        {activeTab === "bracket" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Knockout Bracket</h2>
            <div className="bg-card border rounded-2xl p-6 overflow-x-auto shadow-sm">
              <LiveTournamentBracket />
            </div>
          </div>
        )}

        {["schedule", "awards"].includes(activeTab) && (
          <div className="py-24 text-center">
            <h2 className="text-2xl font-bold text-muted-foreground">Information will be available soon</h2>
          </div>
        )}
      </div>
    </div>
  )
}
