import { useState, useEffect } from 'react';
import type { Team, TournamentData } from '../types';

const getInitialTeams = (length: number) => Array.from({ length }, (_, i) => ({
  id: i + 1,
  name: `Kelompok ${i + 1}`,
  score: 0,
  matchScore: 0,
}));

export function useRankedGame(storageKey: string, teamCount: number = 9) {
  const [data, setData] = useState<TournamentData>(() => {
    if (typeof window === 'undefined') return { teams: getInitialTeams(teamCount), matches: [] };
    const saved = localStorage.getItem(storageKey);
    // Kita simpan ranking di matches.scores sebagai { rank: teamId }
    return saved ? JSON.parse(saved) : { teams: getInitialTeams(teamCount), matches: [{ phase: 'penyisihan', participants: Array.from({length: teamCount}, (_, i) => i + 1), scores: {} }] };
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  const updateTeamName = (id: number, name: string) => {
    setData((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => (t.id === id ? { ...t, name } : t)),
    }));
  };

  const setRank = (rank: number, teamId: number) => {
    setData((prev) => {
      const newMatches = [...prev.matches];
      const match = newMatches[0];
      
      // Hapus teamId dari rank lain jika sudah ada
      const newScores = { ...match.scores };
      Object.keys(newScores).forEach(r => {
        if (newScores[Number(r)] === teamId) {
          delete newScores[Number(r)];
        }
      });
      
      // Set rank baru
      newScores[rank] = teamId;
      match.scores = newScores;

      // Hitung ulang poin semua tim
      const newTeams = prev.teams.map(t => {
        let score = 3; // Default poin untuk peringkat 4-8 (atau yang belum juara 1-3)
        
        // Cek apakah tim ini juara 1, 2, atau 3
        if (newScores[1] === t.id) score = 10;
        else if (newScores[2] === t.id) score = 7.5;
        else if (newScores[3] === t.id) score = 5;
        
        // Jika belum ada juara sama sekali, atau data masih kosong, biarkan 0 jika diperlukan
        // Tapi permintaan user: 1=10, 2=7.5, 3=5, 4-8=3. 
        // Agar adil, yang belum di-set juara 1-3 dianggap 4-8.
        
        return { ...t, score };
      });

      return { ...prev, matches: newMatches, teams: newTeams };
    });
  };

  const resetData = () => {
    if (confirm('Apakah Anda yakin ingin mereset data game ini?')) {
      setData({ 
        teams: getInitialTeams(teamCount), 
        matches: [{ phase: 'penyisihan', participants: Array.from({length: teamCount}, (_, i) => i + 1), scores: {} }] 
      });
    }
  };

  return {
    data,
    updateTeamName,
    setRank,
    resetData
  };
}
