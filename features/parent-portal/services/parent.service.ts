import { ChildProfile, ParentEvent, DevelopmentReport, ParentInvoice, HighlightClip, ParentMessage } from "../types/parent.types";

const MOCK_CHILDREN: ChildProfile[] = [
  {
    id: "child_1",
    firstName: "Lucas",
    lastName: "Silva",
    fullName: "Lucas Silva",
    dateOfBirth: "2011-05-14",
    avatarUrl: "L",
    teamId: "team_1",
    teamName: "U15 Elite",
    ageGroupId: "ag_15",
    ageGroupName: "U15",
    position: "CM",
    jerseyNumber: 8,
    developmentPhase: "Foundation Phase",
    attendanceRate: 94
  },
  {
    id: "child_2",
    firstName: "Emma",
    lastName: "Silva",
    fullName: "Emma Silva",
    dateOfBirth: "2014-08-22",
    avatarUrl: "E",
    teamId: "team_2",
    teamName: "U12 Girls",
    ageGroupId: "ag_12",
    ageGroupName: "U12",
    position: "RW",
    jerseyNumber: 11,
    developmentPhase: "Discovery Phase",
    attendanceRate: 88
  }
];

const MOCK_EVENTS: Record<string, ParentEvent[]> = {
  "child_1": [
    { id: "evt_1", title: "Technical Training", type: "training", date: new Date().toISOString().split('T')[0], startTime: "16:30", endTime: "18:00", location: "Training Ground A", coachName: "Coach Mendes", rsvpStatus: "going" },
    { id: "evt_2", title: "League Match vs Elite FC", type: "match", date: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0], startTime: "10:00", endTime: "12:00", location: "Main Stadium", coachName: "Coach Mendes", rsvpStatus: "pending" }
  ],
  "child_2": [
    { id: "evt_3", title: "Skills Session", type: "training", date: new Date().toISOString().split('T')[0], startTime: "15:00", endTime: "16:30", location: "Indoor Pitch", coachName: "Coach Sarah", rsvpStatus: "going" }
  ]
};

const MOCK_REPORTS: Record<string, DevelopmentReport[]> = {
  "child_1": [
    {
      id: "rep_1",
      childId: "child_1",
      date: new Date(Date.now() - 86400000 * 14).toISOString().split('T')[0],
      title: "Mid-Season Review",
      coachName: "Coach Mendes",
      overallScore: 4.2,
      technicalScore: 4.5,
      tacticalScore: 4.0,
      physicalScore: 4.0,
      psychologicalScore: 4.5,
      comments: "Lucas has shown excellent progression in his passing range and decision making under pressure. He needs to continue working on his weaker foot.",
      strengths: ["Vision", "Passing Accuracy", "Leadership"],
      areasForDevelopment: ["Left foot finishing", "Aerial duels"]
    }
  ]
};

const MOCK_INVOICES: ParentInvoice[] = [
  { id: "inv_1", childId: "child_1", description: "Monthly Subscription - U15 Elite (May)", amount: 45.00, currency: "USD", dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], status: "outstanding", invoiceDate: new Date(Date.now() - 86400000 * 25).toISOString().split('T')[0] },
  { id: "inv_2", childId: "child_2", description: "Monthly Subscription - U12 Girls (May)", amount: 35.00, currency: "USD", dueDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0], status: "paid", invoiceDate: new Date(Date.now() - 86400000 * 25).toISOString().split('T')[0] },
];

const MOCK_HIGHLIGHTS: HighlightClip[] = [
  { id: "hl_1", childId: "child_1", title: "Great Assist", date: "2026-07-28", matchName: "U15 Elite vs Rovers", durationSeconds: 15, thumbnailUrl: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=600&auto=format&fit=crop" },
  { id: "hl_2", childId: "child_1", title: "Free Kick Goal", date: "2026-07-14", matchName: "Summer Cup Final", durationSeconds: 22, thumbnailUrl: "https://images.unsplash.com/photo-1518605368461-1e1e38ce8058?q=80&w=600&auto=format&fit=crop" }
];

class ParentService {
  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getChildren(parentId: string): Promise<ChildProfile[]> {
    await this.delay(300);
    return MOCK_CHILDREN;
  }

  async getChild(childId: string): Promise<ChildProfile | null> {
    await this.delay(200);
    return MOCK_CHILDREN.find(c => c.id === childId) || null;
  }

  async getSchedule(childId: string): Promise<ParentEvent[]> {
    await this.delay(400);
    return MOCK_EVENTS[childId] || [];
  }

  async updateRsvp(eventId: string, childId: string, status: "going" | "not_going" | "maybe"): Promise<void> {
    await this.delay(300);
    if (MOCK_EVENTS[childId]) {
      const event = MOCK_EVENTS[childId].find(e => e.id === eventId);
      if (event) {
        event.rsvpStatus = status;
      }
    }
  }

  async getDevelopmentReports(childId: string): Promise<DevelopmentReport[]> {
    await this.delay(300);
    return MOCK_REPORTS[childId] || [];
  }

  async getInvoices(parentId: string): Promise<ParentInvoice[]> {
    await this.delay(300);
    return MOCK_INVOICES;
  }

  async getHighlights(childId: string): Promise<HighlightClip[]> {
    await this.delay(300);
    return MOCK_HIGHLIGHTS.filter(h => h.childId === childId);
  }
}

export const parentService = new ParentService();
