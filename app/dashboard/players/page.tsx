"use client"
import React, { useState, useEffect } from "react"
import Link from "next/link"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { Player } from "@/features/players/types/player.types"
import { playersService } from "@/features/players/services/players.service"
import { PLAYER_STATUS } from "@/features/players/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Users, Search, Filter, MoreHorizontal, Loader2, Plus, Download } from "lucide-react"

// A simple Badge component using Tailwind
const Badge = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${className || "bg-gray-100 text-gray-800"}`}>
    {children}
  </span>
)

export default function PlayersDashboard() {
  const { tenant, isLoading: isTenantLoading } = useTenant()
  const [players, setPlayers] = useState<Player[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    if (tenant) {
      loadPlayers()
    } else if (!isTenantLoading) {
      setIsLoading(false)
    }
  }, [tenant, isTenantLoading])

  const loadPlayers = async () => {
    setIsLoading(true)
    try {
      const data = await playersService.getPlayers(tenant!.id)
      setPlayers(data)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    return PLAYER_STATUS.find(s => s.value === status)?.color || ""
  }

  const filteredPlayers = players.filter(p => {
    if (activeTab !== "all" && p.status.toLowerCase() !== activeTab) return false
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      return p.fullName.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
    }
    return true
  })

  // KPI calculations
  const totalCount = players.length
  const activeCount = players.filter(p => p.status === "Active").length
  const trialCount = players.filter(p => p.status === "Trial").length
  const waitlistCount = players.filter(p => p.status === "Waitlist").length

  if (isTenantLoading) return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-muted-foreground" /></div>
  if (!tenant) return <div className="p-8 text-center">Organisation Not Found</div>

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players</h1>
          <p className="text-muted-foreground mt-1">Manage registrations, development, teams and player records.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Import Players
          </Button>
          <Button asChild className="gap-2">
            <Link href="/dashboard/players/new">
              <Plus className="w-4 h-4" /> Register Player
            </Link>
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Players", value: totalCount, icon: Users, color: "text-blue-600", bg: "bg-blue-100" },
          { label: "Active", value: activeCount, icon: Users, color: "text-green-600", bg: "bg-green-100" },
          { label: "Trials", value: trialCount, icon: Users, color: "text-amber-600", bg: "bg-amber-100" },
          { label: "Waitlist", value: waitlistCount, icon: Users, color: "text-purple-600", bg: "bg-purple-100" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="bg-card border rounded-xl shadow-sm overflow-hidden flex flex-col">
        
        {/* Toolbar */}
        <div className="p-4 border-b space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between bg-muted/10">
          <div className="flex items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search players..." 
                className="pl-9 bg-background"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="px-3" title="Filters">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="flex p-1 bg-muted/50 rounded-lg overflow-x-auto hide-scrollbar">
            {["all", "active", "trial", "waitlist", "alumni"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-md capitalize whitespace-nowrap transition-colors ${
                  activeTab === tab ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
              <p>Loading players...</p>
            </div>
          ) : filteredPlayers.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">No Players Found</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                {searchQuery ? "Try changing your search term." : "Start building your academy roster by registering your first player."}
              </p>
              {!searchQuery && (
                <Button asChild>
                  <Link href="/dashboard/players/new">Register Player</Link>
                </Button>
              )}
            </div>
          ) : (
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-muted/30 text-muted-foreground border-b uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3 font-medium">Player</th>
                  <th className="px-6 py-3 font-medium">Age Group</th>
                  <th className="px-6 py-3 font-medium">Position</th>
                  <th className="px-6 py-3 font-medium">Team</th>
                  <th className="px-6 py-3 font-medium">Phase</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPlayers.map((player) => (
                  <tr key={player.id} className="hover:bg-muted/20 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-sm shrink-0 border border-primary/20">
                          {player.fullName.split(' ').map(n => n[0]).join('').substring(0,2)}
                        </div>
                        <div>
                          <Link href={`/dashboard/players/${player.id}`} className="font-semibold text-foreground hover:text-primary transition-colors hover:underline">
                            {player.fullName}
                          </Link>
                          <div className="text-xs text-muted-foreground">{player.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium">{player.ageGroup}</td>
                    <td className="px-6 py-4 text-muted-foreground">{player.primaryPosition}</td>
                    <td className="px-6 py-4 text-muted-foreground">{player.currentTeamName || "—"}</td>
                    <td className="px-6 py-4 text-muted-foreground">{player.developmentPhase || "—"}</td>
                    <td className="px-6 py-4">
                      <Badge className={getStatusColor(player.status)}>
                        {player.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity" title="Actions">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
