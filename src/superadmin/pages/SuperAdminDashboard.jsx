import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const SuperAdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    revenue: 0,
    totalGuests: 0,
    occupancy: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    setLoading(true);
    // Ambil data dari tabel reservations
    const { data, error } = await supabase.from("reservations").select("*");

    if (!error && data) {
      const totalRev = data.reduce(
        (acc, curr) => acc + (curr.room_price || 0),
        0,
      );
      const active = data.filter((item) => !item.departure_date).length;

      setStats({
        revenue: totalRev,
        totalGuests: data.length,
        occupancy: active,
      });
    }
    setLoading(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#020617] text-indigo-500 font-black tracking-[0.5em] uppercase text-xs">
        Syncing Data...
      </div>
    );

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* HEADER KHUSUS SUPER ADMIN */}
      <nav className="bg-white border-b border-slate-100 px-10 py-5 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-[#0F172A] text-white w-10 h-10 rounded-xl flex items-center justify-center font-black shadow-lg shadow-indigo-200">
            GP
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 uppercase tracking-tight leading-none">
              Grand Palace
            </h1>
            <span className="text-[9px] font-bold text-indigo-600 uppercase tracking-widest">
              Master Dashboard
            </span>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="bg-rose-50 text-rose-600 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm"
        >
          Terminal Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-10 pt-12 pb-20">
        {/* JUDUL */}
        <div className="mb-12">
          <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.4em] mb-2">
            Executive Overview
          </p>
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter">
            Statistik Performa Hotel
          </h2>
        </div>

        {/* CARDS STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* REVENUE CARD (DARK MODE) */}
          <div className="bg-[#0F172A] p-10 rounded-[3rem] text-white shadow-2xl shadow-indigo-100 relative overflow-hidden group hover:scale-[1.02] transition-all">
            <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-4">
              Total Pendapatan
            </p>
            <h3 className="text-3xl font-black italic">
              Rp {new Intl.NumberFormat("id-ID").format(stats.revenue)}
            </h3>
            <div className="mt-8 flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 px-2 py-1 rounded text-[9px] font-bold">
                LIVE DATA
              </span>
            </div>
          </div>

          {/* GUESTS CARD */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:scale-[1.02] transition-all">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
              Total Tamu Tercatat
            </p>
            <h3 className="text-3xl font-black text-slate-900 leading-none">
              {stats.totalGuests}{" "}
              <span className="text-slate-300 text-lg">Orang</span>
            </h3>
            <div className="mt-8 h-1 w-full bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-indigo-500 w-[60%]"></div>
            </div>
          </div>

          {/* OCCUPANCY CARD */}
          <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/50 group hover:scale-[1.02] transition-all">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">
              Okupansi Kamar
            </p>
            <h3 className="text-3xl font-black text-slate-900 leading-none">
              {stats.occupancy}{" "}
              <span className="text-slate-300 text-lg">Kamar</span>
            </h3>
            <div className="mt-8 flex gap-1.5">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div
                  key={i}
                  className={`h-4 w-2 rounded-sm ${i <= stats.occupancy ? "bg-indigo-600" : "bg-slate-100"}`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* INFO TAMBAHAN */}
        <div className="mt-12 bg-indigo-50/50 p-8 rounded-[2.5rem] border border-indigo-100 border-dashed flex items-center justify-center">
          <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">
            Grafik Analytics Akan Muncul Di Sini
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
