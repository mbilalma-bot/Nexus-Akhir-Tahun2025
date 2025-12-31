import { Link } from "react-router";

export function meta() {
  return [
    { title: "MM Desa Cicalengka - Game Arena" },
    { name: "description", content: "Sistem Manajemen Skor Real-Time untuk Berbagai Game" },
  ];
}

export default function Home() {
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
          Pilih Jenis<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
            Games
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Pilih jenis permainan yang akan dimainkan.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
