"use client"
import React, { useState } from "react"
import { Match } from "../types/match.types"
import { matchesService } from "../services/matches.service"
import { Button } from "@/components/ui/button"
import { Trophy, Clock, Flag, Square, ShieldAlert } from "lucide-react"

export function LiveScoreEntry({ match, onScoreUpdate }: { match: Match, onScoreUpdate: () => void }) {
  const [homeScore, setHomeScore] = useState(match.homeScore)
  const [awayScore, setAwayScore] = useState(match.awayScore)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleUpdate = async (type: "home" | "away", delta: number) => {
    if (match.locked) return;
    setIsUpdating(true)
    
    const newHome = type === "home" ? Math.max(0, homeScore + delta) : homeScore;
    const newAway = type === "away" ? Math.max(0, awayScore + delta) : awayScore;
    
    try {
      await matchesService.updateScore(match.id, newHome, newAway);
      setHomeScore(newHome)
      setAwayScore(newAway)
      onScoreUpdate()
    } catch(e) {
      console.error(e)
    } finally {
      setIsUpdating(false)
    }
  }

  if (match.locked) {
    return (
      <div className="bg-muted p-6 rounded-xl border text-center">
        <ShieldAlert className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <h4 className="font-bold">Match Locked</h4>
        <p className="text-sm text-muted-foreground">Final results have been verified and locked.</p>
      </div>
    )
  }

  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden animate-in fade-in">
      <div className="p-4 bg-muted/30 border-b flex justify-between items-center">
        <div className="font-bold">{match.round}</div>
        <div className="text-sm flex items-center text-success font-semibold animate-pulse">
          <span className="w-2 h-2 rounded-full bg-success mr-2" /> 32:15
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
          <div className="w-px h-full bg-border" />
          <div className="absolute bg-muted px-2 py-1 rounded text-xs font-bold text-muted-foreground uppercase border">VS</div>
        </div>

        {/* Home Team */}
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-xl font-bold truncate px-4" title={match.homeTeamName}>{match.homeTeamName}</h3>
            <p className="text-sm text-muted-foreground">Home</p>
          </div>
          
          <div className="text-7xl font-black text-primary tracking-tighter tabular-nums">
            {homeScore}
          </div>
          
          <div className="flex justify-center gap-2">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-16 h-16 rounded-full text-2xl" 
              onClick={() => handleUpdate("home", -1)}
              disabled={isUpdating || homeScore === 0}
            >
              -
            </Button>
            <Button 
              variant="default" 
              size="lg" 
              className="w-16 h-16 rounded-full text-2xl bg-primary" 
              onClick={() => handleUpdate("home", 1)}
              disabled={isUpdating}
            >
              +
            </Button>
          </div>
          
          <div className="flex justify-center gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" className="w-full text-xs" disabled={isUpdating}>
              <Square className="w-3 h-3 text-amber-500 fill-amber-500 mr-2" /> Yellow
            </Button>
            <Button variant="outline" size="sm" className="w-full text-xs" disabled={isUpdating}>
              <Square className="w-3 h-3 text-destructive fill-destructive mr-2" /> Red
            </Button>
          </div>
        </div>

        {/* Away Team */}
        <div className="text-center space-y-6">
          <div>
            <h3 className="text-xl font-bold truncate px-4" title={match.awayTeamName}>{match.awayTeamName}</h3>
            <p className="text-sm text-muted-foreground">Away</p>
          </div>
          
          <div className="text-7xl font-black text-primary tracking-tighter tabular-nums">
            {awayScore}
          </div>
          
          <div className="flex justify-center gap-2">
            <Button 
              variant="outline" 
              size="lg" 
              className="w-16 h-16 rounded-full text-2xl" 
              onClick={() => handleUpdate("away", -1)}
              disabled={isUpdating || awayScore === 0}
            >
              -
            </Button>
            <Button 
              variant="default" 
              size="lg" 
              className="w-16 h-16 rounded-full text-2xl bg-primary" 
              onClick={() => handleUpdate("away", 1)}
              disabled={isUpdating}
            >
              +
            </Button>
          </div>
          
          <div className="flex justify-center gap-2 pt-4 border-t">
            <Button variant="outline" size="sm" className="w-full text-xs" disabled={isUpdating}>
              <Square className="w-3 h-3 text-amber-500 fill-amber-500 mr-2" /> Yellow
            </Button>
            <Button variant="outline" size="sm" className="w-full text-xs" disabled={isUpdating}>
              <Square className="w-3 h-3 text-destructive fill-destructive mr-2" /> Red
            </Button>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-muted/20 border-t flex gap-2">
        <Button variant="outline" className="w-full"><Flag className="w-4 h-4 mr-2" /> Note</Button>
        <Button variant="outline" className="w-full bg-background"><Clock className="w-4 h-4 mr-2" /> Half Time</Button>
        <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">End Match</Button>
      </div>
    </div>
  )
}
