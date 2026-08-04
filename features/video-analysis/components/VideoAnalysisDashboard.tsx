"use client"

import { useState } from "react"
import { Play, Video, Search, Filter, UploadCloud, Link as LinkIcon, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { AIHighlightInterface } from "./AIHighlightInterface"

export function VideoAnalysisDashboard() {
  const [activeTab, setActiveTab] = useState("library")

  return (
    <div className="flex flex-col gap-8 h-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Video Analysis</h1>
          <p className="text-muted-foreground">Manage match footage, training videos, and AI highlights.</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <Button variant="outline"><LinkIcon className="mr-2 h-4 w-4" /> Connect Veo</Button>
          <Button><UploadCloud className="mr-2 h-4 w-4" /> Upload Video</Button>
        </div>
      </div>

      {/* Integration Status */}
      <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
            Veo
          </div>
          <div>
            <h4 className="font-semibold text-sm">Veo Connected</h4>
            <p className="text-xs text-muted-foreground flex items-center gap-4">
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-success" /> Video sync enabled</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="h-3 w-3 text-success" /> Auto-highlights ready</span>
            </p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="text-muted-foreground">Settings</Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-4 border-b">
              {["Library", "AI Highlights", "Player Analysis"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab.toLowerCase())}
                  className={`pb-2 text-sm font-semibold transition-colors border-b-2 ${activeTab === tab.toLowerCase() ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                </button>
              ))}
            </div>
            
            <div className="hidden md:flex relative w-64">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search videos..." className="pl-8 h-8 text-sm bg-muted/50" />
            </div>
          </div>

          {activeTab === "library" && (
            <div className="grid sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-video bg-muted rounded-xl overflow-hidden mb-3">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Video className="h-8 w-8 text-muted-foreground/30" />
                    </div>
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center pl-1 shadow-lg transform scale-90 group-hover:scale-100 transition-transform">
                        <Play className="h-6 w-6" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs font-mono px-1.5 py-0.5 rounded">
                      90:00
                    </div>
                  </div>
                  <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">OPA U15 vs Mexico City FC</h4>
                  <p className="text-xs text-muted-foreground">Match • May 24, 2026</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === "ai highlights" && (
            <AIHighlightInterface />
          )}

          {activeTab === "player analysis" && (
            <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed rounded-2xl bg-muted/20">
              <Search className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-semibold">Player Analysis Module</h3>
              <p className="text-sm text-muted-foreground">Select AI Highlights to see the interactive component.</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-card border rounded-xl p-4 shadow-sm">
            <h3 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">Recent Uploads</h3>
            <div className="space-y-4">
              {[
                { title: "Training Session 04", time: "2 hours ago" },
                { title: "U17 Goalkeeper Drills", time: "5 hours ago" },
                { title: "Weekend Highlights", time: "1 day ago" }
              ].map((item, i) => (
                <div key={i} className="flex gap-3 group cursor-pointer">
                  <div className="h-12 w-20 shrink-0 bg-muted rounded-md relative overflow-hidden flex items-center justify-center">
                     <Video className="h-4 w-4 text-muted-foreground/50" />
                     <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-sm font-semibold group-hover:text-primary transition-colors line-clamp-1">{item.title}</span>
                    <span className="text-xs text-muted-foreground">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
