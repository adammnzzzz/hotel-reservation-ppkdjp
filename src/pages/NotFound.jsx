import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 font-sans">
      <div className="max-w-lg w-full text-center">
        {/* Visual Identity */}
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[160px] font-black text-slate-200 leading-none select-none tracking-tighter">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-xl border border-slate-100 flex items-center justify-center">
              <span className="text-3xl">🔍</span>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-slate-500 max-w-sm mx-auto leading-relaxed text-sm md:text-base font-medium">
            Mohon maaf, halaman yang Anda tuju tidak tersedia atau telah
            dipindahkan. Pastikan tautan yang Anda masukkan sudah benar.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => navigate("/admin")}
            className="w-full sm:w-auto px-8 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-indigo-100 transition-all active:scale-95 uppercase text-[11px] tracking-widest"
          >
            Kembali ke Dashboard
          </button>

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto px-8 bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 font-bold py-4 rounded-2xl transition-all active:scale-95 uppercase text-[11px] tracking-widest"
          >
            Kembali Sebelumnya
          </button>
        </div>

        {/* Branding Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200/60">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.4em]">
            PPKD Hotel Management System &bull; Versi 1.0.2
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
