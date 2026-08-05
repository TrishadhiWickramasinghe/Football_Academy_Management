import React from 'react';
import { Team } from '../../types/team.types';
import { DataTable, ColumnDef } from '@/components/ui/DataTable';

interface RosterTabProps {
  team: Team;
}

export function RosterTab({ team }: RosterTabProps) {
  const columns: ColumnDef<any>[] = [
    { header: 'Jersey', accessorKey: 'jerseyNumber' },
    { 
      header: 'Name', 
      accessorKey: 'name',
      cell: (player) => <span className="font-medium">{player.name}</span>
    },
    { header: 'Position', accessorKey: 'position' },
    { header: 'DOB', accessorKey: 'dateOfBirth' },
    { 
      header: 'Status', 
      accessorKey: 'status',
      cell: (player) => {
        let badgeColor = 'bg-muted text-muted-foreground';
        if (player.status === 'Active') badgeColor = 'bg-success/10 text-success';
        if (player.status === 'Injured') badgeColor = 'bg-destructive/10 text-destructive';
        if (player.status === 'Suspended') badgeColor = 'bg-warning/10 text-warning';
        
        return (
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${badgeColor}`}>
            {player.status}
          </span>
        );
      }
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Team Roster</h3>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 text-sm bg-muted text-foreground rounded-md hover:bg-muted/80">
            Import CSV
          </button>
          <button className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:opacity-90">
            + Add Player
          </button>
        </div>
      </div>
      
      <div className="bg-card border rounded-lg p-2">
        <DataTable 
          data={team.players} 
          columns={columns} 
          emptyStateTitle="No players assigned"
          emptyStateDescription="Add players from the organization roster or invite new ones."
        />
      </div>
    </div>
  );
}
