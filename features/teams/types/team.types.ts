export type TeamStatus = 'Active' | 'Inactive' | 'Archived';

export interface Player {
  id: string;
  name: string;
  jerseyNumber?: number;
  position: string;
  dateOfBirth: string;
  status: 'Active' | 'Injured' | 'Suspended';
}

export interface CoachingStaff {
  id: string;
  name: string;
  role: 'Head Coach' | 'Assistant Coach' | 'Physio' | 'Analyst';
  contact: string;
}

export interface Fixture {
  id: string;
  opponent: string;
  date: string;
  type: 'League' | 'Cup' | 'Friendly';
  homeOrAway: 'Home' | 'Away';
  result?: string;
}

export interface TrainingSession {
  id: string;
  date: string;
  focus: string;
  attendancePct?: number;
}

export interface Kit {
  type: 'Home' | 'Away' | 'Third';
  primaryColor: string;
  secondaryColor: string;
}

export interface Team {
  id: string;
  name: string;
  ageGroup: string;
  division: string;
  headCoachId?: string;
  status: TeamStatus;
  season: string;
  foundedDate: string;
  homeVenue: string;
  crestUrl?: string;
  
  // Relations
  players: Player[];
  staff: CoachingStaff[];
  kits: Kit[];
  fixtures: Fixture[];
  trainings: TrainingSession[];
  
  // Stats
  stats: {
    played: number;
    wins: number;
    draws: number;
    losses: number;
    goalsFor: number;
    goalsAgainst: number;
    points: number;
  };
}
