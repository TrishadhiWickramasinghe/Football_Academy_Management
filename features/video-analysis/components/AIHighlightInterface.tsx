"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Loader2, Sparkles } from "lucide-react"

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
    <div className="bg-gray-50 border border-gray-100 rounded-3xl shadow-sm p-8 max-w-2xl w-full">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-4">
        <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
          <Sparkles className="h-6 w-6 text-purple-600" />
          AI Highlights
        </h3>
        {!isProcessing && !isDone && (
          <button onClick={startProcessing} className="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2.5 rounded-full shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5">
            Generate Highlights
          </button>
        )}
      </div>

      {!isProcessing && !isDone && (
        <div className="text-center py-12 flex flex-col items-center gap-4">
          <div className="h-20 w-20 bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <Sparkles className="h-10 w-10 text-purple-600" />
          </div>
          <p className="text-gray-500 font-medium max-w-sm">Select a video and click generate to let our AI find key moments, goals, and opportunities automatically.</p>
        </div>
      )}

      {isProcessing && (
        <div className="py-8 space-y-8">
          <div className="flex items-center justify-between font-bold text-gray-900">
            <span className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-purple-600" />
              Processing video...
            </span>
            <span className="text-purple-600 text-xl">{Math.floor(progress)}%</span>
          </div>
          
          <div className="h-3 w-full bg-gray-200 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Detected</div>
              <div className="font-black text-2xl text-gray-900 flex items-center gap-2">
                <span className="text-purple-600">{Math.floor(progress * 0.12)}</span> <span className="text-sm font-bold mt-1">Key Passes</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Detected</div>
              <div className="font-black text-2xl text-gray-900 flex items-center gap-2">
                <span className="text-red-500">{Math.floor(progress * 0.08)}</span> <span className="text-sm font-bold mt-1">Shots</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Detected</div>
              <div className="font-black text-2xl text-gray-900 flex items-center gap-2">
                <span className="text-green-500">{Math.floor(progress * 0.05)}</span> <span className="text-sm font-bold mt-1">Defensive</span>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
              <div className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Detected</div>
              <div className="font-black text-2xl text-gray-900 flex items-center gap-2">
                <span className="text-orange-500">{Math.floor(progress * 0.03)}</span> <span className="text-sm font-bold mt-1">Chances</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {isDone && (
        <div className="py-8 text-center flex flex-col items-center">
           <div className="h-20 w-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Sparkles className="h-10 w-10 text-green-600" />
          </div>
          <h4 className="text-2xl font-black text-gray-900 mb-2">Highlights Ready!</h4>
          <p className="text-gray-500 font-medium mb-8">Our AI has successfully tagged 24 key moments in this video.</p>
          <button onClick={() => {setIsDone(false); setProgress(0)}} className="bg-white border border-gray-200 text-gray-700 font-bold px-8 py-3 rounded-full shadow-sm hover:shadow-md transition-all hover:bg-gray-50">
            Process Another Video
          </button>
        </div>
      )}
    </div>
  )
}
