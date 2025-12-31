import { useTournament } from "../hooks/useTournament";
import { ScoreInput } from "../components/ScoreInput";

export default function Final() {
  const { data, addScore, updateTeamName, setupFinal, resetMatchScore } = useTournament();
  
  const finalMatch = data.matches.find(m => m.phase === 'final');
  const penyisihanDone = data.matches.filter(m => m.phase === 'penyisihan').every(m => 
    Object.values(m.scores).some(s => s > 0)
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-black text-blue-900 mb-2 uppercase tracking-tighter">Puzzle Battle</h1>
        <p className="text-blue-600 font-bold">Babak Final</p>
      </header>

      {!finalMatch ? (
        <div className="text-center py-24 bg-blue-50 rounded-3xl border-4 border-dashed border-blue-200 shadow-inner">
          <p className="text-blue-800 mb-8 text-xl font-bold">
            {penyisihanDone 
              ? "Babak Penyisihan selesai! Siap untuk menentukan Sang Juara?"
              : "Menunggu hasil Babak Penyisihan..."}
          </p>
          <button
            onClick={setupFinal}
            disabled={!penyisihanDone}
            className={`px-12 py-4 rounded-full font-black text-xl shadow-2xl transition-all transform ${
              penyisihanDone 
                ? "bg-yellow-500 hover:bg-yellow-600 text-white hover:scale-110 active:scale-95" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-50"
            }`}
          >
            🔥 MULAI BABAK FINAL 🔥
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white py-6 px-8 rounded-2xl shadow-2xl flex justify-between items-center border-b-4 border-yellow-700">
            <h2 className="text-3xl font-black italic tracking-widest">GRAND FINAL 🏆</h2>
            <button 
              onClick={() => resetMatchScore('final', 0)}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-xl text-sm font-black transition-colors shadow-lg uppercase"
            >
              Reset Skor Final
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            {finalMatch.participants.map(teamId => {
              const team = data.teams.find(t => t.id === teamId)!;
              return (
                <ScoreInput
                  key={teamId}
                  team={team}
                  onSave={(score) => addScore('final', 0, teamId, score)}
                  onUpdateName={(name) => updateTeamName(teamId, name)}
                />
              );
            })}
          </div>

          {/* Large Live Scoreboard */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {finalMatch.participants.map(teamId => {
              const team = data.teams.find(t => t.id === teamId)!;
              const matchScore = finalMatch.scores[teamId] || 0;
              return (
                <div key={teamId} className="bg-yellow-50 rounded-3xl p-8 text-center shadow-2xl border-4 border-yellow-400 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <span className="text-8xl">🏆</span>
                  </div>
                  <div className="text-yellow-800 text-lg font-black uppercase mb-4 tracking-widest truncate relative z-10">{team.name}</div>
                  <div className="text-black font-black leading-none relative z-10" style={{ fontSize: '64pt' }}>
                    {matchScore}
                  </div>
                  <div className="text-yellow-700 text-lg mt-6 font-black uppercase tracking-widest relative z-10">Poin Final</div>
                </div>
              );
            })}
          </div>
          
          <div className="text-center pt-8">
            <button
              onClick={setupFinal}
              className="bg-blue-100 text-blue-700 px-6 py-2 rounded-full text-base font-bold hover:bg-blue-200 transition-colors border border-blue-200 shadow-sm"
            >
              Sinkronkan Ulang Finalis
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
