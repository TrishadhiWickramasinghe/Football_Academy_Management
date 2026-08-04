export type TournamentStatus = 
  | "draft"
  | "registration_open"
  | "registration_closed"
  | "scheduled"
  | "live"
  | "completed"
  | "cancelled"
  | "archived";

export type TournamentFormat = 
  | "round_robin"
  | "single_elimination"
  | "double_elimination"
  | "group_knockout"
  | "friendly"
  | "mini_tournament";

export interface AgeGroupConfig {
  id: string;
  name: string; // e.g. "U9", "U13"
  maxTeams: number;
  matchDurationMinutes: number;
  restMinutes: number;
  fieldSize: string; // e.g. "7v7", "11v11"
  registrationFee?: number;
  rosterSize: number;
}

export interface Venue {
  id: string;
  name: string;
  address: string;
  timezone: string;
  contact?: string;
  fields: Field[];
}

export interface Field {
  id: string;
  venueId: string;
  name: string;
  capacity?: number;
  surface: string; // e.g. "Artificial", "Grass"
  availability: string; // simplified availability representation
}

export interface Tournament {
  id: string;
  tenantId: string;
  name: string;
  description?: string;
  startDate: string;
  endDate: string;
  timezone: string;
  location?: string;
  format: TournamentFormat;
  status: TournamentStatus;
  registrationDeadline?: string;
  publicSlug?: string;
  
  ageGroups: AgeGroupConfig[];
  venues: Venue[];
  rules: TournamentRules;
}

export interface TournamentRules {
  pointsForWin: number;
  pointsForDraw: number;
  pointsForLoss: number;
  tiebreakers: string[]; // e.g. ["points", "goal_difference", "goals_scored", "head_to_head"]
}

export interface TeamRegistration {
  id: string;
  tournamentId: string;
  tenantId: string;
  ageGroupId: string;
  
  // Could link to internal team or represent an external team
  internalTeamId?: string; 
  
  teamName: string;
  organisationName?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  logo?: string;
  
  status: "pending" | "approved" | "waitlisted" | "rejected";
  paymentStatus?: "pending" | "paid" | "not_required";
  registeredAt: string;
}
