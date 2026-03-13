import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import ReservationForm from "../components/ReservationForm";
import ReservationTable from "../components/ReservationTable";
import ReservationPrint from "../components/ReservationPrint";
import LogoImg from "../assets/img/logo.jpg";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("output");
  const [data, setData] = useState([]);
  const [printData, setPrintData] = useState(null);
  const navigate = useNavigate();

  const refreshData = async () => {
    const { data: res, error } = await supabase
      .from("reservations")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) console.error("Fetch error:", error.message);
    else setData(res || []);
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // --- PRINT MODE (Full Screen Elegant View) ---
  if (printData) {
    return (
      <div className="min-h-screen bg-white">
        <ReservationPrint
          data={printData}
          onBack={() => {
            setPrintData(null);
            refreshData();
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100">
      {/* SIDEBAR - Clean Slate Design */}
      <aside className="w-72 bg-[#0F172A] text-slate-300 flex flex-col shadow-2xl border-r border-slate-800">
        <div className="p-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner mb-4 overflow-hidden">
            {/* GANTI SRC DI BAWAH DENGAN LOGO LO, CONTOH: /logo-ppkd.png */}
            <img
              src={LogoImg}
              alt="Hotel Logo"
              className="w-full h-full object-contain p-2"
              onError={(e) => (e.target.style.display = "none")} // Sembunyiin kalau path salah
            />
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold tracking-tight text-white leading-none">
              PPKD HOTEL
            </h1>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.2em] mt-1">
              Management System
            </p>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          <button
            onClick={() => setActiveTab("output")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === "output"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg opacity-70">📋</span> Database Tamu
          </button>

          <button
            onClick={() => setActiveTab("input")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === "input"
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                : "hover:bg-slate-800 hover:text-white"
            }`}
          >
            <span className="text-lg opacity-70">➕</span> Registrasi Baru
          </button>
        </nav>

        <div className="p-6 mt-auto border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full group flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            KELUAR SISTEM
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 overflow-y-auto px-12 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header Dashboard */}
          <header className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
                {activeTab === "input" ? "Registrasi Tamu" : "Data Reservasi"}
              </h2>
              <p className="text-slate-500 text-sm mt-1">
                Kelola data pendaftaran hotel dengan efisien.
              </p>
            </div>
            <div className="flex items-center gap-4 bg-white px-5 py-2.5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-widest italic">
                Server Operational
              </span>
            </div>
          </header>

          {/* Wrapper Konten */}
          <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-10 min-h-[600px] transition-all">
            {activeTab === "input" ? (
              <ReservationForm
                onSuccess={(newRecord) => {
                  refreshData();
                  if (newRecord) setPrintData(newRecord);
                  else setActiveTab("output");
                }}
              />
            ) : (
              <ReservationTable
                list={data}
                onRefresh={refreshData}
                onPrint={(val) => setPrintData(val)}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
