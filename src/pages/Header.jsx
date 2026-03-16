import React from "react";

const Header = ({ userEmail, isSuperAdmin }) => {
  // Ambil inisial dari email (contoh: adam@gmail.com -> A)
  const initial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 px-6 py-4 lg:px-12 flex items-center justify-between">
      {/* BAGIAN KIRI: Logo & Info Sistem */}
      <div className="flex items-center gap-4">
        {/* Logo Icon */}
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200 group transition-transform hover:scale-105">
          <span className="text-xl font-black italic">P</span>
        </div>

        <div className="hidden sm:block">
          <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">
            PPKD Hotel <span className="text-indigo-600">Management</span>
          </h1>
          <p className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">
            {isSuperAdmin ? "✨ Master Control Mode" : "Standard Admin Access"}
          </p>
        </div>
      </div>

      {/* BAGIAN KANAN: Profil User */}
      <div className="flex items-center gap-4">
        <div className="text-right hidden md:block">
          <p className="text-xs font-black text-slate-900 leading-none">
            {isSuperAdmin ? "Adam Muniz Putra" : "Staff Operasional"}
          </p>
          <p className="text-[10px] text-slate-400 font-medium mt-1 lowercase">
            {userEmail || "session@hotel.com"}
          </p>
        </div>

        {/* Avatar Circle */}
        <div className="relative group cursor-pointer">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-500 p-[2px] shadow-md transition-transform group-hover:rotate-6">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center overflow-hidden">
              <span className="text-indigo-600 font-black text-lg">
                {initial}
              </span>
            </div>
          </div>
          {/* Status Online Indicator */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white rounded-full"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
