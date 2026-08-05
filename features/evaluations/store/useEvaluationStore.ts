import { create } from 'zustand';
import { Evaluation } from '../types/evaluation.types';

const INITIAL_EVALUATIONS: Evaluation[] = [
  { 
    id: '1', playerId: 'p1', playerName: 'Marcus Rashford', 
    evaluatorName: 'Coach Ten Hag', date: '2026-08-01', 
    type: 'Comprehensive', status: 'Completed',
    scores: { technical: 85, tactical: 82, physical: 90 }, overallScore: 86
  },
  { 
    id: '2', playerId: 'p2', playerName: 'Jude Bellingham', 
    evaluatorName: 'Coach Ancelotti', date: '2026-08-02', 
    type: 'Comprehensive', status: 'Completed',
    scores: { technical: 92, tactical: 94, physical: 88 }, overallScore: 91
  },
  { 
    id: '3', playerId: 'p3', playerName: 'Phil Foden', 
    evaluatorName: 'Coach Guardiola', date: '2026-08-04', 
    type: 'Technical', status: 'Draft',
    scores: { technical: 89, tactical: 80, physical: 75 }, overallScore: 81
  },
];

interface EvaluationState {
  evaluations: Evaluation[];
  addEvaluation: (evalData: Omit<Evaluation, 'id'>) => void;
}

export const useEvaluationStore = create<EvaluationState>((set) => ({
  evaluations: INITIAL_EVALUATIONS,
  
  addEvaluation: (evalData) => set((state) => ({
    evaluations: [
      {
        ...evalData,
        id: Math.random().toString(36).substr(2, 9),
      },
      ...state.evaluations,
    ]
  })),
}));
