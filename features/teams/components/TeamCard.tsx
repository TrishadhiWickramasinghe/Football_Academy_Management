import React from 'react';
import { Team } from '../types/team.types';
import { Shield, MoreVertical, Users, MapPin, Trophy } from 'lucide-react';

interface TeamCardProps {
  team: Team;
  onClick: (id: string) => void;
}

export function TeamCard({ team, onClick }: TeamCardProps) {
  // Determine badge color
  let statusBadge = 'bg-muted text-muted-foreground';
  if (team.status === 'Active') statusBadge = 'bg-success/10 text-success';
  if (team.status === 'Archived') statusBadge = 'bg-destructive/10 text-destructive';

  const headCoach = team.staff.find(s => s.role === 'Head Coach');

  return (
    <div 
      onClick={() => onClick(team.id)}
      className="bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow cursor-pointer group flex flex-col"
    >
      {/* Top Banner (simulating team colors) */}
      <div 
        className="h-16 w-full relative flex items-center px-4" 
        style={{ backgroundColor: team.kits?.[0]?.primaryColor || '#1e293b' }}
      >
        <div className="absolute -bottom-6 left-4 bg-card p-1 rounded-lg shadow-sm border">
          {team.crestUrl ? (
            <img src={team.crestUrl} alt={team.name} className="w-12 h-12 object-contain" />
          ) : (
            <div className="w-12 h-12 flex items-center justify-center bg-muted rounded-md text-muted-foreground">
              <Shield className="w-6 h-6" />
            </div>
          )}
        </div>
        
        {/* Quick Actions Dropdown */}
        <div className="absolute top-3 right-3 text-white/70 hover:text-white" onClick={(e) => e.stopPropagation()}>
          <button className="p-1 rounded-md hover:bg-black/20 transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="pt-10 pb-4 px-4 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg leading-tight group-hover:text-primary transition-colors">{team.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5">{team.ageGroup} • {team.division}</p>
          </div>
          <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded-full ${statusBadge}`}>
            {team.status}
          </span>
        </div>

        <div className="mt-4 space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 opacity-70" />
            <span>{team.players.length} Players</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 opacity-70" />
            <span>Coach: <span className="font-medium text-foreground">{headCoach ? headCoach.name : 'Unassigned'}</span></span>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-muted/30 border-t flex items-center justify-between text-xs text-muted-foreground">
         <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> {team.homeVenue}</span>
         <span className="flex items-center gap-1.5"><Trophy className="w-3.5 h-3.5" /> {team.stats.played} Matches</span>
      </div>
    </div>
  );
}
