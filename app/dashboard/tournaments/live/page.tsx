"use client";

import React, { useState, useEffect } from 'react';
import * as motion from 'framer-motion/client';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { Timer, Goal, AlertTriangle, UserMinus, Plus } from 'lucide-react';

export default function LiveScoringPage() {
  const [homeScore, setHomeScore] = useState(2);
  const [awayScore, setAwayScore] = useState(1);
  const [minute, setMinute] = useState(67);
  const [lastEvent, setLastEvent] = useState<string | null>(null);

  // Simulate a live timer
  useEffect(() => {
    const timer = setInterval(() => {
      setMinute((prev) => (prev >= 90 ? 90 : prev + 1));
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  const handleGoal = (team: 'home' | 'away') => {
    if (team === 'home') setHomeScore(prev => prev + 1);
    else setAwayScore(prev => prev + 1);
    setLastEvent(`Goal scored by ${team === 'home' ? 'Home' : 'Away'} team!`);
    
    // Clear event toast after 3 seconds
    setTimeout(() => setLastEvent(null), 3000);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-4 lg:p-8 space-y-8 max-w-5xl mx-auto"
    >
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Live Match Control</h1>
          <p className="text-muted-foreground mt-1">U16 Championship Final • Pitch 1</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 text-destructive rounded-full border border-destructive/20 animate-pulse">
            <div className="w-2 h-2 rounded-full bg-destructive"></div>
            <span className="text-sm font-semibold tracking-wider">LIVE</span>
          </div>
        </div>
      </motion.div>

      {/* Scoreboard */}
      <motion.div variants={fadeUp} className="bg-card border rounded-2xl shadow-lg overflow-hidden">
        <div className="p-8 md:p-12 text-center bg-muted/30 relative">
          
          {/* Last Event Toast */}
          {lastEvent && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium animate-in slide-in-from-top-4 fade-in duration-300 shadow-md">
              {lastEvent}
            </div>
          )}

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-6">
            <Timer className="w-5 h-5" />
            <span className="text-xl font-mono tracking-wider">{minute}:42</span>
          </div>

          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {/* Home Team */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 bg-muted rounded-full mb-4 flex items-center justify-center">
                 <span className="font-bold text-muted-foreground">HOME</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold">Manchester Utd U16</h2>
            </div>

            {/* Score */}
            <div className="flex items-center gap-6 px-8">
              <motion.span key={homeScore} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl md:text-8xl font-black tabular-nums">
                {homeScore}
              </motion.span>
              <span className="text-4xl text-muted-foreground opacity-50">—</span>
              <motion.span key={awayScore} initial={{ scale: 1.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-6xl md:text-8xl font-black tabular-nums">
                {awayScore}
              </motion.span>
            </div>

            {/* Away Team */}
            <div className="flex flex-col items-center flex-1">
              <div className="w-20 h-20 bg-muted rounded-full mb-4 flex items-center justify-center">
                 <span className="font-bold text-muted-foreground">AWAY</span>
              </div>
              <h2 className="text-xl md:text-2xl font-bold">Arsenal Academy U16</h2>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="grid grid-cols-2 divide-x border-t">
          <div className="p-6 space-y-4">
            <h3 className="font-semibold text-center mb-4 text-muted-foreground">Home Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleGoal('home')} className="flex items-center justify-center gap-2 p-3 bg-success/10 text-success hover:bg-success/20 rounded-lg transition-colors font-medium">
                <Goal className="w-4 h-4" /> Goal
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-warning/10 text-warning hover:bg-warning/20 rounded-lg transition-colors font-medium">
                <AlertTriangle className="w-4 h-4" /> Yellow
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors font-medium">
                <UserMinus className="w-4 h-4" /> Red
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors font-medium text-muted-foreground">
                <Plus className="w-4 h-4" /> Sub
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-4">
            <h3 className="font-semibold text-center mb-4 text-muted-foreground">Away Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleGoal('away')} className="flex items-center justify-center gap-2 p-3 bg-success/10 text-success hover:bg-success/20 rounded-lg transition-colors font-medium">
                <Goal className="w-4 h-4" /> Goal
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-warning/10 text-warning hover:bg-warning/20 rounded-lg transition-colors font-medium">
                <AlertTriangle className="w-4 h-4" /> Yellow
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors font-medium">
                <UserMinus className="w-4 h-4" /> Red
              </button>
              <button className="flex items-center justify-center gap-2 p-3 bg-muted hover:bg-muted/80 rounded-lg transition-colors font-medium text-muted-foreground">
                <Plus className="w-4 h-4" /> Sub
              </button>
            </div>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}
