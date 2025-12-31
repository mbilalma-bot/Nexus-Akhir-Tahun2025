import { useRankedGame } from "../hooks/useRankedGame";
import { ScoreChart } from "../components/ScoreChart";

export function meta() {
  return [
    { title: "Games Berantai - Arena" },
    { name: "description", content: "Input juara Games Berantai" },
  ];
}

export default function GamesBerantai() {
  const { data, setRank, updateTeamName, resetData } = useRankedGame('games_berantai_data');
  const scores = data.matches[0]?.scores || {};

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black text-red-600 italic uppercase tracking-tighter drop-shadow-sm">
          GAMES <span className="text-gray-900 underline decoration-red-500">BERANTAI</span>
        </h1>
        <p className="text-gray-500 font-bold mt-2 uppercase tracking-widest">Penentuan Juara & Poin</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Input Juara */}
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-red-100">
          <h2 className="text-2xl font-black text-gray-900 mb-8 uppercase flex items-center gap-3">
            <span className="bg-red-500 text-white w-10 h-10 rounded-xl flex items-center justify-center">🥇</span>
            Input Pemenang
          </h2>
          
          <div className="space-y-8">
            {[1, 2, 3].map((rank) => (
              <div key={rank} className="group">
                <label className="block text-sm font-black text-gray-500 uppercase tracking-widest mb-3">
                  Juara {rank} {rank === 1 ? '(10 Poin)' : rank === 2 ? '(7.5 Poin)' : '(5 Poin)'}
                </label>
                <select
                  value={scores[rank] || ''}
                  onChange={(e) => setRank(rank, Number(e.target.value))}
                  className="w-full bg-red-50 border-2 border-red-200 rounded-2xl px-6 py-4 text-lg font-bold text-gray-900 focus:ring-4 focus:ring-red-400 focus:border-red-400 outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="">Pilih Kelompok...</option>
                  {data.teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 text-center">
            <p className="text-gray-500 text-sm font-medium mb-4">Kelompok lain yang tidak dipilih akan otomatis mendapatkan 3 poin.</p>
            <button 
              onClick={resetData}
              className="text-red-500 font-black text-xs uppercase tracking-widest hover:text-red-700 transition-colors"
            >
              Reset Data Games Berantai
            </button>
          </div>
        </div>

        {/* Live Standings & Chart */}
        <div className="space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border-4 border-gray-100 min-h-[400px]">
            <ScoreChart teams={data.teams} color="#dc2626" titleColor="#991b1b" maxY={10} />
          </div>
          
          <div className="bg-gray-900 p-8 rounded-[2rem] shadow-2xl text-white">
            <h3 className="text-xl font-black mb-6 uppercase tracking-widest text-red-400">Hasil Poin</h3>
            <div className="grid grid-cols-2 gap-4">
              {data.teams.map(team => (
                <div key={team.id} className="bg-white/5 p-4 rounded-xl flex justify-between items-center border border-white/10">
                  <span className="font-bold text-sm truncate">{team.name}</span>
                  <span className="font-black text-red-400">{team.score}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
