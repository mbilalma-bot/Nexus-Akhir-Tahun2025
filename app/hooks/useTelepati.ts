import { useState, useEffect } from 'react';
import type { Team, Match, TournamentData } from '../types';
import { useTeamMaster } from './useTeamMaster';

const STORAGE_KEY = 'telepati_games_data';

const initialTeams: Team[] = Array.from({ length: 9 }, (_, i) => ({
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
  const { teams: masterTeams } = useTeamMaster();
  const [data, setData] = useState<TournamentData>(() => {
    if (typeof window === 'undefined') return { teams: initialTeams, matches: initialMatches };
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : { teams: initialTeams, matches: initialMatches };
  });

  // Sinkronisasi nama kelompok dari Master Data
  useEffect(() => {
    setData(prev => ({
      ...prev,
      teams: prev.teams.map(t => {
        const masterTeam = masterTeams.find(mt => mt.id === t.id);
        return masterTeam ? { ...t, name: masterTeam.name } : t;
      })
    }));
  }, [masterTeams]);

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

      const teamsWithPoints = newTeams.map(t => {
        // Gunakan matchScore sebagai score (poin murni)
        return { ...t, score: t.matchScore || 0 };
      });

      return { ...prev, matches: newMatches, teams: teamsWithPoints };
    });
  };

  const resetMatchScore = (matchIdx: number) => {
    setData((prev) => {
      const newMatches = prev.matches.map((match, idx) => {
        if (idx === matchIdx) {
          return { ...match, scores: {} };
        }
        return match;
      });

      // Recalculate total scores for all teams
      const newTeams = prev.teams.map(team => {
        let totalMatchScore = 0;
        newMatches.forEach(m => {
          if (m.participants.includes(team.id)) {
            totalMatchScore += m.scores[team.id] || 0;
          }
        });
        return { ...team, matchScore: totalMatchScore, score: totalMatchScore };
      });

      return { ...prev, matches: newMatches, teams: newTeams };
    });
  };

  const updateMatchParticipant = (matchIndex: number, participantIndex: number, newTeamId: number) => {
    setData((prev) => {
      const newMatches = prev.matches.map((match, idx) => {
        if (idx === matchIndex) {
          const oldTeamId = match.participants[participantIndex];
          const newParticipants = [...match.participants];
          newParticipants[participantIndex] = newTeamId;

          const newScores = { ...match.scores };
          if (oldTeamId !== newTeamId) {
            newScores[newTeamId] = newScores[oldTeamId] || 0;
            if (!newParticipants.includes(oldTeamId)) {
              delete newScores[oldTeamId];
            }
          }
          return { ...match, participants: newParticipants, scores: newScores };
        }
        return match;
      });
      return { ...prev, matches: newMatches };
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
    updateMatchParticipant,
    resetData
  };
}
