"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { BookOpen, Calendar, Target, Activity, Play, ChevronRight, Search, CheckCircle2, LayoutGrid, Clock, Users } from 'lucide-react';
import { Drill, TrainingSession } from '../../types/coaching.types';
import { CreatePlanDrawer } from './CreatePlanDrawer';

// Mock Data
const PILLARS = [
  { name: 'Tactical (Build-up)', progress: 75, color: 'bg-blue-500' },
  { name: 'Technical (Passing)', progress: 60, color: 'bg-emerald-500' },
  { name: 'Physical (Endurance)', progress: 90, color: 'bg-orange-500' },
  { name: 'Psychosocial (Communication)', progress: 40, color: 'bg-purple-500' }
];

const UPCOMING_SESSION: TrainingSession = {
  id: 'session-1',
  title: 'Playing through the thirds',
  teamId: 't1',
  teamName: 'U16 Elite',
  ageGroup: 'U16',
  date: new Date().toISOString(),
  startTime: '16:00',
  endTime: '17:30',
  location: 'Pitch 1',
  coachId: 'c1',
  theme: 'Build-up Play',
  objectives: ['Recognize when to play through, around, or over the press', 'Body shape when receiving'],
  methodology: 'Tactical Periodization',
  status: 'SCHEDULED',
  attendanceTaken: false,
  drills: [
    {
      id: 'd1',
      drillId: 'drill-1',
      durationMinutes: 20,
      order: 1,
      drill: {
        id: 'drill-1',
        title: '4v2 Rondo Transition',
        thumbnail: '',
        ageGroup: ['U14', 'U16'],
        durationMinutes: 20,
        difficulty: 'Intermediate',
        minPlayers: 6,
        maxPlayers: 12,
        objective: 'Quick ball circulation under pressure',
        methodologyPhase: 'Activation',
        equipment: ['Bibs', 'Balls', 'Cones'],
        description: 'Standard 4v2 in a grid, transitioning to a new grid on 10 passes.',
        setup: '10x10 grid',
        instructions: 'Play fast',
        coachingPoints: ['Angle of support']
      }
    }
  ]
};

const DRILL_LIBRARY = [
  { id: '1', title: '7v7 Half-pitch Game', category: 'Tactical', difficulty: 'Advanced', time: '30m' },
  { id: '2', title: 'Agility Ladder & Finish', category: 'Physical', difficulty: 'Beginner', time: '15m' },
  { id: '3', title: 'Y-Passing Drill', category: 'Technical', difficulty: 'Intermediate', time: '20m' },
  { id: '4', title: 'Defensive Shape Walkthrough', category: 'Tactical', difficulty: 'Beginner', time: '25m' },
];

export function CurriculumDashboard() {
  const [search, setSearch] = useState('');
  const [isBuilderOpen, setIsBuilderOpen] = useState(false);
  const [upcomingSessions, setUpcomingSessions] = useState<TrainingSession[]>([UPCOMING_SESSION]);

  const handleCreatePlan = (session: TrainingSession) => {
    setUpcomingSessions([session, ...upcomingSessions]);
    setIsBuilderOpen(false);
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-4 lg:p-8 space-y-6 bg-gray-50 min-h-[calc(100vh-4rem)] rounded-3xl"
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 drop-shadow-sm">Curriculum & Coaching</h1>
          <p className="text-gray-600 mt-1">Manage training programs, drill libraries, and tactical plans.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-purple-500 shadow-sm">
            <option>U16 Development Phase</option>
            <option>U14 Foundation Phase</option>
            <option>Senior First Team</option>
          </select>
          <button onClick={() => setIsBuilderOpen(true)} className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all">
            <Target className="w-4 h-4" /> Create Plan
          </button>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Module 1: Progress (Spans 2 columns) */}
        <motion.div variants={fadeUp} className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-purple-600" /> Season Curriculum Progress
            </h2>
            <span className="text-xs font-semibold px-2.5 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> On Track
            </span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 flex-1">
            <div className="flex flex-col justify-center gap-6">
              {PILLARS.map((pillar) => (
                <div key={pillar.name}>
                  <div className="flex justify-between text-sm mb-1.5 font-medium">
                    <span className="text-gray-700">{pillar.name}</span>
                    <span className="text-gray-900">{pillar.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${pillar.progress}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-2.5 rounded-full ${pillar.color}`} 
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex flex-col justify-center items-center text-center">
               <div className="relative w-32 h-32 mb-4">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" fill="transparent" stroke="#f3f4f6" strokeWidth="12" />
                    <circle cx="64" cy="64" r="56" fill="transparent" stroke="#9333ea" strokeWidth="12" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * 68) / 100} className="transition-all duration-1000 ease-out" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-gray-900">68%</span>
                  </div>
               </div>
               <h3 className="font-bold text-gray-900">Overall Completion</h3>
               <p className="text-xs text-gray-500 mt-1">4 weeks remaining in Phase 1</p>
            </div>
          </div>
        </motion.div>

        {/* Module 2: Upcoming Sessions */}
        <motion.div variants={fadeUp} className="flex flex-col gap-4">
          {upcomingSessions.slice(0, 2).map((session, idx) => (
            <div key={session.id || idx} className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-2xl p-6 shadow-md text-white flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Target className="w-24 h-24" />
              </div>
              <div className="relative z-10 flex-1">
                <h2 className="text-sm font-semibold text-purple-200 mb-1 tracking-wider uppercase flex items-center gap-2">
                   <Calendar className="w-4 h-4" /> {idx === 0 ? 'Next Session' : 'Upcoming Session'}
                </h2>
                <h3 className="text-2xl font-bold leading-tight mt-2">{session.title}</h3>
                <div className="flex flex-wrap gap-2 mt-4 text-xs font-medium">
                  <span className="bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm">{session.teamName}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm">{session.theme}</span>
                </div>
                
                <div className="mt-6 space-y-3 bg-black/20 p-4 rounded-xl backdrop-blur-md border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-purple-500/30 p-1.5 rounded-lg"><Clock className="w-4 h-4 text-purple-200" /></div>
                    <div>
                      <p className="text-sm font-medium">{new Date(session.date).toLocaleDateString()}, {session.startTime} - {session.endTime}</p>
                      <p className="text-xs text-purple-200 opacity-80">{session.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 bg-purple-500/30 p-1.5 rounded-lg"><Target className="w-4 h-4 text-purple-200" /></div>
                    <div>
                      <p className="text-sm font-medium">Key Objective</p>
                      <p className="text-xs text-purple-200 opacity-80">{session.objectives?.[0] || 'General training'}</p>
                    </div>
                  </div>
                </div>
              </div>
              <button className="relative z-10 w-full mt-6 bg-white text-indigo-950 font-bold py-2.5 rounded-lg text-sm hover:bg-gray-50 transition-colors shadow-lg">
                View Full Session Plan
              </button>
            </div>
          ))}
        </motion.div>

        {/* Module 3: Drill Library */}
        <motion.div variants={fadeUp} className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-blue-600" /> Drill Library
            </h2>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search drills..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DRILL_LIBRARY.map(drill => (
              <div key={drill.id} className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 border border-transparent hover:border-gray-100 transition-all cursor-pointer">
                <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                   <Play className="w-6 h-6 text-gray-400 group-hover:text-purple-600 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-gray-900 truncate">{drill.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1 font-medium">
                    <span className="px-2 py-0.5 bg-gray-200/50 rounded-md text-gray-700">{drill.category}</span>
                    <span>• {drill.time}</span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
              </div>
            ))}
          </div>
          <button className="mt-4 text-sm font-bold text-purple-600 hover:text-purple-700">View all 142 drills &rarr;</button>
        </motion.div>

        {/* Module 4: Tactical Focus */}
        <motion.div variants={fadeUp} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <LayoutGrid className="w-5 h-5 text-emerald-600" /> Tactical Board
          </h2>
          <div className="flex-1 bg-green-700 rounded-xl relative overflow-hidden border-4 border-green-800 shadow-inner min-h-[200px] flex items-center justify-center group cursor-pointer">
             {/* Simulated pitch markings */}
             <div className="absolute inset-x-0 top-1/2 h-0.5 bg-white/30 -translate-y-1/2"></div>
             <div className="absolute left-1/2 top-1/2 w-16 h-16 border-2 border-white/30 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
             
             {/* Player dots */}
             <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white absolute top-1/4 left-1/4 shadow-sm"></div>
             <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white absolute top-1/3 left-1/2 shadow-sm"></div>
             <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white absolute top-2/3 left-1/3 shadow-sm"></div>
             
             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button className="bg-white text-green-800 px-4 py-2 rounded-lg font-bold text-sm shadow-xl">Open Editor</button>
             </div>
          </div>
        </motion.div>

      </div>
      
      <CreatePlanDrawer 
        isOpen={isBuilderOpen} 
        onClose={() => setIsBuilderOpen(false)} 
        onSubmit={handleCreatePlan} 
      />
    </motion.div>
  );
}
