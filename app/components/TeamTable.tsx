import type { Team } from '../types';

interface TeamTableProps {
  teams: Team[];
  scoreKey?: 'score' | 'matchScore';
  showTournamentPoints?: boolean;
  hideScore?: boolean;
}

export function TeamTable({ 
  teams, 
  scoreKey = 'score', 
  showTournamentPoints = false,
  hideScore = false 
}: TeamTableProps) {
  const sortedTeams = [...teams].sort((a, b) => {
    // Jika menampilkan poin turnamen, urutkan berdasarkan poin tersebut dulu, baru skor murni
    if (showTournamentPoints) {
      if (b.score !== a.score) return (b.score || 0) - (a.score || 0);
    }
    return (b[scoreKey] || 0) - (a[scoreKey] || 0);
  });

  return (
    <div className="overflow-hidden bg-white rounded-3xl shadow-2xl border-2 border-blue-100">
      <table className="min-w-full divide-y divide-blue-200">
        <thead className="bg-blue-900">
          <tr>
            <th className="px-6 py-5 text-left text-sm font-black text-white uppercase tracking-widest">
              POS
            </th>
            <th className="px-6 py-5 text-left text-sm font-black text-white uppercase tracking-widest">
              KELOMPOK
            </th>
            {!hideScore && (
              <th className="px-6 py-5 text-right text-sm font-black text-white uppercase tracking-widest">
                {scoreKey === 'matchScore' ? 'WAKTU/SKOR' : 'TOTAL POIN'}
              </th>
            )}
            {showTournamentPoints && (
              <th className="px-6 py-5 text-right text-sm font-black text-yellow-400 uppercase tracking-widest bg-blue-950">
                POIN AKHIR
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-blue-50">
          {sortedTeams.map((team, index) => (
            <tr 
              key={team.id} 
              className={`hover:bg-blue-50 transition-colors ${index === 0 ? 'bg-yellow-50' : ''}`}
            >
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <span className={`
                    flex items-center justify-center w-8 h-8 rounded-full font-black text-sm
                    ${index === 0 ? 'bg-yellow-400 text-yellow-900 shadow-lg scale-110' : 
                      index === 1 ? 'bg-gray-300 text-gray-700' :
                      index === 2 ? 'bg-orange-300 text-orange-900' : 'bg-blue-100 text-blue-800'}
                  `}>
                    {index + 1}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-lg font-bold text-blue-900 uppercase">
                {team.name}
              </td>
              {!hideScore && (
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <span className="text-2xl font-black text-blue-700 tabular-nums">
                    {(team[scoreKey] || 0).toLocaleString()}
                  </span>
                </td>
              )}
              {showTournamentPoints && (
                <td className="px-6 py-4 whitespace-nowrap text-right bg-blue-50/50">
                  <span className={`text-2xl font-black tabular-nums ${team.score > 0 ? 'text-green-600' : 'text-gray-300'}`}>
                    {team.score > 0 ? team.score.toLocaleString() : '-'}
                  </span>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
