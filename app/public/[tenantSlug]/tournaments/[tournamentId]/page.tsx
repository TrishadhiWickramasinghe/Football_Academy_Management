"use client";

import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { Trophy, Calendar, MapPin, Search } from 'lucide-react';

export default function PublicTournamentPage({ params }: { params: { tenantSlug: string, tournamentId: string } }) {
  const [activeTab, setActiveTab] = useState<'fixtures' | 'standings' | 'teams'>('fixtures');

  return (
    <div className="min-h-screen bg-background">
      {/* Public Header / Hero */}
      <div className="bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10 z-0"></div>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col items-center text-center">
            <motion.div variants={fadeUp} className="w-20 h-20 bg-background/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 border border-white/20">
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>
            <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Summer Cup 2026
            </motion.h1>
            <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-4 text-primary-foreground/80 font-medium">
              <span className="flex items-center gap-2"><Calendar className="w-4 h-4" /> Aug 15 - Aug 20</span>
              <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> National Sports Center</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sticky top-0 z-20 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-6xl mx-auto px-4 flex items-center overflow-x-auto no-scrollbar">
          {(['fixtures', 'standings', 'teams'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 text-sm font-semibold capitalize whitespace-nowrap border-b-2 transition-colors
                ${activeTab === tab ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-6xl mx-auto px-4 py-8 md:py-12">
        {activeTab === 'fixtures' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Latest Matches</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" placeholder="Search team..." className="w-full pl-9 pr-4 py-2 bg-muted/50 border-none rounded-full text-sm focus:ring-2 focus:ring-primary outline-none" />
              </div>
            </div>

            {/* Mock Match Card */}
            <div className="bg-card border rounded-2xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
              <div className="p-4 bg-muted/30 border-b flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span>Group A • Pitch 1</span>
                <span className="text-success flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse"></span> LIVE (67')</span>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">MUN</div>
                  <span className="font-semibold text-lg">Manchester Utd</span>
                </div>
                <div className="flex items-center gap-4 px-8 text-3xl font-black tabular-nums">
                  <span>2</span>
                  <span className="text-muted-foreground opacity-50 text-xl">—</span>
                  <span>1</span>
                </div>
                <div className="flex items-center gap-4 flex-1 justify-end">
                  <span className="font-semibold text-lg">Arsenal</span>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">ARS</div>
                </div>
              </div>
            </div>
            
            {/* Mock Upcoming Match Card */}
            <div className="bg-card border rounded-2xl overflow-hidden hover:shadow-md transition-shadow opacity-75">
              <div className="p-4 bg-muted/30 border-b flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                <span>Group B • Pitch 2</span>
                <span>Today, 18:00</span>
              </div>
              <div className="p-6 flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">CHE</div>
                  <span className="font-semibold text-lg">Chelsea</span>
                </div>
                <div className="flex items-center gap-4 px-8 font-bold text-muted-foreground tracking-widest">
                  <span>V S</span>
                </div>
                <div className="flex items-center gap-4 flex-1 justify-end">
                  <span className="font-semibold text-lg">Liverpool</span>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">LIV</div>
                </div>
              </div>
            </div>

          </motion.div>
        )}

        {activeTab === 'standings' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-card border rounded-2xl overflow-hidden">
             {/* Standings Table Placeholder */}
             <div className="p-8 text-center text-muted-foreground">Standings table will be implemented using the reusable DataTable component.</div>
          </motion.div>
        )}
        
        {activeTab === 'teams' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {/* Teams Grid Placeholder */}
             <div className="p-6 bg-card border rounded-xl text-center font-semibold">Manchester Utd</div>
             <div className="p-6 bg-card border rounded-xl text-center font-semibold">Arsenal</div>
             <div className="p-6 bg-card border rounded-xl text-center font-semibold">Chelsea</div>
             <div className="p-6 bg-card border rounded-xl text-center font-semibold">Liverpool</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
