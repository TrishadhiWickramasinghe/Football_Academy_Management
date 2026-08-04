"use client"
import React from "react"
import { StandingsEntry } from "../types/match.types"

export function StandingsTable({ standings }: { standings: StandingsEntry[] }) {
  if (standings.length === 0) {
    return <div className="text-center py-8 text-muted-foreground">No standings data available yet.</div>
  }

  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden animate-in fade-in">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/50 text-muted-foreground uppercase text-xs">
            <tr>
              <th className="px-4 py-3 font-medium w-12 text-center">Pos</th>
              <th className="px-4 py-3 font-medium">Team</th>
              <th className="px-4 py-3 font-medium text-center">P</th>
              <th className="px-4 py-3 font-medium text-center">W</th>
              <th className="px-4 py-3 font-medium text-center">D</th>
              <th className="px-4 py-3 font-medium text-center">L</th>
              <th className="px-4 py-3 font-medium text-center">GF</th>
              <th className="px-4 py-3 font-medium text-center">GA</th>
              <th className="px-4 py-3 font-medium text-center">GD</th>
              <th className="px-4 py-3 font-bold text-center text-primary">Pts</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {standings.map((team, idx) => (
              <tr key={team.teamId} className={`hover:bg-muted/30 transition-colors ${idx < 2 ? "bg-success/5" : ""}`}>
                <td className="px-4 py-3 font-medium text-center">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${idx === 0 ? "bg-amber-100 text-amber-700 font-bold" : idx === 1 ? "bg-slate-100 text-slate-700 font-bold" : ""}`}>
                    {team.position}
                  </span>
                </td>
                <td className="px-4 py-3 font-bold">{team.teamName}</td>
                <td className="px-4 py-3 text-center">{team.played}</td>
                <td className="px-4 py-3 text-center text-success">{team.won}</td>
                <td className="px-4 py-3 text-center text-muted-foreground">{team.drawn}</td>
                <td className="px-4 py-3 text-center text-destructive">{team.lost}</td>
                <td className="px-4 py-3 text-center">{team.goalsFor}</td>
                <td className="px-4 py-3 text-center">{team.goalsAgainst}</td>
                <td className="px-4 py-3 text-center font-medium">{team.goalDifference > 0 ? `+${team.goalDifference}` : team.goalDifference}</td>
                <td className="px-4 py-3 text-center font-bold text-primary">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
