import { Player, Trial } from "../types/player.types"

// Generate a random ID
const genId = () => "PLY-" + Math.floor(Math.random() * 1000000).toString().padStart(6, '0')

// Mock Data
export const MOCK_PLAYERS: Player[] = [
  {
    id: "PLY-000124",
    tenantId: "t-1",
    fullName: "Diego Cruz",
    dateOfBirth: "2014-05-12",
    gender: "Male",
    primaryPosition: "CM",
    ageGroup: "U13-U14",
    developmentPhase: "Phase 3: Development",
    currentTeamId: "team-1",
    currentTeamName: "U13 Academy A",
    jerseyNumber: 10,
    emergencyContactName: "Maria Cruz",
    emergencyContactPhone: "+447700900000",
    guardian1: {
      id: "g-1",
      name: "Maria Cruz",
      email: "maria.cruz@example.com",
      relationship: "Parent",
      isPrimary: true
    },
    enrolmentDate: "2026-07-20",
    status: "Active",
    documents: [
      { id: "doc-1", type: "Registration", status: "Valid" },
      { id: "doc-2", type: "Medical", status: "Valid", expiresAt: "2026-12-20" }
    ],
    attendanceRate: 92,
    latestEvaluationScore: 4.3
  },
  {
    id: "PLY-000125",
    tenantId: "t-1",
    fullName: "Mateo Ruiz",
    dateOfBirth: "2017-02-18",
    gender: "Male",
    primaryPosition: "ST",
    ageGroup: "U10-U12",
    developmentPhase: "Phase 2: Discovery",
    currentTeamId: "team-2",
    currentTeamName: "U10B",
    emergencyContactName: "Carlos Ruiz",
    emergencyContactPhone: "+447700900001",
    guardian1: {
      id: "g-2",
      name: "Carlos Ruiz",
      email: "carlos@example.com",
      relationship: "Parent",
      isPrimary: true
    },
    enrolmentDate: "2026-08-01",
    status: "Active",
    documents: [
      { id: "doc-3", type: "Medical", status: "Expiring", expiresAt: "2026-08-10" }
    ]
  },
  {
    id: "PLY-000126",
    tenantId: "t-1",
    fullName: "Sofia Martinez",
    dateOfBirth: "2014-08-30",
    gender: "Female",
    primaryPosition: "GK",
    ageGroup: "U13-U14",
    emergencyContactName: "Elena Martinez",
    emergencyContactPhone: "+447700900002",
    guardian1: {
      id: "g-3",
      name: "Elena Martinez",
      email: "elena@example.com",
      relationship: "Parent",
      isPrimary: true
    },
    enrolmentDate: "2026-08-03",
    status: "Trial",
    documents: []
  }
];

export const MOCK_TRIALS: Trial[] = [
  {
    id: "tr-1",
    playerId: "PLY-000126",
    tenantId: "t-1",
    date: "2026-08-08",
    time: "10:00 AM",
    coachId: "c-1",
    coachName: "Carlos Hernandez",
    location: "Field 2",
    status: "Scheduled"
  }
];

export const playersService = {
  getPlayers: async (tenantId: string, filters?: any): Promise<Player[]> => {
    return new Promise(resolve => setTimeout(() => {
      let result = MOCK_PLAYERS.filter(p => p.tenantId === tenantId);
      if (filters?.status) result = result.filter(p => p.status === filters.status);
      if (filters?.search) {
        const query = filters.search.toLowerCase();
        result = result.filter(p => 
          p.fullName.toLowerCase().includes(query) || 
          p.id.toLowerCase().includes(query) ||
          p.guardian1.name.toLowerCase().includes(query)
        );
      }
      resolve(result);
    }, 500));
  },
  
  getPlayer: async (id: string, tenantId: string): Promise<Player | null> => {
    return new Promise(resolve => setTimeout(() => {
      const p = MOCK_PLAYERS.find(p => p.id === id && p.tenantId === tenantId);
      resolve(p || null);
    }, 300));
  },

  createPlayer: async (player: Partial<Player>): Promise<Player> => {
    return new Promise(resolve => setTimeout(() => {
      const newPlayer = {
        ...player,
        id: genId(),
        enrolmentDate: new Date().toISOString().split('T')[0],
        documents: []
      } as Player;
      MOCK_PLAYERS.push(newPlayer);
      resolve(newPlayer);
    }, 1000));
  }
};
