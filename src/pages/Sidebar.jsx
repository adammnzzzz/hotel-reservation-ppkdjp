import React, { useState, useEffect } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";
import ReservationForm from "../components/ReservationForm";
import ReservationTable from "../components/ReservationTable";
import ReservationPrint from "../components/ReservationPrint";
import SuperAdminStats from "../superadmin/pages/SuperAdminStats";
import Header from "./Header"; // <-- IMPORT HEADER ANYAR
import LogoImg from "../assets/img/logo.jpg";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("output");
  const [data, setData] = useState([]);
  const [printData, setPrintData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState("");
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
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email);
    };
    getUser();
  }, []);

  const isSuperAdmin = userEmail === "superadmin@gmail.com";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

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
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans text-slate-900 selection:bg-indigo-100 relative">
      {/* MOBILE MENU BUTTON */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#0F172A] text-white p-3 rounded-xl shadow-xl active:scale-95 transition-all"
      >
        {isSidebarOpen ? (
          <span className="text-xl block w-6 h-6 flex items-center justify-center font-bold">
            ✕
          </span>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        )}
      </button>

      {/* MOBILE OVERLAY */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* SIDEBAR ASIDE */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#0F172A] text-slate-300 flex flex-col shadow-2xl border-r border-slate-800 transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}
      >
        <div className="p-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner mb-4 overflow-hidden">
            <img
              src={LogoImg}
              alt="Hotel Logo"
              className="w-full h-full object-contain p-2"
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
            onClick={() => {
              setActiveTab("output");
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "output" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="text-lg opacity-70">📋</span> Database Tamu
          </button>

          <button
            onClick={() => {
              setActiveTab("input");
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "input" ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <span className="text-lg opacity-70">➕</span> Registrasi Baru
          </button>

          {isSuperAdmin && (
            <div className="pt-4 mt-4 border-t border-slate-800/50">
              <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest px-4 mb-2">
                Master Menu
              </p>
              <button
                onClick={() => {
                  setActiveTab("stats");
                  setIsSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${activeTab === "stats" ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/30" : "hover:bg-slate-800 hover:text-white"}`}
              >
                <span className="text-lg opacity-70">📊</span> Statistik Data
              </button>
            </div>
          )}
        </nav>

        <div className="p-6 mt-auto border-t border-slate-800">
          <button
            onClick={handleLogout}
            className="w-full group flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold text-slate-500 hover:text-rose-400 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
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
      <main className="flex-1 overflow-y-auto h-screen flex flex-col">
        {/* HEADER KOMPONEN (Logo & Profil) */}
        <Header userEmail={userEmail} isSuperAdmin={isSuperAdmin} />

        {/* ISI KONTEN */}
        <div className="flex-1 px-4 py-8 lg:px-12 lg:py-10">
          <div className="max-w-6xl mx-auto">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-slate-900">
                  {activeTab === "input"
                    ? "Registrasi Tamu"
                    : activeTab === "stats"
                      ? "Financial Report"
                      : "Data Reservasi"}
                </h2>
                <p className="text-slate-500 text-xs lg:text-sm mt-1">
                  {activeTab === "stats"
                    ? "Pantau performa finansial hotel Anda."
                    : "Kelola data pendaftaran hotel dengan efisien."}
                </p>
              </div>
            </header>

            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-xl shadow-slate-200/50 p-4 lg:p-10 min-h-[500px] transition-all">
              {activeTab === "input" ? (
                <ReservationForm
                  onSuccess={(newRecord) => {
                    refreshData();
                    if (newRecord) setPrintData(newRecord);
                    else setActiveTab("output");
                  }}
                />
              ) : activeTab === "stats" ? (
                <SuperAdminStats />
              ) : (
                <ReservationTable
                  list={data}
                  onRefresh={refreshData}
                  onPrint={(val) => setPrintData(val)}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
