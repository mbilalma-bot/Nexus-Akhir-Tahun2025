import { useState, useEffect } from 'react';
import type { Team, Match, TournamentData } from '../types';

const STORAGE_KEY = 'tournament_data';

const initialTeams: Team[] = Array.from({ length: 9 }, (_, i) => ({
  id: i + 1,
  name: `Kelompok ${i + 1}`,
  score: 0,
  matchScore: 0,
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

  const calculateFinalPoints = (teams: Team[], matches: Match[]) => {
    // 1. Identifikasi Babak Final
    const finalMatch = matches.find(m => m.phase === 'final');
    const finalScores = finalMatch ? Object.values(finalMatch.scores) : [];
    const isFinalDone = finalMatch && finalScores.length > 0 && finalScores.every(s => s > 0);

    // 2. Hitung Match Score (Raw) - JANGAN DIKUMULASIKAN
    // Jika tim masuk final, matchScore = skor final
    // Jika tidak masuk final, matchScore = skor penyisihan
    const updatedTeams = teams.map(t => {
      let penyisihanScore = 0;
      let finalScore = 0;

      matches.forEach(m => {
        if (m.phase === 'penyisihan' && m.scores[t.id] !== undefined) {
          penyisihanScore += m.scores[t.id];
        }
        if (m.phase === 'final' && m.scores[t.id] !== undefined) {
          finalScore += m.scores[t.id];
        }
      });

      const isFinalist = finalMatch?.participants.includes(t.id);
      const displayMatchScore = isFinalist ? finalScore : penyisihanScore;

      return { ...t, matchScore: displayMatchScore };
    });

    // 3. Hitung Tournament Points (10, 7.5, 5, 3)
    // HANYA diberikan setelah FINAL SELESAI
    return updatedTeams.map(team => {
      let tournamentPoints = 0;

      if (isFinalDone && finalMatch) {
        if (finalMatch.participants.includes(team.id)) {
          // Finalis: Urutkan berdasarkan skor di babak FINAL saja
          const finalists = finalMatch.participants.map(id => ({
            id,
            score: finalMatch.scores[id] || 0
          })).sort((a, b) => b.score - a.score);

          const rank = finalists.findIndex(f => f.id === team.id) + 1;
          if (rank === 1) tournamentPoints = 10;
          else if (rank === 2) tournamentPoints = 7.5;
          else if (rank === 3) tournamentPoints = 5;
        } else {
          // Juara 4-9 (Non-Finalis): 3 poin
          tournamentPoints = 3;
        }
      }

      return { ...team, score: tournamentPoints };
    });
  };

  const addScore = (phase: 'penyisihan' | 'final', matchIndex: number, teamId: number, additionalScore: number) => {
    setData((prev) => {
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

      // Update total team score berdasarkan PERINGKAT (Bukan akumulasi murni)
      const newTeams = calculateFinalPoints(prev.teams, newMatches);

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

      const newTeams = calculateFinalPoints(prev.teams, newMatches);

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
