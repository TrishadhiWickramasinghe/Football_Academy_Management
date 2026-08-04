"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, Tag, Edit3, Settings2, SkipBack, SkipForward, Maximize, PlayCircle, Loader2, Sparkles, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"

export function AIHighlightInterface() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isDone, setIsDone] = useState(false)

  const startProcessing = () => {
    setIsProcessing(true)
    setProgress(0)
    setIsDone(false)
  }

  useEffect(() => {
    if (isProcessing && progress < 100) {
      const timer = setTimeout(() => {
        setProgress(prev => Math.min(prev + (Math.random() * 15), 100))
      }, 500)
      return () => clearTimeout(timer)
    } else if (progress >= 100) {
      setTimeout(() => {
        setIsProcessing(false)
        setIsDone(true)
      }, 0)
    }
  }, [isProcessing, progress])

  return (
    <div className="bg-card border rounded-2xl shadow-sm p-6 max-w-2xl mx-auto w-full">
      <div className="flex items-center justify-between mb-6 border-b pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-ai" />
          AI Highlights
        </h3>
        {!isProcessing && !isDone && (
          <Button onClick={startProcessing} className="bg-ai hover:bg-ai/90 text-ai-foreground">
            Generate Highlights
          </Button>
        )}
      </div>

      {!isProcessing && !isDone && (
        <div className="text-center py-12 text-muted-foreground flex flex-col items-center gap-4">
          <Sparkles className="h-12 w-12 text-muted-foreground/30" />
          <p>Select a video and click generate to let our AI find key moments, goals, and opportunities.</p>
        </div>
      )}

      {isProcessing && (
        <div className="py-8 space-y-6">
          <div className="flex items-center justify-between font-semibold">
            <span className="flex items-center gap-2">
              <Loader2 className="h-5 w-5 animate-spin text-ai" />
              Processing video...
            </span>
            <span className="text-ai font-bold">{Math.floor(progress)}%</span>
          </div>
          
          <div className="h-3 w-full bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-ai to-ai/70"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Detected</div>
              <div className="font-bold text-lg flex items-center gap-2">
                <span className="text-ai">{Math.floor(progress * 0.12)}</span> Key Passes
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Detected</div>
              <div className="font-bold text-lg flex items-center gap-2">
                <span className="text-destructive">{Math.floor(progress * 0.08)}</span> Shots
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Detected</div>
              <div className="font-bold text-lg flex items-center gap-2">
                <span className="text-success">{Math.floor(progress * 0.05)}</span> Defensive Actions
              </div>
            </div>
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Detected</div>
              <div className="font-bold text-lg flex items-center gap-2">
                <span className="text-warning">{Math.floor(progress * 0.03)}</span> Goal Opportunities
              </div>
            </div>
          </div>
        </div>
      )}

      {isDone && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-6 space-y-6 text-center"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-success/10 text-success mb-2">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h4 className="text-xl font-bold mb-2">AI Generated Highlights Ready</h4>
            <p className="text-muted-foreground">12 key moments detected across 4 categories.</p>
          </div>
          
          <div className="flex gap-4 justify-center">
            <Button variant="outline" onClick={() => setIsDone(false)}>Clear</Button>
            <Button className="bg-ai hover:bg-ai/90 text-ai-foreground">
              <PlayCircle className="mr-2 h-5 w-5" /> View Highlights
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
