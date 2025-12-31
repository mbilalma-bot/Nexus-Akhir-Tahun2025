import { Link } from "react-router";
import { useState } from "react";
import { useTeamMaster } from "../hooks/useTeamMaster";

export function meta() {
  return [
    { title: "MM Desa Cicalengka - Game Arena" },
    { name: "description", content: "Sistem Manajemen Skor Real-Time untuk Berbagai Game" },
  ];
}

export default function Home() {
  const { teams, updateTeamName, isSaving, feedback } = useTeamMaster();
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleEdit = (id: number, currentName: string) => {
    setEditingId(id);
    setEditValue(currentName);
  };

  const handleSave = async (id: number) => {
    await updateTeamName(id, editValue);
    setEditingId(null);
  };

  const games = [
    {
      id: "puzzle",
      title: "Puzzle Battle",
      description: "Adu cepat menyusun kepingan puzzle menjadi gambar utuh.",
      icon: "🧩",
      to: "/penyisihan",
      color: "bg-blue-600",
      shadow: "shadow-blue-200"
    },
    {
      id: "telepati",
      title: "Telepati Games",
      description: "Uji kekompakan dan intuisi antar anggota kelompok.",
      icon: "🧠",
      to: "/telepati",
      color: "bg-green-600",
      shadow: "shadow-green-200"
    },
    {
      id: "color",
      title: "Color Battle",
      description: "Permainan ketangkasan warna dan strategi kelompok.",
      icon: "🎨",
      to: "/color-battle",
      color: "bg-yellow-500",
      shadow: "shadow-yellow-200"
    },
    {
      id: "berantai",
      title: "Games Berantai",
      description: "Estafet pesan dan gerakan dalam satu barisan.",
      icon: "🔗",
      to: "/games-berantai",
      color: "bg-red-600",
      shadow: "shadow-red-200"
    },
    {
      id: "rekap",
      title: "Rekapan Akhir",
      description: "Klasemen keseluruhan dari semua perlombaan.",
      icon: "🏆",
      to: "/rekap-akhir",
      color: "bg-gray-900",
      shadow: "shadow-gray-300"
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
          NEXUS<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            GAMES
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Pilih games.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        {games.map((game) => (
          <div key={game.id} className="relative group bg-white rounded-3xl shadow-xl border-2 border-transparent hover:border-blue-500 transition-all p-8 flex flex-col items-center text-center">
            <div className={`w-24 h-24 ${game.color.replace('bg-', 'bg-opacity-10 ').replace('600', '100').replace('500', '100').replace('900', '100')} bg-current rounded-2xl flex items-center justify-center text-5xl mb-6 transform group-hover:scale-110 transition-transform`}>
              <span className="opacity-100">{game.icon}</span>
            </div>
            <h2 className="text-3xl font-black text-gray-900 mb-4">{game.title}</h2>
            <p className="text-gray-600 mb-8 flex-grow">
              {game.description}
            </p>
            <div className="grid grid-cols-1 gap-3 w-full">
              <Link 
                to={game.to}
                className={`${game.color} hover:opacity-90 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg ${game.shadow}`}
              >
                Masuk Arena
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Master Data Nama Kelompok */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl border-2 border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-8 py-6 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-gray-900">Manajemen Kelompok</h2>
              <p className="text-gray-500 text-sm">Sesuaikan nama kelompok untuk seluruh aplikasi</p>
            </div>
            <div className="flex items-center gap-2">
              {isSaving && (
                <div className="flex items-center gap-2 text-blue-600 animate-pulse">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <span className="text-xs font-bold uppercase tracking-wider">Menyimpan...</span>
                </div>
              )}
              {feedback && (
                <div className={`px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-300 ${
                  feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {feedback.type === 'success' ? '✅' : '❌'} {feedback.message}
                </div>
              )}
            </div>
          </div>
          
          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {teams.map((team) => (
                <div 
                  key={team.id}
                  className={`group relative p-4 rounded-2xl border-2 transition-all ${
                    editingId === team.id 
                      ? 'border-blue-500 bg-blue-50 ring-4 ring-blue-50' 
                      : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                      Kelompok {team.id}
                    </span>
                    {editingId !== team.id && (
                      <button
                        onClick={() => handleEdit(team.id, team.name)}
                        className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-200 rounded-lg transition-all text-gray-500"
                        title="Edit Nama"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                      </button>
                    )}
                  </div>

                  {editingId === team.id ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="w-full bg-white border-2 border-blue-200 rounded-xl px-3 py-2 text-sm font-bold text-gray-900 focus:outline-none focus:border-blue-500"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSave(team.id);
                          if (e.key === 'Escape') setEditingId(null);
                        }}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSave(team.id)}
                          disabled={isSaving}
                          className="flex-1 bg-blue-600 text-white text-xs font-bold py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex-1 bg-gray-200 text-gray-600 text-xs font-bold py-2 rounded-lg hover:bg-gray-300"
                        >
                          Batal
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="font-bold text-gray-900 line-clamp-2 min-h-[2.5rem] flex items-center">
                      {team.name}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* <div className="mt-20 pt-8 border-t border-gray-200">
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-sm font-medium text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Real-time Update
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Local Storage
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
            Mobile Responsive
          </div>
        </div>
      </div> */}
    </div>
  );
}
