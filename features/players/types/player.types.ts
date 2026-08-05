export type PlayerStatus = 'Active' | 'Injured' | 'Suspended' | 'Trial' | 'Pending';

export interface Player {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  dateOfBirth: string;
  team: string;
  position: string;
  status: PlayerStatus;
  guardianName?: string;
  medicalClearance: boolean;
}
