"use client"
import React, { useEffect, useState } from "react"
import Link from "next/link"
import { useTenant } from "@/features/tenants/contexts/TenantContext"
import { tournamentsService } from "@/features/tournaments/services/tournaments.service"
import { Tournament } from "@/features/tournaments/types/tournament.types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Calendar, MapPin, Search, Filter, Plus, Users, Loader2 } from "lucide-react"

export default function TournamentsListPage() {
  const { tenant, isLoading: isTenantLoading } = useTenant()
  const [tournaments, setTournaments] = useState<Tournament[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  useEffect(() => {
    async function load() {
      if (!tenant) return;
      setIsLoading(true);
      try {
        const data = await tournamentsService.getTournaments(tenant.id);
        setTournaments(data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }
    if (!isTenantLoading) {
      load();
    }
  }, [tenant, isTenantLoading]);

  if (isTenantLoading || isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!tenant) {
    return <div>Organisation not found</div>
  }

  const liveTournaments = tournaments.filter(t => t.status === "live").length;
  const upcomingTournaments = tournaments.filter(t => ["draft", "registration_open", "registration_closed", "scheduled"].includes(t.status)).length;
  const completedTournaments = tournaments.filter(t => t.status === "completed").length;

  const filteredTournaments = tournaments.filter(t => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (searchQuery && !t.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary/90 to-primary text-primary-foreground p-8">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-black tracking-tight">Tournaments</h1>
            <p className="opacity-90 mt-2 max-w-xl">Create, schedule, manage and broadcast football tournaments.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="secondary" className="rounded-full shadow-sm" asChild>
              <Link href="/dashboard/tournaments/new"><Plus className="w-4 h-4 mr-2" /> Create Tournament</Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Live Now</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold flex items-center gap-3">
              {liveTournaments} 
              {liveTournaments > 0 && <span className="flex h-3 w-3 rounded-full bg-success animate-pulse" />}
            </div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Upcoming</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{upcomingTournaments}</div>
          </CardContent>
        </Card>
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedTournaments}</div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-card border rounded-xl p-4 shadow-sm">
        <div className="relative flex-1 max-w-md w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search tournaments..." 
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto hide-scrollbar pb-1 sm:pb-0">
          {["all", "live", "scheduled", "registration_open", "completed"].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 text-sm font-medium rounded-full whitespace-nowrap transition-colors ${
                statusFilter === status 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {status.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase())}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTournaments.length === 0 ? (
          <div className="col-span-full py-12 text-center bg-card border rounded-xl border-dashed">
            <Trophy className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <h3 className="text-lg font-semibold">No tournaments found</h3>
            <p className="text-muted-foreground">Create your first tournament to start managing matches.</p>
            <Button className="mt-4" variant="outline" asChild>
              <Link href="/dashboard/tournaments/new">Create Tournament</Link>
            </Button>
          </div>
        ) : (
          filteredTournaments.map(tournament => (
            <Link key={tournament.id} href={`/dashboard/tournaments/${tournament.id}`}>
              <Card className="hover:shadow-lg transition-all group hover:border-primary/50 cursor-pointer h-full flex flex-col">
                <CardContent className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <TournamentBadge status={tournament.status} />
                    <span className="text-xs font-medium text-muted-foreground uppercase bg-muted px-2 py-1 rounded">
                      {tournament.format.replace("_", " ")}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">{tournament.name}</h3>
                  <div className="space-y-2 mt-auto pt-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}</div>
                    {tournament.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {tournament.location}</div>}
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {tournament.ageGroups.length} Age Groups</div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

function TournamentBadge({ status }: { status: string }) {
  const configs: Record<string, { label: string, classes: string, dot?: boolean }> = {
    live: { label: "Live Now", classes: "bg-success/10 text-success border-success/20", dot: true },
    scheduled: { label: "Scheduled", classes: "bg-blue-100 text-blue-800 border-blue-200" },
    registration_open: { label: "Reg. Open", classes: "bg-amber-100 text-amber-800 border-amber-200" },
    registration_closed: { label: "Reg. Closed", classes: "bg-slate-100 text-slate-800 border-slate-200" },
    completed: { label: "Completed", classes: "bg-muted text-muted-foreground border-border" },
    draft: { label: "Draft", classes: "bg-muted text-muted-foreground border-border" },
  }
  const config = configs[status] || configs.draft;
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${config.classes}`}>
      {config.dot && <span className="w-1.5 h-1.5 rounded-full bg-current mr-1.5 animate-pulse" />}
      {config.label}
    </span>
  )
}
