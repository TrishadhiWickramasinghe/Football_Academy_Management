import { create } from 'zustand';
import { Player } from '../types/player.types';

const INITIAL_PLAYERS: Player[] = [
  { id: '1', firstName: 'Marcus', lastName: 'Rashford', age: 14, dateOfBirth: '2010-10-31', team: 'U14 Elite', position: 'Forward', status: 'Active', medicalClearance: true },
  { id: '2', firstName: 'Jude', lastName: 'Bellingham', age: 16, dateOfBirth: '2008-06-29', team: 'U16 Pro', position: 'Midfielder', status: 'Active', medicalClearance: true },
  { id: '3', firstName: 'Phil', lastName: 'Foden', age: 12, dateOfBirth: '2012-05-28', team: 'U12 Academy', position: 'Midfielder', status: 'Injured', medicalClearance: false },
  { id: '4', firstName: 'Bukayo', lastName: 'Saka', age: 15, dateOfBirth: '2009-09-05', team: 'U16 Pro', position: 'Winger', status: 'Active', medicalClearance: true },
];

interface PlayerState {
  players: Player[];
  addPlayer: (player: Omit<Player, 'id'>) => void;
  updatePlayer: (id: string, data: Partial<Player>) => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  players: INITIAL_PLAYERS,
  
  addPlayer: (playerData) => set((state) => ({
    players: [
      ...state.players,
      {
        ...playerData,
        id: Math.random().toString(36).substr(2, 9),
      }
    ]
  })),

  updatePlayer: (id, data) => set((state) => ({
    players: state.players.map(player => 
      player.id === id ? { ...player, ...data } : player
    )
  })),
}));
