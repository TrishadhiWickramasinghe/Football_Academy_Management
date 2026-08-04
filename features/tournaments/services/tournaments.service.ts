import { Tournament, TournamentStatus, TeamRegistration } from "../types/tournament.types";

const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: "trn_1",
    tenantId: "tenant_1",
    name: "Academy Summer Cup",
    description: "The biggest academy tournament of the season.",
    startDate: "2026-08-10",
    endDate: "2026-08-12",
    timezone: "America/Mexico_City",
    location: "Mexico City",
    format: "group_knockout",
    status: "live",
    publicSlug: "academy-summer-cup-2026",
    ageGroups: [
      { id: "ag_1", name: "U13", maxTeams: 16, matchDurationMinutes: 60, restMinutes: 30, fieldSize: "11v11", rosterSize: 18 },
      { id: "ag_2", name: "U15", maxTeams: 16, matchDurationMinutes: 70, restMinutes: 30, fieldSize: "11v11", rosterSize: 18 }
    ],
    venues: [
      { 
        id: "ven_1", 
        name: "National Sports Complex", 
        address: "123 Stadium Drive", 
        timezone: "America/Mexico_City",
        fields: [
          { id: "fld_1", venueId: "ven_1", name: "Field 1", surface: "Grass", availability: "08:00-18:00" },
          { id: "fld_2", venueId: "ven_1", name: "Field 2", surface: "Artificial", availability: "08:00-18:00" }
        ]
      }
    ],
    rules: {
      pointsForWin: 3,
      pointsForDraw: 1,
      pointsForLoss: 0,
      tiebreakers: ["points", "goal_difference", "goals_scored", "head_to_head"]
    }
  },
  {
    id: "trn_2",
    tenantId: "tenant_1",
    name: "Winter Indoor Invitational",
    startDate: "2026-11-20",
    endDate: "2026-11-22",
    timezone: "America/New_York",
    location: "New York",
    format: "round_robin",
    status: "registration_open",
    publicSlug: "winter-indoor-2026",
    ageGroups: [],
    venues: [],
    rules: { pointsForWin: 3, pointsForDraw: 1, pointsForLoss: 0, tiebreakers: [] }
  }
];

class TournamentsService {
  private tournaments: Tournament[] = [...MOCK_TOURNAMENTS];

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getTournaments(tenantId: string): Promise<Tournament[]> {
    await this.delay(500);
    return this.tournaments.filter(t => t.tenantId === tenantId);
  }

  async getTournament(id: string): Promise<Tournament | null> {
    await this.delay(300);
    return this.tournaments.find(t => t.id === id) || null;
  }

  async createTournament(tournament: Omit<Tournament, "id" | "status">): Promise<Tournament> {
    await this.delay(800);
    const newTournament: Tournament = {
      ...tournament,
      id: `trn_${Date.now()}`,
      status: "draft"
    };
    this.tournaments.push(newTournament);
    return newTournament;
  }

  async updateTournamentStatus(id: string, status: TournamentStatus): Promise<Tournament> {
    await this.delay(400);
    const index = this.tournaments.findIndex(t => t.id === id);
    if (index === -1) throw new Error("Tournament not found");
    this.tournaments[index] = { ...this.tournaments[index], status };
    return this.tournaments[index];
  }
}

export const tournamentsService = new TournamentsService();
