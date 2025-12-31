import { useTournament } from "../hooks/useTournament";
import { ScoreInput } from "../components/ScoreInput";

export default function Penyisihan() {
  const { data, addScore, updateTeamName, resetMatchScore } = useTournament();
  const penyisihanMatches = data.matches.filter(m => m.phase === 'penyisihan');

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      <header className="text-center">
        <h1 className="text-4xl font-black text-blue-900 mb-2 uppercase tracking-tighter">Puzzle Battle</h1>
        <p className="text-blue-600 font-bold">Babak Penyisihan</p>
      </header>

      {penyisihanMatches.map((match, matchIdx) => (
        <section key={matchIdx} className="relative">
          <div className="flex items-center justify-between mb-6 bg-blue-900 text-white p-4 rounded-xl shadow-xl">
            <h2 className="text-2xl font-black italic">PERTANDINGAN {matchIdx + 1}</h2>
            <button 
              onClick={() => resetMatchScore('penyisihan', matchIdx)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-xs font-bold transition-colors shadow-lg uppercase"
            >
              Reset Pertandingan
            </button>
          </div>

          {/* Horizontal Inputs */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {match.participants.map(teamId => {
              const team = data.teams.find(t => t.id === teamId)!;
              return (
                <ScoreInput
                  key={teamId}
                  team={team}
                  onSave={(score) => addScore('penyisihan', matchIdx, teamId, score)}
                  onUpdateName={(name) => updateTeamName(teamId, name)}
                />
              );
            })}
          </div>

          {/* Live Scoreboard for this match */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {match.participants.map(teamId => {
              const team = data.teams.find(t => t.id === teamId)!;
              const matchScore = match.scores[teamId] || 0;
              return (
                <div key={teamId} className="bg-blue-50 rounded-2xl p-6 text-center shadow-2xl border-4 border-blue-800 transform transition-transform hover:scale-105">
                  <div className="text-blue-800 text-lg font-bold uppercase mb-2 tracking-widest truncate">{team.name}</div>
                  <div className="text-black font-black leading-none" style={{ fontSize: '48pt' }}>
                    {matchScore}
                  </div>
                  <div className="text-blue-800 text-lg mt-4 font-bold uppercase">Skor Saat Ini</div>
                </div>
              );
            })}
          </div>

          {/* Separator */}
          {matchIdx < penyisihanMatches.length - 1 && (
            <div className="mt-16 border-b-4 border-dashed border-blue-200 w-full opacity-50"></div>
          )}
        </section>
      ))}

      {/* Global Mini Scoreboard */}
      <div className="mt-20 p-8 bg-white rounded-3xl shadow-2xl border-2 border-blue-100">
        <h3 className="text-xl font-black text-blue-900 mb-6 flex items-center gap-2">
          <span className="bg-blue-600 text-white p-2 rounded-lg">📊</span>
          TOTAL POIN KESELURUHAN
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-9 gap-4">
          {data.teams.map(team => (
            <div key={team.id} className="text-center p-3 bg-blue-50 rounded-xl border border-blue-200">
              <div className="text-[10px] text-blue-800 font-bold truncate mb-1">{team.name}</div>
              <div className="text-xl font-black text-blue-600">{team.score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
