import { useState, useEffect } from "react";
import type { TournamentData } from "../types";
import { useTeamMaster } from "../hooks/useTeamMaster";

export function meta() {
  return [
    { title: "Rekapan Akhir - MM Desa Cicalengka" },
    { name: "description", content: "Klasemen keseluruhan games" },
  ];
}

interface TeamScore {
  id: number;
  name: string;
  puzzle: number;
  telepati: number;
  color: number;
  berantai: number;
  total: number;
}

export default function RekapAkhir() {
  const { teams: masterTeams } = useTeamMaster();
  const [rekap, setRekap] = useState<TeamScore[]>([]);

  useEffect(() => {
    const puzzleData: TournamentData = JSON.parse(localStorage.getItem('tournament_data') || '{"teams": []}');
    const telepatiData: TournamentData = JSON.parse(localStorage.getItem('telepati_games_data_v2') || '{"teams": []}');
    const colorData: TournamentData = JSON.parse(localStorage.getItem('color_battle_data') || '{"teams": []}');
    const berantaiData: TournamentData = JSON.parse(localStorage.getItem('games_berantai_data') || '{"teams": []}');

    const combined: TeamScore[] = masterTeams.map((masterTeam) => {
      const id = masterTeam.id;
      const name = masterTeam.name;
      const p = puzzleData.teams.find(t => t.id === id)?.score || 0;
      const t = telepatiData.teams.find(t => t.id === id)?.score || 0;
      const c = colorData.teams.find(t => t.id === id)?.score || 0;
      const b = berantaiData.teams.find(t => t.id === id)?.score || 0;
      
      return {
        id,
        name,
        puzzle: p,
        telepati: t,
        color: c,
        berantai: b,
        total: p + t + c + b
      };
    });

    setRekap(combined);
  }, [masterTeams]);

  const sortedRekap = [...rekap].sort((a, b) => b.total - a.total);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-6xl font-black text-gray-900 italic uppercase tracking-tighter mb-4 drop-shadow-sm">
          REKAPAN <span className="text-blue-600 underline decoration-blue-200">AKHIR</span>
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-[0.3em]">Klasemen Keseluruhan Games</p>
      </div>

      <div className="space-y-16">
        {/* Tabel 1: Perolehan Poin */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-3 bg-blue-600 rounded-full"></div>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Perolehan Poin</h2>
          </div>
          
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-gray-100">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-900 text-white">
                    <th className="px-8 py-6 font-black uppercase tracking-wider text-sm border-r border-white/10">Nama Kelompok</th>
                    <th className="px-6 py-6 font-black uppercase tracking-wider text-sm text-center border-r border-white/10 bg-blue-800">Puzzle Battle</th>
                    <th className="px-6 py-6 font-black uppercase tracking-wider text-sm text-center border-r border-white/10 bg-green-800">Telepati</th>
                    <th className="px-6 py-6 font-black uppercase tracking-wider text-sm text-center border-r border-white/10 bg-yellow-700">Color Battle</th>
                    <th className="px-6 py-6 font-black uppercase tracking-wider text-sm text-center border-r border-white/10 bg-red-800">Berantai</th>
                    <th className="px-8 py-6 font-black uppercase tracking-wider text-sm text-center bg-indigo-900">Total Poin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {rekap.map((row) => (
                    <tr key={row.id} className="hover:bg-gray-50 transition-colors group">
                      <td className="px-8 py-5 font-bold text-gray-900 border-r border-gray-100 group-hover:text-blue-600">{row.name}</td>
                      <td className="px-6 py-5 text-center font-black text-blue-700 bg-blue-50/30 border-r border-gray-100">{row.puzzle}</td>
                      <td className="px-6 py-5 text-center font-black text-green-700 bg-green-50/30 border-r border-gray-100">{row.telepati}</td>
                      <td className="px-6 py-5 text-center font-black text-yellow-700 bg-yellow-50/30 border-r border-gray-100">{row.color}</td>
                      <td className="px-6 py-5 text-center font-black text-red-700 bg-red-50/30 border-r border-gray-100">{row.berantai}</td>
                      <td className="px-8 py-5 text-center font-black text-indigo-900 bg-indigo-50 group-hover:bg-indigo-100 transition-colors text-xl">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Tabel 2: Klasemen Akhir */}
        <section>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-3 bg-yellow-500 rounded-full"></div>
            <h2 className="text-3xl font-black text-gray-900 uppercase tracking-tight">Klasemen Akhir</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border-4 border-yellow-100">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-yellow-500 text-white">
                    <th className="px-8 py-6 font-black uppercase tracking-wider text-sm w-20">Rank</th>
                    <th className="px-8 py-6 font-black uppercase tracking-wider text-sm">Nama Kelompok</th>
                    <th className="px-8 py-6 font-black uppercase tracking-wider text-sm text-center">Total Poin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sortedRekap.map((row, index) => (
                    <tr key={row.id} className={`
                      ${index === 0 ? 'bg-yellow-50/50' : ''} 
                      hover:bg-gray-50 transition-colors
                    `}>
                      <td className="px-8 py-6">
                        <span className={`
                          w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg
                          ${index === 0 ? 'bg-yellow-400 text-white ring-4 ring-yellow-200' : 
                            index === 1 ? 'bg-gray-300 text-white' :
                            index === 2 ? 'bg-orange-300 text-white' : 'bg-gray-100 text-gray-400'}
                        `}>
                          {index + 1}
                        </span>
                      </td>
                      <td className={`px-8 py-6 font-black text-lg ${index === 0 ? 'text-yellow-700' : 'text-gray-900'}`}>
                        {row.name}
                        {index === 0 && <span className="ml-3">👑</span>}
                      </td>
                      <td className="px-8 py-6 text-center font-black text-2xl text-indigo-900">
                        {row.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
              <h3 className="text-2xl font-black mb-8 uppercase tracking-widest text-yellow-400">Pesan Semangat</h3>
              <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Selamat kepada semua kelompok yang telah berpartisipasi! Poin ini adalah hasil dari kerja keras, kekompakan, dan sportivitas kalian selama mengikuti rangkaian games.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-3xl">🥇</div>
                  <div>
                    <div className="text-xs font-black uppercase text-yellow-500 tracking-tighter">Juara Umum</div>
                    <div className="text-xl font-bold">{sortedRekap[0]?.name || '-'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
