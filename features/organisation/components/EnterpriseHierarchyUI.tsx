"use client"

import { useState } from "react"
import { Building2, MapPin, Users, Target, ChevronRight, ChevronDown, Plus, Search, MoreHorizontal, Globe } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Demo Data
const hierarchyData = [
  {
    id: "fed",
    name: "National Federation",
    type: "Federation",
    stats: { locations: 42, academies: 156, athletes: 12450 },
    children: [
      {
        id: "reg-north",
        name: "Region North",
        type: "Region",
        stats: { locations: 12, academies: 45, athletes: 3200 },
        children: [
          {
            id: "acad-a",
            name: "Premier Academy North",
            type: "Academy",
            stats: { teams: 8, athletes: 145, coaches: 12 },
            children: [
              {
                id: "team-u15",
                name: "U15 Elite",
                type: "Team",
                stats: { athletes: 18, coaches: 2 }
              },
              {
                id: "team-u17",
                name: "U17 Pro",
                type: "Team",
                stats: { athletes: 22, coaches: 3 }
              }
            ]
          }
        ]
      },
      {
        id: "reg-south",
        name: "Region South",
        type: "Region",
        stats: { locations: 15, academies: 60, athletes: 4500 },
        children: []
      },
      {
        id: "reg-central",
        name: "Region Central",
        type: "Region",
        stats: { locations: 15, academies: 51, athletes: 4750 },
        children: []
      }
    ]
  }
]

export function EnterpriseHierarchyUI() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'fed': true,
    'reg-north': true,
    'acad-a': true
  })

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const renderStats = (stats: any, type: string) => {
    if (type === 'Team') {
      return (
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {stats.athletes} Athletes</span>
          <span className="flex items-center gap-1"><Target className="h-3 w-3" /> {stats.coaches} Coaches</span>
        </div>
      )
    }
    
    if (type === 'Academy') {
      return (
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {stats.teams} Teams</span>
          <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {stats.athletes} Athletes</span>
        </div>
      )
    }

    return (
      <div className="flex gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {stats.locations} Locations</span>
        <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {stats.academies} Academies</span>
        <span className="flex items-center gap-1"><Users className="h-3 w-3" /> {(stats.athletes / 1000).toFixed(1)}k Athletes</span>
      </div>
    )
  }

  const renderNode = (node: any, level: number = 0) => {
    const isExpanded = expandedNodes[node.id]
    const hasChildren = node.children && node.children.length > 0

    return (
      <div key={node.id} className="w-full relative">
        <div 
          className={cn(
            "flex items-center gap-4 py-3 px-4 group hover:bg-muted/50 rounded-xl transition-colors relative cursor-pointer border border-transparent hover:border-border/50",
            level > 0 && "ml-8"
          )}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {/* Connector Lines */}
          {level > 0 && (
            <div className="absolute -left-4 top-0 bottom-1/2 w-4 border-l-2 border-b-2 border-border/60 rounded-bl-xl z-0"></div>
          )}
          {level > 0 && hasChildren && isExpanded && (
            <div className="absolute -left-4 top-1/2 bottom-0 border-l-2 border-border/60 z-0"></div>
          )}

          <div className="relative z-10 flex items-center justify-center h-6 w-6 shrink-0">
            {hasChildren ? (
              <button className="flex h-6 w-6 items-center justify-center rounded bg-background border shadow-sm hover:bg-muted text-foreground transition-colors">
                {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
              </button>
            ) : (
              <div className="h-2 w-2 rounded-full bg-border"></div>
            )}
          </div>
          
          <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
            {node.type === 'Federation' && <Globe className="h-5 w-5" />}
            {node.type === 'Region' && <MapPin className="h-5 w-5" />}
            {node.type === 'Academy' && <Building2 className="h-5 w-5" />}
            {node.type === 'Team' && <Users className="h-5 w-5" />}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm truncate">{node.name}</h4>
              <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground shrink-0">{node.type}</span>
            </div>
            <div className="mt-1">
              {renderStats(node.stats, node.type)}
            </div>
          </div>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 shrink-0">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={(e) => { e.stopPropagation() }}>
              <Plus className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-primary" onClick={(e) => { e.stopPropagation() }}>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="relative">
             {/* Vertical line connecting children */}
             {level === 0 && <div className="absolute left-[1.125rem] top-0 bottom-0 border-l-2 border-border/60 z-0"></div>}
             {level > 0 && <div className="absolute left-[3.125rem] top-0 bottom-0 border-l-2 border-border/60 z-0"></div>}
            
            <div className="flex flex-col relative z-10 pt-1 pb-2">
              {node.children.map((child: any) => renderNode(child, level + 1))}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 h-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Organisation Hierarchy</h1>
          <p className="text-muted-foreground">Manage your regions, academies, and teams in one place.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search organisation..." className="pl-8 bg-muted/50" />
          </div>
          <Button><Plus className="mr-2 h-4 w-4" /> Add Unit</Button>
        </div>
      </div>

      <div className="bg-card border rounded-2xl shadow-sm overflow-hidden min-h-[500px]">
        <div className="border-b bg-muted/30 px-6 py-4 flex justify-between items-center">
          <h2 className="font-bold text-sm uppercase tracking-wider text-muted-foreground">Structure Overview</h2>
          <div className="flex gap-4 text-sm font-medium">
             <span className="text-primary cursor-pointer hover:underline">Expand All</span>
             <span className="text-muted-foreground cursor-pointer hover:text-foreground">Collapse All</span>
          </div>
        </div>
        
        <div className="p-4 md:p-6 overflow-x-auto">
          <div className="min-w-[600px]">
            {hierarchyData.map(node => renderNode(node))}
          </div>
        </div>
      </div>
    </div>
  )
}


