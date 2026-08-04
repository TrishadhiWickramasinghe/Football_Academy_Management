export type PlayerPosition = 
  | "GK" | "CB" | "LB" | "RB" | "CM" | "AM" | "LW" | "RW" | "ST";

export type PlayerStatus = "Active" | "Trial" | "Waitlist" | "Alumni" | "Inactive";

export interface Guardian {
  id: string;
  name: string;
  email: string;
  phone?: string;
  relationship: string;
  isPrimary: boolean;
}

export interface DocumentStatus {
  id: string;
  type: "Registration" | "Medical" | "Media" | "Tournament" | "Waiver";
  status: "Valid" | "Pending" | "Missing" | "Expiring";
  uploadedAt?: string;
  expiresAt?: string;
}

export interface Player {
  id: string;
  tenantId: string;
  
  // Personal Info
  fullName: string;
  dateOfBirth: string;
  gender: "Male" | "Female" | "Other";
  profilePhoto?: string;
  nationality?: string;
  schoolName?: string;
  preferredLanguage?: string;

  // Football Info
  primaryPosition: PlayerPosition;
  secondaryPosition?: PlayerPosition;
  jerseyNumber?: number;
  ageGroup: string; // e.g. "U13-U14"
  developmentPhase?: string;
  currentTeamId?: string;
  currentTeamName?: string;

  // Medical Info (Sensitive)
  medicalConditions?: string;
  allergies?: string;
  emergencyContactName: string;
  emergencyContactPhone: string;

  // Guardians
  guardian1: Guardian;
  guardian2?: Guardian;

  // Registration & Compliance
  enrolmentDate: string;
  status: PlayerStatus;
  documents: DocumentStatus[];
  
  // Statistics/KPIs (Derived)
  attendanceRate?: number;
  latestEvaluationScore?: number;
}

export interface Trial {
  id: string;
  playerId: string;
  tenantId: string;
  date: string;
  time: string;
  coachId: string;
  coachName: string;
  location: string;
  status: "Scheduled" | "Completed" | "Cancelled";
  result?: "Recommended" | "Further Assessment" | "Waitlist" | "Not Selected";
  score?: number;
}
