import React, { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { showLoading, showAlert, closeSwal } from "../../utils/swalCustom";

const SuperAdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // 1. Proteksi Awal: Kunci ke email superadmin@gmail.com
    if (email !== "superadmin@gmail.com") {
      showAlert(
        "error",
        "Akses Ditolak!",
        "Email ini tidak memiliki otoritas Super Admin.",
      );
      return;
    }

    showLoading("Verifikasi Identitas...", "Menghubungi Master Server...");

    // 2. Auth via Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    closeSwal();

    if (error) {
      showAlert(
        "error",
        "Login Gagal!",
        "Master Key yang lo masukin salah, Lan.",
      );
    } else {
      showAlert(
        "success",
        "Akses Diterima!",
        "Selamat Datang, Master Admin.",
      ).then(() => {
        // Arahkan ke dashboard khusus super admin
        navigate("/super-admin/dashboard");
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] p-6 relative overflow-hidden">
      {/* Efek Ambient Glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"></div>

      <div className="w-full max-w-md z-10">
        {/* Logo & Header */}
        <div className="text-center mb-10">
          <div className="inline-flex p-5 rounded-[2.5rem] bg-slate-900 border border-slate-800 shadow-2xl mb-6 group transition-all hover:border-indigo-500/50">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-10 h-10 text-indigo-500 group-hover:scale-110 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            Master <span className="text-indigo-500">Access</span>
          </h2>
          <p className="text-slate-500 text-[9px] font-black uppercase tracking-[0.5em] mt-3">
            High-Level Security Clearance
          </p>
        </div>

        {/* Card Login */}
        <div className="bg-[#0B1120]/80 backdrop-blur-2xl border border-slate-800 p-10 rounded-[3.5rem] shadow-3xl">
          <form onSubmit={handleLogin} className="space-y-7">
            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-1">
                Admin Identity
              </label>
              <input
                type="email"
                placeholder="superadmin@gmail.com"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all placeholder:text-slate-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-3 block ml-1">
                Master Key
              </label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 px-6 text-white text-sm outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500/40 transition-all placeholder:text-slate-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-black py-5 rounded-2xl transition-all shadow-lg shadow-indigo-500/20 uppercase text-[11px] tracking-[0.3em] active:scale-[0.98]"
            >
              Authorize Login
            </button>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-12 flex flex-col items-center gap-4">
          <div className="h-[1px] w-12 bg-slate-800"></div>
          <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.4em]">
            System Status: <span className="text-emerald-500">Encrypted</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
