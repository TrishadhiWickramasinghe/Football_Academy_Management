export type EvaluationType = 'Technical' | 'Tactical' | 'Physical' | 'Comprehensive';

export interface Evaluation {
  id: string;
  playerId: string;
  playerName: string;
  evaluatorName: string;
  date: string;
  type: EvaluationType;
  scores: {
    technical: number;
    tactical: number;
    physical: number;
  };
  overallScore: number;
  status: 'Draft' | 'Completed';
}
