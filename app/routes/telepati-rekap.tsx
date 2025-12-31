import { useTelepati } from "../hooks/useTelepati";
import { ScoreChart } from "../components/ScoreChart";

export function meta() {
  return [
    { title: "Telepati Games - Rekap Poin" },
    { name: "description", content: "Visualisasi perolehan poin Telepati Games" },
  ];
}

export default function TelepatiRekap() {
  const { data } = useTelepati();

  const sortedTeams = [...data.teams].sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black text-green-900 italic uppercase tracking-tighter">
          REKAP POIN <span className="text-green-600 underline decoration-green-300">TELEPATI</span>
        </h1>
        <p className="text-green-700 font-medium mt-1">Klasemen Sementara Game Kesamaan Gerakan</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {/* Podium Top 3 */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
            <span className="text-2xl">🏆</span> Peringkat Teratas
          </h2>
          {sortedTeams.slice(0, 3).map((team, idx) => (
            <div 
              key={team.id} 
              className={`p-6 rounded-2xl border-2 flex items-center justify-between shadow-lg transform transition-transform hover:scale-105 ${
                idx === 0 ? 'bg-green-600 border-green-400 text-white' : 'bg-white border-green-100 text-green-900'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`text-2xl font-black ${idx === 0 ? 'text-green-200' : 'text-green-400'}`}>
                  #{idx + 1}
                </span>
                <span className="font-bold text-lg truncate max-w-[150px]">{team.name}</span>
              </div>
              <div className="text-2xl font-black">{team.score}</div>
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl shadow-xl border border-green-100 min-h-[400px]">
          <ScoreChart 
            teams={data.teams} 
            color="#16a34a" 
            titleColor="#14532d"
            maxY={40}
            stepSize={10}
          />
        </div>
      </div>

      {/* Full Standings Table */}
      <div className="bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">
        <div className="bg-green-900 p-4 text-white font-bold text-center uppercase tracking-widest">
          Klasemen Lengkap
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-green-50 border-b border-green-100">
                <th className="px-6 py-4 text-green-800 font-black">POS</th>
                <th className="px-6 py-4 text-green-800 font-black">KELOMPOK</th>
                <th className="px-6 py-4 text-green-800 font-black text-right">TOTAL POIN</th>
              </tr>
            </thead>
            <tbody>
              {sortedTeams.map((team, idx) => (
                <tr key={team.id} className="border-b border-green-50 hover:bg-green-50/50 transition-colors">
                  <td className="px-6 py-4 font-black text-green-600">#{idx + 1}</td>
                  <td className="px-6 py-4 font-bold text-green-900">{team.name}</td>
                  <td className="px-6 py-4 font-black text-green-700 text-right text-xl">{team.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
