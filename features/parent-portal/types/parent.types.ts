export interface ChildProfile {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  dateOfBirth: string;
  avatarUrl?: string;
  teamId: string;
  teamName: string;
  ageGroupId: string;
  ageGroupName: string;
  position: string;
  jerseyNumber?: number;
  developmentPhase: string;
  attendanceRate: number;
}

export interface ParentEvent {
  id: string;
  title: string;
  type: "training" | "match" | "tournament" | "event";
  date: string; // ISO
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  location: string;
  teamId?: string;
  coachName?: string;
  rsvpStatus?: "going" | "not_going" | "maybe" | "pending";
}

export interface DevelopmentReport {
  id: string;
  childId: string;
  date: string;
  title: string;
  coachName: string;
  overallScore: number; // out of 5
  technicalScore: number;
  tacticalScore: number;
  physicalScore: number;
  psychologicalScore: number;
  comments: string;
  strengths: string[];
  areasForDevelopment: string[];
}

export interface ParentInvoice {
  id: string;
  childId?: string; // Optional if it applies to multiple or the parent account
  description: string;
  amount: number;
  currency: string;
  dueDate: string;
  status: "paid" | "outstanding" | "overdue";
  invoiceDate: string;
}

export interface HighlightClip {
  id: string;
  childId: string;
  title: string;
  date: string;
  matchName: string;
  durationSeconds: number;
  thumbnailUrl: string;
  videoUrl?: string;
}

export interface ParentMessage {
  id: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}
