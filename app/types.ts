export interface Team {
  id: number;
  name: string;
  score: number;
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
