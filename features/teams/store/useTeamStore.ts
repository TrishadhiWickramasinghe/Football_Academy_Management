import { create } from 'zustand';
import { Team, Player, CoachingStaff } from '../types/team.types';

// Mock Data
const MOCK_TEAMS: Team[] = [
  {
    id: '1',
    name: 'Manchester Utd U16',
    ageGroup: 'U16',
    division: 'Premier Academy League',
    status: 'Active',
    season: '2025/2026',
    foundedDate: '2010',
    homeVenue: 'Carrington Pitch 1',
    players: [
      { id: 'p1', name: 'Alex Hunter', jerseyNumber: 10, position: 'FW', dateOfBirth: '2010-05-12', status: 'Active' },
      { id: 'p2', name: 'Danny Williams', jerseyNumber: 8, position: 'CM', dateOfBirth: '2010-08-22', status: 'Active' }
    ],
    staff: [
      { id: 's1', name: 'John Smith', role: 'Head Coach', contact: 'john@example.com' },
      { id: 's2', name: 'Mike Dean', role: 'Physio', contact: 'mike@example.com' }
    ],
    kits: [
      { type: 'Home', primaryColor: '#E50000', secondaryColor: '#FFFFFF' },
      { type: 'Away', primaryColor: '#FFFFFF', secondaryColor: '#000000' }
    ],
    fixtures: [
      { id: 'f1', opponent: 'Arsenal U16', date: '2026-09-12T14:00:00Z', type: 'League', homeOrAway: 'Home' }
    ],
    trainings: [
      { id: 't1', date: '2026-09-10T16:00:00Z', focus: 'Attacking Transitions', attendancePct: 95 }
    ],
    stats: { played: 12, wins: 8, draws: 2, losses: 2, goalsFor: 24, goalsAgainst: 10, points: 26 }
  },
  {
    id: '2',
    name: 'Manchester Utd U14',
    ageGroup: 'U14',
    division: 'Academy League North',
    status: 'Active',
    season: '2025/2026',
    foundedDate: '2012',
    homeVenue: 'Carrington Pitch 3',
    players: [],
    staff: [{ id: 's3', name: 'Sarah Jones', role: 'Head Coach', contact: 'sarah@example.com' }],
    kits: [{ type: 'Home', primaryColor: '#E50000', secondaryColor: '#FFFFFF' }],
    fixtures: [],
    trainings: [],
    stats: { played: 10, wins: 5, draws: 3, losses: 2, goalsFor: 15, goalsAgainst: 12, points: 18 }
  },
  {
    id: '3',
    name: 'Manchester Utd Women Senior',
    ageGroup: 'Senior',
    division: 'WSL',
    status: 'Active',
    season: '2025/2026',
    foundedDate: '2018',
    homeVenue: 'Leigh Sports Village',
    players: [],
    staff: [],
    kits: [],
    fixtures: [],
    trainings: [],
    stats: { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
  },
  {
    id: '4',
    name: 'Manchester Utd U12',
    ageGroup: 'U12',
    division: 'Foundation Phase',
    status: 'Inactive',
    season: '2025/2026',
    foundedDate: '2014',
    homeVenue: 'Carrington Indoor',
    players: [],
    staff: [],
    kits: [],
    fixtures: [],
    trainings: [],
    stats: { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
  }
];

interface TeamStore {
  teams: Team[];
  selectedTeamId: string | null;
  searchQuery: string;
  ageFilter: string;
  statusFilter: string;
  
  // Actions
  setSearchQuery: (query: string) => void;
  setAgeFilter: (age: string) => void;
  setStatusFilter: (status: string) => void;
  setSelectedTeam: (id: string | null) => void;
  
  addTeam: (team: Omit<Team, 'id' | 'players' | 'staff' | 'kits' | 'fixtures' | 'trainings' | 'stats'>) => void;
  deleteTeam: (id: string) => void;
}

export const useTeamStore = create<TeamStore>((set) => ({
  teams: MOCK_TEAMS,
  selectedTeamId: null,
  searchQuery: '',
  ageFilter: 'All',
  statusFilter: 'All',

  setSearchQuery: (query) => set({ searchQuery: query }),
  setAgeFilter: (age) => set({ ageFilter: age }),
  setStatusFilter: (status) => set({ statusFilter: status }),
  setSelectedTeam: (id) => set({ selectedTeamId: id }),

  addTeam: (teamData) => set((state) => ({
    teams: [
      ...state.teams,
      {
        ...teamData,
        id: Math.random().toString(36).substr(2, 9),
        players: [],
        staff: [],
        kits: [],
        fixtures: [],
        trainings: [],
        stats: { played: 0, wins: 0, draws: 0, losses: 0, goalsFor: 0, goalsAgainst: 0, points: 0 }
      }
    ]
  })),

  deleteTeam: (id) => set((state) => ({
    teams: state.teams.filter(t => t.id !== id),
    selectedTeamId: state.selectedTeamId === id ? null : state.selectedTeamId
  }))
}));
