export type MatchStatus = 
  | "scheduled"
  | "warm_up"
  | "live"
  | "half_time"
  | "completed"
  | "postponed"
  | "cancelled"
  | "abandoned";

export interface Match {
  id: string;
  tournamentId: string;
  ageGroupId: string;
  round?: string; // e.g. "Group A", "Quarter Final", "Final"
  
  homeTeamId: string;
  homeTeamName: string; // Denormalized for easy rendering
  homeTeamLogo?: string;
  
  awayTeamId: string;
  awayTeamName: string;
  awayTeamLogo?: string;
  
  venueId: string;
  fieldId: string;
  refereeId?: string;
  refereeName?: string;
  
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationMinutes: number;
  
  status: MatchStatus;
  homeScore: number;
  awayScore: number;
  
  locked: boolean;
  notes?: string;
}

export interface MatchEvent {
  id: string;
  matchId: string;
  minute: number;
  type: "goal" | "yellow_card" | "red_card" | "substitution" | "note";
  teamId?: string; // which team triggered it
  playerId?: string;
  playerName?: string;
  description?: string;
  timestamp: string; // actual iso time
}

export interface StandingsEntry {
  teamId: string;
  teamName: string;
  teamLogo?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  position: number;
}
