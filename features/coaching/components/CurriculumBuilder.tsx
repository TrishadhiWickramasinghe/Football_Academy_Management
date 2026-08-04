"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronRight, ChevronDown, FileText, Plus, Search, Filter, BookOpen, GripVertical, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

// Demo Data
const curriculumData = [
  {
    id: "u15",
    title: "U15",
    type: "age_group",
    children: [
      {
        id: "technical",
        title: "Technical Development",
        type: "development_area",
        children: [
          {
            id: "ball_control",
            title: "Ball Control",
            type: "learning_objective",
            children: [
              {
                id: "session_04",
                title: "Session 04",
                subtitle: "Receiving Under Pressure",
                type: "training_session",
                status: "Published",
                completion: 100
              }
            ]
          }
        ]
      }
    ]
  }
]

export function CurriculumBuilder() {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({
    'u15': true,
    'technical': true,
    'ball_control': true
  })
  
  const [selectedMethodology, setSelectedMethodology] = useState("Kimero Method")

  const toggleNode = (id: string) => {
    setExpandedNodes(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const methodologies = ["Kimero Method", "PSG P.A.R.I.S.", "Custom Framework"]

  const renderNode = (node: any, level: number = 0) => {
    const isExpanded = expandedNodes[node.id]
    const hasChildren = node.children && node.children.length > 0
    const isSession = node.type === 'training_session'

    return (
      <div key={node.id} className="w-full">
        <div 
          className={cn(
            "flex items-center gap-3 py-3 px-4 group hover:bg-muted/50 rounded-lg transition-colors relative cursor-pointer",
            level > 0 && "ml-6"
          )}
          onClick={() => hasChildren && toggleNode(node.id)}
        >
          {/* Connector Line */}
          {level > 0 && (
            <div className="absolute -left-3 top-0 bottom-1/2 w-3 border-l-2 border-b-2 border-border rounded-bl-lg"></div>
          )}
          {level > 0 && hasChildren && isExpanded && (
            <div className="absolute -left-3 top-1/2 bottom-0 border-l-2 border-border"></div>
          )}
          
          <div className="text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors cursor-grab">
            <GripVertical className="h-4 w-4" />
          </div>

          <button className="flex h-5 w-5 items-center justify-center rounded-sm hover:bg-muted text-muted-foreground">
            {hasChildren ? (
              isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
          </button>
          
          <div className="flex-1">
            <div className="font-semibold text-sm">{node.title}</div>
            {node.subtitle && <div className="text-xs text-muted-foreground">{node.subtitle}</div>}
          </div>
          
          {isSession && (
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-success/10 text-success border border-success/20">
                <CheckCircle2 className="h-3 w-3" /> {node.status}
              </span>
              <Button variant="ghost" size="sm" className="h-8 text-xs">Edit</Button>
            </div>
          )}
          
          {!isSession && (
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity">
              <Plus className="h-4 w-4" />
            </Button>
          )}
        </div>
        
        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="relative">
                {/* Vertical line connecting children */}
                {level === 0 && <div className="absolute left-[1.125rem] top-0 bottom-0 border-l-2 border-border"></div>}
                
                <div className="flex flex-col gap-1">
                  {node.children.map((child: any) => renderNode(child, level + 1))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-8 h-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Curriculum Builder</h1>
          <p className="text-muted-foreground">Manage methodologies, development areas, and training sessions.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline"><BookOpen className="mr-2 h-4 w-4" /> Methodologies</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> New Session</Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-[300px_1fr] gap-8 items-start">
        {/* Sidebar */}
        <div className="bg-card border rounded-xl shadow-sm p-4 space-y-6">
          <div>
            <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Methodology</h3>
            <div className="space-y-2">
              {methodologies.map(method => (
                <button
                  key={method}
                  onClick={() => setSelectedMethodology(method)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors",
                    selectedMethodology === method 
                      ? "bg-primary text-primary-foreground font-medium shadow-sm" 
                      : "hover:bg-muted text-muted-foreground hover:text-foreground"
                  )}
                >
                  {method}
                  {selectedMethodology === method && <CheckCircle2 className="h-4 w-4 opacity-70" />}
                </button>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t">
            <h3 className="font-semibold text-sm mb-3 text-muted-foreground uppercase tracking-wider">Filters</h3>
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search objectives..." className="pl-8 bg-muted/50 border-0" />
              </div>
              <Button variant="outline" className="w-full justify-start text-muted-foreground"><Filter className="mr-2 h-4 w-4" /> Age Group</Button>
            </div>
          </div>
        </div>

        {/* Builder Area */}
        <div className="bg-card border rounded-xl shadow-sm overflow-hidden min-h-[500px] flex flex-col">
          <div className="border-b bg-muted/30 px-6 py-4 flex justify-between items-center">
            <h2 className="font-bold text-lg flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              {selectedMethodology}
            </h2>
            <div className="text-sm text-muted-foreground font-medium px-3 py-1 bg-muted rounded-full">
              Draft Auto-saved
            </div>
          </div>
          <div className="p-4 flex-1">
            <div className="space-y-2">
              {curriculumData.map(node => renderNode(node))}
              
              <Button variant="ghost" className="w-full justify-start text-muted-foreground border-2 border-dashed border-border/50 hover:border-primary/30 hover:bg-primary/5 mt-4">
                <Plus className="mr-2 h-4 w-4" /> Add Age Group
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
