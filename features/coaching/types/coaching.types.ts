export type SessionStatus = "DRAFT" | "SCHEDULED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
export type AttendanceStatus = "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
export type EvaluationStatus = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "RETURNED";
export type CertificationStatus = "VALID" | "EXPIRING_SOON" | "EXPIRED";

export interface CoachTeam {
  id: string;
  name: string;
  ageGroup: string;
  playerCount: number;
  headCoach: string;
  assistantCoaches: string[];
  nextSession?: {
    id: string;
    date: string;
    time: string;
  };
  attendanceRate: number;
  logo?: string;
}

export interface PlayerOverview {
  id: string;
  name: string;
  avatar?: string;
  position: string;
  teamId: string;
  teamName: string;
  attendanceRate: number;
  lastEvaluationScore?: number;
  developmentPhase?: string;
}

export interface Drill {
  id: string;
  title: string;
  thumbnail: string;
  ageGroup: string[];
  durationMinutes: number;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  minPlayers: number;
  maxPlayers: number;
  objective: string;
  methodologyPhase: string;
  equipment: string[];
  videoUrl?: string;
  description: string;
  setup: string;
  instructions: string;
  coachingPoints: string[];
}

export interface SessionDrill {
  id: string;
  drillId: string;
  drill: Drill;
  durationMinutes: number;
  order: number;
  customNotes?: string;
}

export interface TrainingSession {
  id: string;
  title: string;
  teamId: string;
  teamName: string;
  ageGroup: string;
  date: string; // ISO string
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location: string;
  coachId: string;
  theme: string;
  objectives: string[];
  methodology: string;
  status: SessionStatus;
  drills: SessionDrill[];
  attendanceTaken: boolean;
}

export interface AttendanceRecord {
  id: string;
  sessionId: string;
  playerId: string;
  playerName: string;
  playerAvatar?: string;
  status: AttendanceStatus;
  notes?: string;
}

export interface EvaluationCriterion {
  id: string;
  category: "Technical" | "Tactical" | "Physical" | "Mental" | "Social";
  name: string;
  score: number; // 1-5
  notes?: string;
}

export interface Evaluation {
  id: string;
  playerId: string;
  playerName: string;
  teamId: string;
  coachId: string;
  date: string;
  type: string; // e.g., "Mid-Season Review"
  status: EvaluationStatus;
  criteria: EvaluationCriterion[];
  overallScore: number;
  generalComments: string;
  strengths: string[];
  areasForImprovement: string[];
}

export interface DevelopmentGoal {
  id: string;
  category: string;
  description: string;
  targetScore?: number;
  currentScore?: number;
  targetDate: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "ACHIEVED";
}

export interface DevelopmentPlan {
  id: string;
  playerId: string;
  playerName: string;
  currentPhase: string;
  goals: DevelopmentGoal[];
  lastReviewDate: string;
  nextReviewDate: string;
  coachNotes: string;
}

export interface CoachCertification {
  id: string;
  name: string;
  issuer: string;
  level: string;
  issueDate: string;
  expiryDate: string;
  documentUrl?: string;
  status: CertificationStatus;
}
