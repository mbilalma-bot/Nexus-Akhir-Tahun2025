import { useTournament } from "../hooks/useTournament";
import { TeamTable } from "../components/TeamTable";
import { ScoreChart } from "../components/ScoreChart";

export default function Rekap() {
  const { data, resetData } = useTournament();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      <header className="flex justify-between items-end border-b-4 border-blue-900 pb-6">
        <div>
          <h1 className="text-5xl font-black text-blue-900 mb-2 tracking-tighter uppercase">Rekap Poin</h1>
          <p className="text-blue-600 font-bold text-lg italic">Puzzle Battle</p>
        </div>
        <button
          onClick={resetData}
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-2xl font-black text-sm transition-all shadow-xl hover:-translate-y-1 active:scale-95 uppercase tracking-widest"
        >
          Reset Turnamen
        </button>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
         <div className="space-y-6">
           <h2 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
             <span className="bg-blue-900 text-white p-2 rounded-xl shadow-lg">🏆</span> 
             Klasemen Akhir
           </h2>
           <TeamTable teams={data.teams} scoreKey="matchScore" showTournamentPoints={true} hideScore={true} />
         </div>

         <div className="space-y-6">
           <h2 className="text-2xl font-black text-blue-900 flex items-center gap-3 uppercase tracking-tight">
             <span className="bg-blue-900 text-white p-2 rounded-xl shadow-lg">📊</span> 
             Visualisasi Poin
           </h2>
           <ScoreChart teams={data.teams} scoreKey="score" maxY={10} />
         </div>
       </div>

      <div className="bg-blue-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden border-8 border-blue-800">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-10 italic tracking-widest uppercase border-b border-blue-700 pb-4 inline-block">Status Games</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-blue-300 text-xs font-black uppercase mb-4 tracking-widest">Peringkat Tertinggi</div>
              <div className="text-4xl font-black text-yellow-400 truncate uppercase italic">
                {[...data.teams].sort((a, b) => (b.score || 0) - (a.score || 0))[0]?.name || '-'}
              </div>
            </div>
            <div className="bg-white/5 p-8 rounded-3xl backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors">
              <div className="text-blue-300 text-xs font-black uppercase mb-4 tracking-widest">Babak Games</div>
              <div className="text-4xl font-black text-white uppercase tracking-tighter">
                {data.matches.some(m => m.phase === 'final') ? 'GRAND FINAL' : 'PENYISIHAN'}
              </div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl"></div>
      </div>
    </div>
  );
}
