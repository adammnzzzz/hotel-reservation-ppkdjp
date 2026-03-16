import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabaseClient";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const SuperAdminStats = () => {
  const [rawData, setRawData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [filter, setFilter] = useState("month");
  const [metrics, setMetrics] = useState({ revenue: 0, totalOrders: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  useEffect(() => {
    if (rawData.length > 0) {
      processData(rawData, filter);
    }
  }, [filter, rawData]);

  const fetchAnalytics = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("reservations")
      .select("room_price, created_at")
      .order("created_at", { ascending: true });

    if (error) console.error("Error fetch:", error.message);
    if (data) setRawData(data);
    setLoading(false);
  };

  const processData = (data, range) => {
    const now = new Date(); // Dina iki: 16 Maret 2026

    // 1. Grouping data kanggo Grafik (Total & Count)
    const grouped = data.reduce((acc, curr) => {
      const date = new Date(curr.created_at);
      let label = "";

      if (range === "day") {
        label = date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        });
      } else if (range === "week") {
        const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
        label = `W-${Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7)}`;
      } else if (range === "month") {
        label = date.toLocaleString("id-ID", {
          month: "short",
          year: "2-digit",
        });
      } else if (range === "year") {
        label = date.getFullYear().toString();
      }

      const nilaiHarga = Number(curr.room_price) || 0;

      if (!acc[label]) acc[label] = { total: 0, count: 0 };
      acc[label].total += nilaiHarga;
      acc[label].count += 1;

      return acc;
    }, {});

    const formatted = Object.keys(grouped).map((key) => ({
      name: key,
      total: grouped[key].total,
      count: grouped[key].count,
    }));
    setChartData(formatted);

    // 2. LOGIKA SMART KPI DINAMIS (Revenue & Total Transaksi)
    let dynamicRevenue = 0;
    let dynamicCount = 0;

    if (range === "day") {
      const todayLabel = now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
      });
      dynamicRevenue = grouped[todayLabel]?.total || 0;
      dynamicCount = grouped[todayLabel]?.count || 0;
    } else if (range === "month") {
      const thisMonthLabel = now.toLocaleString("id-ID", {
        month: "short",
        year: "2-digit",
      });
      dynamicRevenue = grouped[thisMonthLabel]?.total || 0;
      dynamicCount = grouped[thisMonthLabel]?.count || 0;
    } else {
      // Kanggo Minggu/Tahun, tampilkan akumulasi periode sing tampil nang chart
      dynamicRevenue = formatted.reduce((sum, item) => sum + item.total, 0);
      dynamicCount = formatted.reduce((sum, item) => sum + item.count, 0);
    }

    setMetrics({
      revenue: dynamicRevenue,
      totalOrders: dynamicCount,
    });
  };

  const formatIDR = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  if (loading)
    return (
      <div className="p-20 text-center font-black animate-pulse text-indigo-600 uppercase tracking-widest">
        Syncing Dashboard Analytics...
      </div>
    );

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* HEADER & FILTER */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">
            Financial Report
          </h2>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Dashboard Analitik Terpadu
          </p>
        </div>

        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm gap-1">
          {["day", "week", "month", "year"].map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                filter === type
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type === "day"
                ? "Harian"
                : type === "week"
                  ? "Mingguan"
                  : type === "month"
                    ? "Bulanan"
                    : "Tahunan"}
            </button>
          ))}
        </div>
      </div>

      {/* KPI CARDS (REVENUE & TOTAL TRANSAKSI) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#0F172A] p-9 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 text-7xl italic font-black group-hover:scale-110 transition-transform duration-500">
            $$$
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400 mb-3">
            Revenue (
            {filter === "day"
              ? "Dina Iki"
              : filter === "month"
                ? "Sasi Iki"
                : "Periode"}
            )
          </p>
          <h3 className="text-4xl font-black tracking-tighter transition-all">
            {formatIDR(metrics.revenue)}
          </h3>
        </div>

        <div className="bg-white p-9 rounded-[2.5rem] border border-slate-200 shadow-sm hover:shadow-md transition-all">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-3">
            Reservasi (
            {filter === "day"
              ? "Dina Iki"
              : filter === "month"
                ? "Sasi Iki"
                : "Periode"}
            )
          </p>
          <h3 className="text-4xl font-black text-slate-900 tracking-tighter">
            {metrics.totalOrders}{" "}
            <span className="text-slate-200 font-light italic text-2xl ml-2">
              Data
            </span>
          </h3>
        </div>
      </div>

      {/* GRAPH CHART */}
      <div className="bg-white p-10 rounded-[3.5rem] border border-slate-200 shadow-xl shadow-slate-200/40">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#f1f5f9"
              />
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
                dy={10}
              />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fontWeight: "bold", fill: "#94a3b8" }}
                tickFormatter={(v) => `Rp ${v / 1000}k`}
              />
              <Tooltip
                cursor={{ stroke: "#6366f1", strokeWidth: 2 }}
                contentStyle={{
                  borderRadius: "20px",
                  border: "none",
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
                  fontSize: "11px",
                  fontWeight: "bold",
                }}
              />
              <Area
                type="monotone"
                dataKey="total"
                stroke="#6366f1"
                strokeWidth={4}
                fillOpacity={1}
                fill="url(#colorTotal)"
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminStats;
