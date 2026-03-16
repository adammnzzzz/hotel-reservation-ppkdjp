import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import { showLoading, showAlert, closeSwal } from "../utils/swalCustom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    showLoading("Authenticating...", "Checking credentials, please wait...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    closeSwal();

    if (error) {
      showAlert("error", "Login Gagal!", "Email atau password salah.");
    } else {
      showAlert("success", "Welcome Back!", "Sistem siap digunakan.").then(
        () => {
          navigate("/admin");
        },
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC] p-4 relative overflow-hidden">
      {/* DECORATION */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/5 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-600/5 blur-[120px]" />

      {/* MAIN CONTAINER */}
      <div className="w-full max-w-7xl grid md:grid-cols-2 bg-white/70 backdrop-blur-2xl rounded-[3rem] shadow-[0_25px_80px_rgba(0,0,0,0.06)] border border-white overflow-hidden z-10">
        {/* LEFT SIDE: BRANDING */}
        <div className="relative bg-[#0F172A] p-16 flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 opacity-10 blur-sm scale-150 transform -rotate-12">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="dotPattern"
                  patternUnits="userSpaceOnUse"
                  width="32"
                  height="32"
                >
                  <circle cx="1" cy="1" r="1" fill="#fff" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#dotPattern)" />
            </svg>
          </div>

          <div className="relative z-10 text-center">
            {/* LOGO TEMPATAN (Ganti src-nya nanti ya Lan) */}
            <div className="bg-indigo-600 w-12 h-12 rounded-2xl mx-auto mb-10 flex items-center justify-center text-white font-black shadow-lg">
              H
            </div>

            <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">
              Reservation System
            </p>
            <h2 className="text-4xl lg:text-5xl font-black text-white leading-tight tracking-tighter">
              Akses Portal <br />{" "}
              <span className="text-indigo-500">Administrasi</span>
            </h2>
          </div>

          <div className="relative mt-auto z-10 flex justify-center">
            {/* GAMBAR ILLUSTRASI MODERN */}
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
              alt="Hotel Analytics Dashboard"
              className="w-full max-w-[280px] h-auto rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] transform translate-y-6 hover:translate-y-2 transition-all duration-700 border border-slate-700/50"
            />
          </div>
        </div>

        {/* RIGHT SIDE: LOGIN FORM */}
        <div className="p-10 md:p-20 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-12">
              <span className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-indigo-100 mb-4">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Secure Access
              </span>
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                Login Admin
              </h3>
              <p className="text-slate-400 text-sm font-semibold mt-2">
                Masukkan kredensial
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">
                  Email Kantor
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                      />
                    </svg>
                  </span>
                  <input
                    type="email"
                    placeholder="admin@hotel.com"
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/10 text-sm font-semibold text-slate-700 transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2.5 ml-1">
                  Password
                </label>
                <div className="relative group">
                  <span className="absolute inset-y-0 left-4 flex items-center text-slate-300 group-focus-within:text-indigo-500 transition-colors">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                      />
                    </svg>
                  </span>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:ring-2 focus:ring-indigo-500/10 text-sm font-semibold text-slate-700 transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-[#0F172A] text-white font-black py-4 rounded-2xl hover:bg-indigo-600 hover:shadow-[0_10px_30px_rgba(79,70,229,0.3)] transform active:scale-[0.98] transition-all duration-300 uppercase text-[10px] tracking-[0.25em]"
                >
                  Masuk Sekarang
                </button>
              </div>
            </form>

            <p className="text-center mt-12 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              &copy; 2026 PPKD Hotel JP • Secured by Supabase
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
