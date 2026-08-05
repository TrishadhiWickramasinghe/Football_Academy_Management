"use client";

import React, { useState } from 'react';
import * as motion from 'framer-motion/client';
import { fadeUp, staggerContainer } from '@/lib/utils/animations';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';
import { Player } from '@/features/players/types/player.types';

// Mock Data for UI presentation
const MOCK_PLAYERS: Player[] = [
  { id: '1', firstName: 'Marcus', lastName: 'Rashford', age: 14, dateOfBirth: '2010-10-31', team: 'U14 Elite', position: 'Forward', status: 'Active', medicalClearance: true },
  { id: '2', firstName: 'Jude', lastName: 'Bellingham', age: 16, dateOfBirth: '2008-06-29', team: 'U16 Pro', position: 'Midfielder', status: 'Active', medicalClearance: true },
  { id: '3', firstName: 'Phil', lastName: 'Foden', age: 12, dateOfBirth: '2012-05-28', team: 'U12 Academy', position: 'Midfielder', status: 'Injured', medicalClearance: false },
  { id: '4', firstName: 'Bukayo', lastName: 'Saka', age: 15, dateOfBirth: '2009-09-05', team: 'U16 Pro', position: 'Winger', status: 'Active', medicalClearance: true },
];

export default function PlayersDirectoryPage() {
  const [players] = useState<Player[]>(MOCK_PLAYERS);

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
      className="p-4 lg:p-8 space-y-8 max-w-7xl mx-auto"
    >
      <motion.div variants={fadeUp} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Players Directory</h1>
          <p className="text-muted-foreground mt-1">Manage academy roster, profiles, and development plans.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md font-medium text-sm hover:opacity-90 transition-opacity">
            + Add Player
          </button>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="bg-card border rounded-xl shadow-sm p-4">
        <DataTable 
          data={players} 
          columns={columns} 
          searchPlaceholder="Search players by name or team..."
          onRowClick={(player) => console.log('Navigate to profile:', player.id)}
        />
      </motion.div>
    </motion.div>
  );
}
