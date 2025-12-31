import { Link } from "react-router";

export function meta() {
  return [
    { title: "MM Desa Cicalengka - Game Arena" },
    { name: "description", content: "Sistem Manajemen Skor Real-Time untuk Berbagai Game" },
  ];
}

export default function Home() {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {/* Puzzle Battle Choice */}
        <div className="relative group bg-white rounded-3xl shadow-xl border-2 border-transparent hover:border-blue-500 transition-all p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-blue-100 rounded-2xl flex items-center justify-center text-5xl mb-6 transform group-hover:scale-110 transition-transform">
            🧩
          </div>
          <h2 className="text-3xl font-black text-blue-900 mb-4">Puzzle Battle</h2>
          <p className="text-gray-600 mb-8 flex-grow">
            Game menyusun posisi puzzle dengan cepat. Terdiri dari babak penyisihan 9 kelompok dan babak final 3 besar.
          </p>
          <div className="grid grid-cols-1 gap-3 w-full">
            <Link 
              to="/penyisihan"
              className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-200"
            >
              Masuk Arena
            </Link>
          </div>
        </div>

        {/* Telepati Games Choice */}
        <div className="relative group bg-white rounded-3xl shadow-xl border-2 border-transparent hover:border-green-500 transition-all p-8 flex flex-col items-center text-center">
          <div className="w-24 h-24 bg-green-100 rounded-2xl flex items-center justify-center text-5xl mb-6 transform group-hover:scale-110 transition-transform">
            🤝
          </div>
          <h2 className="text-3xl font-black text-green-900 mb-4">Telepati Games</h2>
          <p className="text-gray-600 mb-8 flex-grow">
            Game kesamaan gerakan antar anggota kelompok. Terdiri dari 8 kelompok yang dibagi menjadi 4 pertandingan head-to-head.
          </p>
          <div className="grid grid-cols-1 gap-3 w-full">
            <Link 
              to="/telepati"
              className="bg-green-700 hover:bg-green-800 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-green-200"
            >
              Masuk Arena
            </Link>
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
