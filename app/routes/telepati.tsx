import { useTelepati } from "../hooks/useTelepati";
import { ScoreInput } from "../components/ScoreInput";

export function meta() {
  return [
    { title: "Telepati Games - Arena" },
    { name: "description", content: "Input skor real-time untuk Telepati Games" },
  ];
}

export default function TelepatiGames() {
  const { data, addScore, updateTeamName, updateMatchParticipant, resetMatchScore, resetData } = useTelepati();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black text-green-900 italic uppercase tracking-tighter">
            TELEPATI <span className="text-green-600 underline decoration-green-300">GAMES</span>
          </h1>
          <p className="text-green-700 font-medium mt-1">Games Kesamaan Gerakan</p>
        </div>
        {/* <div className="bg-green-100 px-6 py-3 rounded-2xl border-2 border-green-200 shadow-inner">
          <span className="text-green-800 font-bold">Status: </span>
          <span className="text-green-600 font-black animate-pulse">LIVE ARENA</span>
        </div> */}
      </div>

      <div className="space-y-20">
        {data.matches.map((match, matchIdx) => (
          <section key={matchIdx} className="relative">
            <div className="flex items-center justify-between mb-6 bg-green-900 text-white p-4 rounded-xl shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white w-10 h-10 rounded-lg flex items-center justify-center font-black text-xl">
                  {matchIdx + 1}
                </div>
                <h2 className="text-2xl font-black italic uppercase">PERTANDINGAN {matchIdx + 1}</h2>
              </div>
              <button 
                onClick={() => resetMatchScore(matchIdx)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg text-xs font-bold transition-colors shadow-lg uppercase"
              >
                Reset Pertandingan
              </button>
            </div>

            {/* Horizontal Inputs */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              {match.participants.map((teamId, pIdx) => {
                const team = data.teams.find(t => t.id === teamId)!;
                return (
                  <ScoreInput
                    key={`${matchIdx}-${pIdx}`}
                    team={team}
                    allTeams={data.teams}
                    variant="green"
                    onSave={(score) => addScore(matchIdx, teamId, score)}
                    onUpdateName={(name) => updateTeamName(teamId, name)}
                    onUpdateTeam={(newTeamId) => updateMatchParticipant(matchIdx, pIdx, newTeamId)}
                  />
                );
              })}
            </div>

            {/* Live Scoreboard for this match */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {match.participants.map((teamId, pIdx) => {
                const team = data.teams.find(t => t.id === teamId)!;
                const matchScore = match.scores[teamId] || 0;
                return (
                  <div key={`${matchIdx}-${pIdx}`} className="bg-green-50 rounded-2xl p-8 text-center shadow-2xl border-4 border-green-800 transform transition-transform hover:scale-[1.02]">
                    <div className="text-green-800 text-lg font-bold uppercase mb-4 tracking-widest truncate">{team.name}</div>
                    <div className="text-black font-black leading-none" style={{ fontSize: '64pt' }}>
                      {matchScore}
                    </div>
                    <div className="text-green-800 text-lg mt-6 font-bold uppercase tracking-widest">Poin Saat Ini</div>
                  </div>
                );
              })}
            </div>

            {/* VS Badge */}
            {/* <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center w-16 h-16 bg-white border-4 border-green-900 rounded-full z-10 shadow-xl">
              <span className="text-green-900 font-black italic text-2xl">VS</span>
            </div> */}

            {/* Separator */}
            {matchIdx < data.matches.length - 1 && (
              <div className="mt-20 border-b-4 border-dashed border-green-200 w-full opacity-50"></div>
            )}
          </section>
        ))}
      </div>
      
      <div className="mt-20 p-8 bg-green-50 rounded-3xl border-2 border-green-100 text-center space-y-4">
        <div>
          <p className="text-green-800 font-bold mb-2">Butuh memulai ulang semua data Telepati Games?</p>
          <button 
            onClick={resetData}
            className="bg-red-100 hover:bg-red-200 text-red-600 px-6 py-2 rounded-xl font-bold transition-colors border border-red-200"
          >
            Reset Seluruh Data Games
          </button>
        </div>
        
        <div className="pt-4 border-t border-green-200">
          <p className="text-green-600 text-sm font-medium mb-2">Mengalami masalah tampilan tidak sesuai? Coba bersihkan cache aplikasi.</p>
          <button 
            onClick={() => {
              if (confirm('Aplikasi akan memuat ulang dan mencoba memperbaiki masalah tampilan. Data Anda tetap aman. Lanjutkan?')) {
                window.location.reload();
              }
            }}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-bold transition-colors shadow-md"
          >
            Refresh & Perbaiki Tampilan
          </button>
        </div>
      </div>
    </div>
  );
}
