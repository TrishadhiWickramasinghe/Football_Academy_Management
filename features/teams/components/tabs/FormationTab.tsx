import React from 'react';
import { Team } from '../../types/team.types';

export function FormationTab({ team }: { team: Team }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Formation Tactics</h3>
        <select className="px-3 py-1.5 text-sm bg-muted text-foreground border rounded-md">
          <option>4-3-3 Attacking</option>
          <option>4-4-2 Flat</option>
          <option>3-5-2 Wingbacks</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Pitch Graphic (Simple CSS implementation) */}
        <div className="md:col-span-2 relative aspect-[2/3] md:aspect-square bg-success/80 rounded-xl overflow-hidden border-4 border-white/20 shadow-inner flex flex-col justify-between p-4">
          {/* Pitch Lines */}
          <div className="absolute inset-0 border-2 border-white/40 m-4 rounded-sm pointer-events-none"></div>
          <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-2 border-t-0 border-white/40 pointer-events-none"></div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1/6 border-2 border-b-0 border-white/40 pointer-events-none"></div>
          <div className="absolute top-1/2 left-4 right-4 h-0 border-t-2 border-white/40 pointer-events-none"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 aspect-square rounded-full border-2 border-white/40 pointer-events-none"></div>
          
          {/* Mock Players on Pitch */}
          <div className="relative z-10 h-full flex flex-col justify-around">
            <div className="flex justify-center"><div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">9</div></div>
            <div className="flex justify-around px-8">
              <div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">11</div>
              <div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">10</div>
              <div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">7</div>
            </div>
            <div className="flex justify-around px-16">
               <div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">8</div>
               <div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">6</div>
            </div>
            <div className="flex justify-between px-4">
              <div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">3</div>
              <div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">5</div>
              <div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">4</div>
              <div className="w-8 h-8 rounded-full bg-white text-success flex items-center justify-center font-bold text-xs shadow-md">2</div>
            </div>
            <div className="flex justify-center"><div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs shadow-md">1</div></div>
          </div>
        </div>

        {/* Bench List */}
        <div className="bg-card border rounded-lg p-4 space-y-4">
          <h4 className="font-semibold border-b pb-2">Substitutes / Bench</h4>
          <div className="space-y-2">
            {team.players.map(p => (
              <div key={p.id} className="flex items-center gap-2 p-2 bg-muted/50 rounded-md text-sm border cursor-move hover:bg-muted">
                <span className="w-6 h-6 flex items-center justify-center bg-background rounded-full text-xs font-medium text-muted-foreground">{p.jerseyNumber}</span>
                <span>{p.name}</span>
                <span className="ml-auto text-xs text-muted-foreground">{p.position}</span>
              </div>
            ))}
            {team.players.length === 0 && (
              <p className="text-sm text-muted-foreground">No players assigned to team.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
