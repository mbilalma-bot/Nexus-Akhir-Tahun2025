import { useState, useEffect } from 'react';

export interface TeamMaster {
  id: number;
  name: string;
}

const DEFAULT_TEAMS: TeamMaster[] = [
  { id: 1, name: "The Only One Borealis" },
  { id: 2, name: "Qamar" },
  { id: 3, name: "Zenit" },
  { id: 4, name: "Alfa Centauri" },
  { id: 5, name: "Arcturus" },
  { id: 6, name: "Helix" },
  { id: 7, name: "Nebula" },
  { id: 8, name: "Pluto" },
  { id: 9, name: "Guardian" },
];

const MASTER_KEY = 'master_team_names';

export function useTeamMaster() {
  const [teams, setTeams] = useState<TeamMaster[]>(() => {
    if (typeof window === 'undefined') return DEFAULT_TEAMS;
    const saved = localStorage.getItem(MASTER_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_TEAMS;
  });

  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    localStorage.setItem(MASTER_KEY, JSON.stringify(teams));
    // Dispatch custom event for cross-hook synchronization
    window.dispatchEvent(new CustomEvent('teamMasterUpdate', { detail: teams }));
  }, [teams]);

  const updateTeamName = async (id: number, name: string) => {
    if (!name.trim()) {
      setFeedback({ type: 'error', message: 'Nama kelompok tidak boleh kosong!' });
      return;
    }

    setIsSaving(true);
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTeams(prev => prev.map(t => t.id === id ? { ...t, name } : t));
      setFeedback({ type: 'success', message: `Nama Kelompok ${id} berhasil diperbarui.` });
    } catch (error) {
      setFeedback({ type: 'error', message: 'Gagal menyimpan perubahan.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const getTeamName = (id: number) => {
    return teams.find(t => t.id === id)?.name || `Kelompok ${id}`;
  };

  return {
    teams,
    updateTeamName,
    getTeamName,
    isSaving,
    feedback
  };
}
