"use client";

import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { Search, Filter, Plus, Users, Calendar, Trophy, Activity } from 'lucide-react';
import { useTeamStore } from '@/features/teams/store/useTeamStore';
import { TeamCard } from '@/features/teams/components/TeamCard';
import { EmptyState } from '@/components/feedback/EmptyState';
import { TeamDetailDrawer } from '@/features/teams/components/TeamDetailDrawer';
import { CreateTeamModal } from '@/features/teams/components/CreateTeamModal';

export default function TeamsPage() {
  const { 
    teams, 
    searchQuery, 
    setSearchQuery, 
    ageFilter, 
    setAgeFilter, 
    statusFilter, 
    setStatusFilter,
    selectedTeamId,
    setSelectedTeam 
  } = useTeamStore();
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter logic
  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAge = ageFilter === 'All' || team.ageGroup === ageFilter;
    const matchesStatus = statusFilter === 'All' || team.status === statusFilter;
    return matchesSearch && matchesAge && matchesStatus;
  });
  
  const selectedTeam = teams.find(t => t.id === selectedTeamId) || null;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-4 lg:p-8 space-y-6 bg-white min-h-[calc(100vh-4rem)] m-2 lg:m-4 rounded-3xl text-gray-900 shadow-lg border border-gray-100"
    >
      {/* ... header and filters ... */}
      <motion.div variants={fadeUp} className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 drop-shadow-sm">Teams</h1>
          <p className="text-gray-600 mt-1">Manage rosters, coaching staff, and schedules for your club.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500 text-gray-900">
            <option>Season 2025/2026</option>
            <option>Season 2024/2025</option>
          </select>
          <button 
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-4 h-4" /> Create Team
          </button>
        </div>
      </motion.div>

      {/* KPI Overview (Operational Hub) */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Total Players</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">412</div>
          <p className="text-xs text-green-600 font-medium mt-1">+12 this month</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Activity className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Active Teams</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{teams.length}</div>
          <p className="text-xs text-gray-500 mt-1">Across 4 divisions</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Trophy className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">Win Rate</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">68%</div>
          <p className="text-xs text-green-600 font-medium mt-1">Top quartile</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Calendar className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-medium">Next Fixtures</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">14</div>
          <p className="text-xs text-gray-500 mt-1">This weekend</p>
        </div>
      </motion.div>

      {/* Toolbar */}
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative flex-1 w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search teams..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500 text-gray-900 placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 hidden sm:block" />
          <select 
            value={ageFilter}
            onChange={(e) => setAgeFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto text-gray-900"
          >
            <option value="All">All Ages</option>
            <option value="U12">U12</option>
            <option value="U14">U14</option>
            <option value="U16">U16</option>
            <option value="Senior">Senior</option>
          </select>
          
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-purple-500 w-full sm:w-auto text-gray-900"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div variants={fadeUp}>
        {filteredTeams.length === 0 ? (
          <EmptyState 
            title="No teams found" 
            description="Try adjusting your filters or create a new team to get started." 
            action={
              <button onClick={() => setIsCreateModalOpen(true)} className="text-primary font-medium text-sm hover:underline">
                Create your first team &rarr;
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTeams.map(team => (
              <TeamCard key={team.id} team={team} onClick={setSelectedTeam} />
            ))}
          </div>
        )}
      </motion.div>

      <TeamDetailDrawer 
        team={selectedTeam} 
        onClose={() => setSelectedTeam(null)} 
      />
      
      <CreateTeamModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      
    </motion.div>
  );
}
