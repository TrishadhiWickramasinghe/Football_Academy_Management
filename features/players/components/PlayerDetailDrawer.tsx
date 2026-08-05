import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Activity, Stethoscope, FileText, Target, Goal, ChevronRight } from 'lucide-react';
import { Player } from '../types/player.types';

interface PlayerDetailDrawerProps {
  player: Player | null;
  onClose: () => void;
}

export function PlayerDetailDrawer({ player, onClose }: PlayerDetailDrawerProps) {
  const [activeTab, setActiveTab] = useState<'performance' | 'medical' | 'contract'>('performance');

  if (!player) return null;

  // Determine a color based on the team or status
  const gradientColors = player.status === 'Injured' 
    ? 'from-red-600 to-rose-900'
    : 'from-blue-600 to-indigo-900';

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
          className="w-full max-w-4xl h-full bg-white border-l border-gray-200 shadow-2xl flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Premium Hero Header */}
          <div className={`relative px-8 pt-12 pb-8 overflow-hidden shrink-0 bg-gradient-to-br ${gradientColors} text-white`}>
            {/* Background Pattern overlay for premium feel */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
            
            <button onClick={onClose} className="absolute top-6 right-6 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors z-10 backdrop-blur-sm">
              <X className="w-5 h-5" />
            </button>

            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
              <div className="flex items-center gap-5">
                <div className="w-24 h-24 bg-white rounded-full shadow-2xl shrink-0 flex items-center justify-center text-3xl font-black text-gray-800">
                   {player.firstName[0]}{player.lastName[0]}
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight drop-shadow-md">{player.firstName} {player.lastName}</h2>
                  <div className="flex items-center gap-3 text-white/80 mt-1.5 font-medium">
                    <span className="bg-white/20 px-2.5 py-0.5 rounded-md backdrop-blur-sm">{player.team}</span>
                    <span>{player.position}</span>
                    <span>•</span>
                    <span>{player.age} yrs</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10">
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider font-bold mb-1 flex items-center gap-1"><Goal className="w-3.5 h-3.5"/> Goals</p>
                  <p className="text-xl font-bold">14</p>
                </div>
                <div className="w-px h-8 bg-white/20"></div>
                <div>
                  <p className="text-xs text-white/60 uppercase tracking-wider font-bold mb-1 flex items-center gap-1"><Target className="w-3.5 h-3.5"/> Rating</p>
                  <p className="text-xl font-bold">8.2</p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-b border-gray-200 flex items-center gap-6 overflow-x-auto no-scrollbar pt-2 bg-white">
            {[
              { id: 'performance', label: 'Performance', icon: Activity },
              { id: 'medical', label: 'Medical History', icon: Stethoscope },
              { id: 'contract', label: 'Contract & Docs', icon: FileText },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap
                  ${activeTab === tab.id ? 'border-purple-600 text-purple-600' : 'border-transparent text-gray-500 hover:text-gray-900'}`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Scrollable Content Placeholder */}
          <div className="flex-1 overflow-y-auto p-8 bg-gray-50 flex items-start justify-center">
             <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-8 text-center shadow-sm mt-8">
                {activeTab === 'performance' && <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />}
                {activeTab === 'medical' && <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-4" />}
                {activeTab === 'contract' && <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />}
                
                <h3 className="text-lg font-bold text-gray-900 capitalize">{activeTab} Data</h3>
                <p className="text-gray-500 mt-2">Detailed {activeTab} analytics and history for {player.firstName} will be displayed here.</p>
                
                <button className="mt-6 flex items-center gap-2 mx-auto bg-purple-50 text-purple-600 px-4 py-2 rounded-lg font-semibold hover:bg-purple-100 transition-colors">
                  Add New Record <ChevronRight className="w-4 h-4" />
                </button>
             </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
