"use client";

import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';
import { Player } from '@/features/players/types/player.types';
import { Users, Activity, Stethoscope, UserCheck } from 'lucide-react';
import { PlayerDetailDrawer } from '@/features/players/components/PlayerDetailDrawer';
import { usePlayerStore } from '@/features/players/store/usePlayerStore';
import { AddPlayerModal } from '@/features/players/components/AddPlayerModal';

export default function PlayersDirectoryPage() {
  const { players } = usePlayerStore();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const columns: ColumnDef<Player>[] = [
    { 
      header: 'Name', 
      accessorKey: 'firstName',
      cell: (player) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-xs">
            {player.firstName[0]}{player.lastName[0]}
          </div>
          <div>
            <p className="font-medium">{player.firstName} {player.lastName}</p>
            <p className="text-xs text-muted-foreground">{player.age} yrs • {player.dateOfBirth}</p>
          </div>
        </div>
      )
    },
    { header: 'Team', accessorKey: 'team' },
    { header: 'Position', accessorKey: 'position' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (player) => {
        let badgeColor = 'bg-muted text-muted-foreground';
        if (player.status === 'Active') badgeColor = 'bg-success/10 text-success';
        if (player.status === 'Injured') badgeColor = 'bg-destructive/10 text-destructive';
        if (player.status === 'Trial') badgeColor = 'bg-info/10 text-info';
        
        return (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeColor}`}>
            {player.status}
          </span>
        );
      }
    },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="p-4 lg:p-8 space-y-6 bg-white min-h-[calc(100vh-4rem)] m-2 lg:m-4 rounded-3xl text-gray-900 shadow-lg border border-gray-100"
    >
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 drop-shadow-sm">Players Directory</h1>
          <p className="text-gray-600 mt-1">Manage academy roster, profiles, and development plans.</p>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="bg-purple-600 text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            + Add Player
          </button>
        </div>
      </motion.div>

      {/* KPI Overview (Operational Hub) */}
      <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-4 pb-2">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Users className="w-5 h-5 text-blue-500" />
            <span className="text-sm font-medium">Total Players</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{players.length + 142}</div>
          <p className="text-xs text-green-600 font-medium mt-1">Dynamic via state</p>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Stethoscope className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium">Medical Bay</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{players.filter(p => p.status === 'Injured').length}</div>
          <p className="text-xs text-red-500 font-medium mt-1">Injured players</p>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <Activity className="w-5 h-5 text-purple-500" />
            <span className="text-sm font-medium">Average Age</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">
            {(players.reduce((sum, p) => sum + p.age, 0) / (players.length || 1)).toFixed(1)}
          </div>
          <p className="text-xs text-gray-500 mt-1">Across academy</p>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-2xl p-4 shadow-sm">
          <div className="flex items-center gap-3 mb-2 text-gray-500">
            <UserCheck className="w-5 h-5 text-orange-500" />
            <span className="text-sm font-medium">On Trial</span>
          </div>
          <div className="text-2xl font-bold text-gray-900">{players.filter(p => p.status === 'Trial').length}</div>
          <p className="text-xs text-gray-500 mt-1">Decisions pending</p>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-white border border-gray-200 rounded-2xl shadow-sm p-1">
        <DataTable 
          data={players} 
          columns={columns} 
          searchPlaceholder="Search players by name or team..."
          onRowClick={(player) => setSelectedPlayer(player)}
        />
      </motion.div>
      
      <PlayerDetailDrawer 
        player={selectedPlayer}
        onClose={() => setSelectedPlayer(null)}
      />
      
      <AddPlayerModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </motion.div>
  );
}
