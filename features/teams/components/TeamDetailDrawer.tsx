import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Activity, Users, Settings, Target } from 'lucide-react';
import { Team } from '../types/team.types';
import { RosterTab } from './tabs/RosterTab';
import { FormationTab } from './tabs/FormationTab';

interface TeamDetailDrawerProps {
  team: Team | null;
  onClose: () => void;
}

export function TeamDetailDrawer({ team, onClose }: TeamDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'roster' | 'formation' | 'coaching' | 'schedule' | 'performance'>('roster');

  if (!team) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="w-full max-w-4xl h-full bg-background border-l shadow-2xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b" style={{ borderTop: `4px solid ${team.kits?.[0]?.primaryColor || 'transparent'}` }}>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-muted rounded-xl border flex items-center justify-center p-2">
                 {team.crestUrl ? <img src={team.crestUrl} alt="crest" className="object-contain w-full h-full" /> : <ShieldPlaceholder />}
              </div>
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{team.name}</h2>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                  <span className="font-medium text-foreground">{team.ageGroup}</span>
                  <span>•</span>
                  <span>{team.division}</span>
                </div>
              </div>
            </div>
            
            <button onClick={onClose} className="p-2 bg-muted/50 hover:bg-muted rounded-full transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-b flex items-center gap-6 overflow-x-auto no-scrollbar pt-2">
            {[
              { id: 'roster', label: 'Roster', icon: Users },
              { id: 'formation', label: 'Formation', icon: Target },
              { id: 'coaching', label: 'Coaching Staff', icon: Users },
              { id: 'schedule', label: 'Schedule', icon: Calendar },
              { id: 'performance', label: 'Performance', icon: Activity },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.id ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-muted/10">
            {activeTab === 'roster' && <RosterTab team={team} />}
            {activeTab === 'formation' && <FormationTab team={team} />}
            {/* Additional tab placeholders */}
            {['coaching', 'schedule', 'performance'].includes(activeTab) && (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground border-2 border-dashed rounded-xl border-muted">
                <Settings className="w-8 h-8 mb-3 opacity-20" />
                <p>The {activeTab} tab is under construction.</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function ShieldPlaceholder() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/></svg>
  );
}
