import { useState, useEffect } from 'react';
import type { Team, Match, TournamentData } from '../types';

const STORAGE_KEY = 'telepati_games_data';

const initialTeams: Team[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  name: `Kelompok ${i + 1}`,
  score: 0,
  matchScore: 0,
}));

const initialMatches: Match[] = [
  { phase: 'penyisihan', participants: [1, 2], scores: { 1: 0, 2: 0 } },
  { phase: 'penyisihan', participants: [3, 4], scores: { 3: 0, 4: 0 } },
  { phase: 'penyisihan', participants: [5, 6], scores: { 5: 0, 6: 0 } },
  { phase: 'penyisihan', participants: [7, 8], scores: { 7: 0, 8: 0 } },
];

export function useTelepati() {
  const [data, setData] = useState<TournamentData>(() => {
    if (typeof window === 'undefined') return { teams: initialTeams, matches: initialMatches };
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { teams: initialTeams, matches: initialMatches };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const updateTeamName = (id: number, name: string) => {
    setData((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => (t.id === id ? { ...t, name } : t)),
    }));
  };

  const addScore = (matchIndex: number, teamId: number, additionalScore: number) => {
    setData((prev) => {
      const newMatches = prev.matches.map((match, idx) => {
        if (idx === matchIndex) {
          return {
            ...match,
            scores: {
              ...match.scores,
              [teamId]: (match.scores[teamId] || 0) + additionalScore
            }
          };
        }
        return match;
      });

      const newTeams = prev.teams.map(t => {
        let totalMatchScore = 0;
        newMatches.forEach(m => {
          if (m.scores[t.id] !== undefined) {
            totalMatchScore += m.scores[t.id];
          }
        });
        return { ...t, matchScore: totalMatchScore };
      });

      // Hitung Poin Turnamen (10, 7.5, 5, 3) berdasarkan ranking matchScore
      // Urutkan tim berdasarkan matchScore tertinggi
      const sortedByScore = [...newTeams].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      
      const teamsWithPoints = newTeams.map(t => {
        let tournamentPoints = 0;
        const rank = sortedByScore.findIndex(s => s.id === t.id) + 1;
        const hasScore = (t.matchScore || 0) > 0;

        if (hasScore) {
          if (rank === 1) tournamentPoints = 10;
          else if (rank === 2) tournamentPoints = 7.5;
          else if (rank === 3) tournamentPoints = 5;
          else tournamentPoints = 3;
        } else {
          // Jika belum ada skor, poin tetap 0 atau 3? 
          // Di useRankedGame defaultnya 3. Kita ikuti saja agar konsisten jika sudah mulai input.
          // Tapi kalau benar-benar 0 skornya (belum main), mungkin lebih baik 0.
          tournamentPoints = 0;
        }

        return { ...t, score: tournamentPoints };
      });

      return { ...prev, matches: newMatches, teams: teamsWithPoints };
    });
  };

  const resetMatchScore = (matchIndex: number) => {
    if (!confirm('Reset skor untuk pertandingan ini?')) return;
    
    setData((prev) => {
      const newMatches = prev.matches.map((match, idx) => {
        if (idx === matchIndex) {
          const resetScores = { ...match.scores };
          match.participants.forEach(id => {
            resetScores[id] = 0;
          });
          return {
            ...match,
            scores: resetScores
          };
        }
        return match;
      });

      const newTeams = prev.teams.map(t => {
        let totalMatchScore = 0;
        newMatches.forEach(m => {
          if (m.scores[t.id] !== undefined) {
            totalMatchScore += m.scores[t.id];
          }
        });
        return { ...t, matchScore: totalMatchScore };
      });

      // Hitung Poin Turnamen (10, 7.5, 5, 3) berdasarkan ranking matchScore
      const sortedByScore = [...newTeams].sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
      
      const teamsWithPoints = newTeams.map(t => {
        let tournamentPoints = 0;
        const rank = sortedByScore.findIndex(s => s.id === t.id) + 1;
        const hasScore = (t.matchScore || 0) > 0;

        if (hasScore) {
          if (rank === 1) tournamentPoints = 10;
          else if (rank === 2) tournamentPoints = 7.5;
          else if (rank === 3) tournamentPoints = 5;
          else tournamentPoints = 3;
        } else {
          tournamentPoints = 0;
        }

        return { ...t, score: tournamentPoints };
      });

      return { ...prev, matches: newMatches, teams: teamsWithPoints };
    });
  };

  const resetData = () => {
    if (confirm('Apakah Anda yakin ingin mereset semua data Telepati Games?')) {
      const resetState = { teams: initialTeams, matches: initialMatches };
      setData(resetState);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resetState));
    }
  };

  return {
    data,
    updateTeamName,
    addScore,
    resetMatchScore,
    resetData
  };
}
