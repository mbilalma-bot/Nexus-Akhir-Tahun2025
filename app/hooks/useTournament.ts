import { useState, useEffect } from 'react';
import type { Team, Match, TournamentData } from '../types';

const STORAGE_KEY = 'puzzle_battle_data';

const initialTeams: Team[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `Kelompok ${i + 1}`,
  score: 0,
}));

const initialMatches: Match[] = [
  { phase: 'penyisihan', participants: [1, 2, 3], scores: { 1: 0, 2: 0, 3: 0 } },
  { phase: 'penyisihan', participants: [4, 5, 6], scores: { 4: 0, 5: 0, 6: 0 } },
  { phase: 'penyisihan', participants: [7, 8, 9], scores: { 7: 0, 8: 0, 9: 0 } },
];

export function useTournament() {
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

  const addScore = (phase: 'penyisihan' | 'final', matchIndex: number, teamId: number, additionalScore: number) => {
    setData((prev) => {
      // Temukan index absolut di dalam array matches asli
      let currentMatchCount = 0;
      const newMatches = prev.matches.map((match) => {
        if (match.phase === phase) {
          if (currentMatchCount === matchIndex) {
            currentMatchCount++;
            return {
              ...match,
              scores: {
                ...match.scores,
                [teamId]: (match.scores[teamId] || 0) + additionalScore
              }
            };
          }
          currentMatchCount++;
        }
        return match;
      });

      // Update total team score berdasarkan matches yang baru
      const newTeams = prev.teams.map(t => {
        let totalScore = 0;
        newMatches.forEach(m => {
          if (m.scores[t.id] !== undefined) {
            totalScore += m.scores[t.id];
          }
        });
        return { ...t, score: totalScore };
      });

      return { ...prev, matches: newMatches, teams: newTeams };
    });
  };

  const resetMatchScore = (phase: 'penyisihan' | 'final', matchIndex: number) => {
    if (!confirm('Reset skor untuk pertandingan ini?')) return;
    
    setData((prev) => {
      let currentMatchCount = 0;
      const newMatches = prev.matches.map((match) => {
        if (match.phase === phase) {
          if (currentMatchCount === matchIndex) {
            currentMatchCount++;
            const resetScores = { ...match.scores };
            match.participants.forEach(id => {
              resetScores[id] = 0;
            });
            return {
              ...match,
              scores: resetScores
            };
          }
          currentMatchCount++;
        }
        return match;
      });

      const newTeams = prev.teams.map(t => {
        let totalScore = 0;
        newMatches.forEach(m => {
          if (m.scores[t.id] !== undefined) {
            totalScore += m.scores[t.id];
          }
        });
        return { ...t, score: totalScore };
      });

      return { ...prev, matches: newMatches, teams: newTeams };
    });
  };

  const getWinners = (phase: 'penyisihan') => {
    const phaseMatches = data.matches.filter(m => m.phase === phase);
    return phaseMatches.map(m => {
      let maxScore = -1;
      let winnerId = -1;
      Object.entries(m.scores).forEach(([id, score]) => {
        if (score > maxScore) {
          maxScore = score;
          winnerId = Number(id);
        }
      });
      return winnerId;
    }).filter(id => id !== -1);
  };

  const resetData = () => {
    if (confirm('Apakah Anda yakin ingin mereset semua data?')) {
      setData({ teams: initialTeams, matches: initialMatches });
    }
  };

  const setupFinal = () => {
    const winners = getWinners('penyisihan');
    if (winners.length < 3) {
      alert('Selesaikan babak penyisihan terlebih dahulu!');
      return;
    }
    
    setData(prev => {
      // Check if final already exists
      const hasFinal = prev.matches.some(m => m.phase === 'final');
      if (hasFinal) {
        // Update existing final participants if they changed
        const newMatches = prev.matches.map(m => {
          if (m.phase === 'final') {
            return { ...m, participants: winners, scores: Object.fromEntries(winners.map(id => [id, m.scores[id] || 0])) };
          }
          return m;
        });
        return { ...prev, matches: newMatches };
      }

      const finalMatch: Match = {
        phase: 'final',
        participants: winners,
        scores: Object.fromEntries(winners.map(id => [id, 0]))
      };
      return { ...prev, matches: [...prev.matches, finalMatch] };
    });
  };

  return {
    data,
    updateTeamName,
    addScore,
    resetMatchScore,
    resetData,
    getWinners,
    setupFinal
  };
}
