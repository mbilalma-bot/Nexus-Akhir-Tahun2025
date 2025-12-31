export interface Team {
  id: number;
  name: string;
  score: number; // Tournament Points (10, 7.5, 5, 3)
  matchScore: number; // Raw Match Score (seconds/points)
}

export interface Match {
  phase: 'penyisihan' | 'final';
  participants: number[]; // Array of team IDs
  scores: Record<number, number>; // Team ID -> Score
}

export interface TournamentData {
  teams: Team[];
  matches: Match[];
}
