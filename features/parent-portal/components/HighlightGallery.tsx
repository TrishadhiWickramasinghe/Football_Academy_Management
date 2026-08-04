"use client"
import React, { useState } from "react"
import { HighlightClip } from "../types/parent.types"
import { Play, Calendar, Trophy, X } from "lucide-react"

export function HighlightGallery({ highlights }: { highlights: HighlightClip[] }) {
  const [playingClip, setPlayingClip] = useState<HighlightClip | null>(null)

  if (highlights.length === 0) {
    return (
      <div className="p-8 text-center bg-muted/20 border border-dashed rounded-xl">
        <Play className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
        <p className="text-muted-foreground">No highlights available yet.</p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {highlights.map(clip => (
          <div 
            key={clip.id} 
            className="group cursor-pointer bg-card border rounded-2xl shadow-sm overflow-hidden animate-in fade-in transition-all hover:shadow-md hover:border-primary/50"
            onClick={() => setPlayingClip(clip)}
          >
            <div className="relative aspect-video w-full bg-muted overflow-hidden">
              <img 
                src={clip.thumbnailUrl} 
                alt={clip.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-12 h-12 bg-primary/90 text-primary-foreground rounded-full flex items-center justify-center pl-1 shadow-lg">
                  <Play className="w-5 h-5" />
                </div>
              </div>
              <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-sm">
                0:{clip.durationSeconds.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">{clip.title}</h4>
              <div className="text-xs text-muted-foreground space-y-1">
                <div className="flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5" /> {clip.matchName}
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {new Date(clip.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Video Modal (Simulated) */}
      {playingClip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-2xl">
            <button 
              onClick={() => setPlayingClip(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-video w-full bg-slate-900 flex flex-col items-center justify-center text-white relative">
              <img 
                src={playingClip.thumbnailUrl} 
                alt={playingClip.title} 
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />
              <div className="relative z-10 flex flex-col items-center">
                <Play className="w-16 h-16 text-primary mb-4 animate-pulse" />
                <h3 className="text-xl font-bold mb-2">{playingClip.title}</h3>
                <p className="text-slate-300 text-sm">Simulating video playback via external provider...</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
