import { 
  CoachTeam, 
  TrainingSession, 
  Drill, 
  AttendanceRecord, 
  Evaluation, 
  DevelopmentPlan, 
  CoachCertification,
  PlayerOverview
} from "../types/coaching.types";

const mockTeams: CoachTeam[] = [
  {
    id: "team-1",
    name: "U15 Elite",
    ageGroup: "U15",
    playerCount: 18,
    headCoach: "Coach Smith",
    assistantCoaches: ["Coach Dave"],
    nextSession: {
      id: "session-1",
      date: new Date().toISOString().split('T')[0],
      time: "16:30"
    },
    attendanceRate: 94
  },
  {
    id: "team-2",
    name: "U14 Development",
    ageGroup: "U14",
    playerCount: 16,
    headCoach: "Coach Smith",
    assistantCoaches: [],
    attendanceRate: 88
  }
];

const mockDrills: Drill[] = [
  {
    id: "drill-1",
    title: "1v1 Decision Making",
    thumbnail: "https://images.unsplash.com/photo-1518605368461-1e1e1fd51ed4?q=80&w=300&auto=format&fit=crop",
    ageGroup: ["U12", "U14", "U15"],
    durationMinutes: 15,
    difficulty: "Intermediate",
    minPlayers: 4,
    maxPlayers: 12,
    objective: "Improve decision making in tight spaces.",
    methodologyPhase: "Decision & Awareness",
    equipment: ["Cones", "Bibs", "Balls"],
    description: "Players face off in 1v1 situations with passing options on the outside.",
    setup: "20x20 grid with 4 mini goals.",
    instructions: "Attacker tries to score. Defender tries to win the ball and transition.",
    coachingPoints: ["Keep head up", "Change of pace", "Use body to protect ball"]
  },
  {
    id: "drill-2",
    title: "Passing Combinations",
    thumbnail: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=300&auto=format&fit=crop",
    ageGroup: ["U10", "U12", "U14"],
    durationMinutes: 10,
    difficulty: "Beginner",
    minPlayers: 3,
    maxPlayers: 16,
    objective: "Quick passing and moving.",
    methodologyPhase: "Technical Expansion",
    equipment: ["Balls", "Cones"],
    description: "Triangle passing drill focused on one-touch passing.",
    setup: "Triangle of cones 10 yards apart.",
    instructions: "Pass and follow your pass. Keep it on the ground.",
    coachingPoints: ["Pace of pass", "Open body shape", "Eye contact"]
  }
];

const mockSessions: TrainingSession[] = [
  {
    id: "session-1",
    title: "U15 Technical Development",
    teamId: "team-1",
    teamName: "U15 Elite",
    ageGroup: "U15",
    date: new Date().toISOString().split('T')[0],
    startTime: "16:30",
    endTime: "18:00",
    location: "Training Ground A",
    coachId: "coach-1",
    theme: "Attacking Transition",
    objectives: ["Speed of play", "Forward passing"],
    methodology: "Kimero Method",
    status: "SCHEDULED",
    drills: [
      {
        id: "sd-1",
        drillId: "drill-2",
        drill: mockDrills[1],
        durationMinutes: 10,
        order: 1,
        customNotes: "Focus on weak foot passing."
      },
      {
        id: "sd-2",
        drillId: "drill-1",
        drill: mockDrills[0],
        durationMinutes: 20,
        order: 2
      }
    ],
    attendanceTaken: false
  },
  {
    id: "session-2",
    title: "U14 Match Prep",
    teamId: "team-2",
    teamName: "U14 Development",
    ageGroup: "U14",
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // tomorrow
    startTime: "17:00",
    endTime: "18:30",
    location: "Pitch 2",
    coachId: "coach-1",
    theme: "Defensive Shape",
    objectives: ["Compactness", "Communication"],
    methodology: "Kimero Method",
    status: "DRAFT",
    drills: [],
    attendanceTaken: false
  }
];

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

class CoachingService {
  async getCoachDashboardSummary(coachId: string) {
    await delay(300);
    return {
      todaySessionsCount: 1,
      teamsCount: 2,
      pendingEvaluations: 0,
      attendanceRate: 91
    };
  }

  async getCoachTeams(coachId: string): Promise<CoachTeam[]> {
    await delay(400);
    return mockTeams;
  }

  async getTeam(teamId: string): Promise<CoachTeam | undefined> {
    await delay(300);
    return mockTeams.find(t => t.id === teamId);
  }

  async getTrainingSessions(coachId: string): Promise<TrainingSession[]> {
    await delay(500);
    return mockSessions;
  }

  async getTrainingSession(sessionId: string): Promise<TrainingSession | undefined> {
    await delay(300);
    return mockSessions.find(s => s.id === sessionId);
  }

  async getDrills(): Promise<Drill[]> {
    await delay(400);
    return mockDrills;
  }
  
  async getDrill(drillId: string): Promise<Drill | undefined> {
    await delay(300);
    return mockDrills.find(d => d.id === drillId);
  }

  async getSessionAttendance(sessionId: string): Promise<AttendanceRecord[]> {
    await delay(400);
    // Mock 14 players
    return Array.from({ length: 14 }).map((_, i) => ({
      id: `att-${i}`,
      sessionId,
      playerId: `player-${i}`,
      playerName: `Player ${String.fromCharCode(65 + i)}`,
      status: i === 12 ? "ABSENT" : i === 13 ? "LATE" : "PRESENT",
      notes: i === 12 ? "Sick" : undefined
    }));
  }

  async getEvaluations(coachId: string): Promise<Evaluation[]> {
    await delay(500);
    return [];
  }

  async getDevelopmentPlans(coachId: string): Promise<DevelopmentPlan[]> {
    await delay(500);
    return [];
  }

  async getCoachCertifications(coachId: string): Promise<CoachCertification[]> {
    await delay(400);
    return [
      {
        id: "cert-1",
        name: "UEFA B License",
        issuer: "UEFA",
        level: "B",
        issueDate: "2022-05-10",
        expiryDate: "2026-10-15",
        status: "VALID"
      },
      {
        id: "cert-2",
        name: "First Aid Level 1",
        issuer: "Red Cross",
        level: "1",
        issueDate: "2024-01-12",
        expiryDate: "2026-08-30", // Expiring soon
        status: "EXPIRING_SOON"
      }
    ];
  }
}

export const coachingService = new CoachingService();
