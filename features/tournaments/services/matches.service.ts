import { Match, MatchEvent, StandingsEntry, MatchStatus } from "../types/match.types";

const MOCK_MATCHES: Match[] = [
  {
    id: "match_1",
    tournamentId: "trn_1",
    ageGroupId: "ag_1",
    round: "Final",
    homeTeamId: "team_1",
    homeTeamName: "Academy Blue",
    awayTeamId: "team_2",
    awayTeamName: "Real Madrid Youth",
    venueId: "ven_1",
    fieldId: "fld_1",
    refereeName: "Carlos Hernandez",
    date: "2026-08-12",
    startTime: "14:30",
    durationMinutes: 60,
    status: "live",
    homeScore: 2,
    awayScore: 1,
    locked: false
  },
  {
    id: "match_2",
    tournamentId: "trn_1",
    ageGroupId: "ag_1",
    round: "Semi Final",
    homeTeamId: "team_1",
    homeTeamName: "Academy Blue",
    awayTeamId: "team_3",
    awayTeamName: "United Youth",
    venueId: "ven_1",
    fieldId: "fld_1",
    date: "2026-08-11",
    startTime: "10:00",
    durationMinutes: 60,
    status: "completed",
    homeScore: 3,
    awayScore: 0,
    locked: true
  }
];

class MatchesService {
  private matches: Match[] = [...MOCK_MATCHES];
  private events: Record<string, MatchEvent[]> = {
    "match_1": [
      { id: "evt_1", matchId: "match_1", minute: 12, type: "goal", teamId: "team_1", playerName: "Diego", timestamp: new Date().toISOString() },
      { id: "evt_2", matchId: "match_1", minute: 24, type: "goal", teamId: "team_1", playerName: "Carlos", timestamp: new Date().toISOString() }
    ]
  };

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async getMatchesByTournament(tournamentId: string): Promise<Match[]> {
    await this.delay(400);
    return this.matches.filter(m => m.tournamentId === tournamentId);
  }

  async getMatch(id: string): Promise<Match | null> {
    await this.delay(200);
    return this.matches.find(m => m.id === id) || null;
  }

  async updateScore(matchId: string, homeScore: number, awayScore: number): Promise<Match> {
    await this.delay(300);
    const match = this.matches.find(m => m.id === matchId);
    if (!match) throw new Error("Match not found");
    if (match.locked) throw new Error("Match is locked");
    
    match.homeScore = homeScore;
    match.awayScore = awayScore;
    return { ...match };
  }

  async getMatchEvents(matchId: string): Promise<MatchEvent[]> {
    await this.delay(200);
    return this.events[matchId] || [];
  }

  async addMatchEvent(event: Omit<MatchEvent, "id" | "timestamp">): Promise<MatchEvent> {
    await this.delay(300);
    if (!this.events[event.matchId]) {
      this.events[event.matchId] = [];
    }
    const newEvent: MatchEvent = {
      ...event,
      id: `evt_${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    this.events[event.matchId].push(newEvent);
    return newEvent;
  }

  async getStandings(tournamentId: string, ageGroupId: string): Promise<StandingsEntry[]> {
    await this.delay(500);
    // Mock standings for U13 (ag_1)
    if (ageGroupId === "ag_1") {
      return [
        { teamId: "team_1", teamName: "Academy Blue", played: 4, won: 3, drawn: 1, lost: 0, goalsFor: 9, goalsAgainst: 2, goalDifference: 7, points: 10, position: 1 },
        { teamId: "team_2", teamName: "Academy Red", played: 4, won: 3, drawn: 0, lost: 1, goalsFor: 8, goalsAgainst: 3, goalDifference: 5, points: 9, position: 2 },
        { teamId: "team_3", teamName: "United Youth", played: 4, won: 1, drawn: 1, lost: 2, goalsFor: 4, goalsAgainst: 6, goalDifference: -2, points: 4, position: 3 }
      ];
    }
    return [];
  }
}

export const matchesService = new MatchesService();
