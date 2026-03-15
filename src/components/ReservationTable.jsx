import React from "react";
import { supabase } from "../config/supabaseClient";
import { showAlert, showLoading, closeSwal } from "../utils/swalCustom"; // Gunakan utility lo!
import React, { useState } from "react"; // Line 1: Update ini

const ReservationTable = ({ list, onRefresh, onPrint }) => {
  const filteredData = list.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.guest_name.toLowerCase().includes(search) ||
      item.room_no.toLowerCase().includes(search)
    );
  });

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = filteredData.slice(indexOfFirstData, indexOfLastData);
  const totalPages = Math.ceil(filteredData.length / dataPerPage);
  // Fungsi hapus pake SweetAlert2 (Biar elegan, Lan!)
  const deleteData = async (id) => {
    showAlert(
      "warning",
      "Hapus Data?",
      "Data ini bakal ilang permanen dari cloud!",
    ).then(async (result) => {
      if (result.isConfirmed) {
        showLoading("Menghapus...", "Sabar ya Lan.");
        const { error } = await supabase
          .from("reservations")
          .delete()
          .eq("id", id);
        closeSwal();

        if (error) {
          showAlert("error", "Gagal!", error.message);
        } else {
          onRefresh();
          showAlert("success", "Terhapus!", "Data sudah bersih dari database.");
        }
      }
    });
  };

  return (
    <div className="overflow-x-auto rounded-[1.5rem] border border-slate-200 shadow-xl shadow-slate-200/50">
      <div className="flex justify-between items-center mb-6">
        <input
          type="text"
          placeholder="Cari tamu atau kamar..."
          className="px-5 py-3 rounded-2xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 w-full max-w-sm text-sm font-semibold"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      <table className="w-full text-left border-collapse bg-white overflow-hidden">
        <thead>
          <tr className="bg-[#0F172A] text-white">
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-center w-24">
              Room
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em]">
              Guest Detail
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em]">
              Schedule
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em]">
              Total Price
            </th>
            <th className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-center">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {list && list.length > 0 ? (
            list.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-indigo-50/30 transition-all group"
              >
                {/* ROOM INFO */}
                <td className="p-5 text-center">
                  <div className="bg-indigo-600 text-white text-[11px] font-black px-3 py-1.5 rounded-lg shadow-md shadow-indigo-100">
                    {item.room_no || "???"}
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 mt-2 uppercase tracking-tighter">
                    {item.num_of_room} Unit(s)
                  </div>
                </td>

                {/* GUEST INFO */}
                <td className="p-5">
                  <div className="font-black text-slate-800 uppercase text-sm leading-tight tracking-tight">
                    {item.guest_name}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-indigo-500 font-black uppercase tracking-widest">
                      {item.room_type}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[10px] text-slate-400 font-bold">
                      {item.phone}
                    </span>
                  </div>
                  {item.notes && (
                    <div className="mt-2 inline-flex items-center gap-1 bg-amber-50 text-amber-600 px-2 py-0.5 rounded text-[9px] font-bold uppercase italic border border-amber-100">
                      <span>📌</span> Request: {item.notes}
                    </div>
                  )}
                </td>

                {/* SCHEDULE */}
                <td className="p-5">
                  <div className="text-[11px] font-black text-slate-700 flex items-center gap-2">
                    <span className="text-emerald-500 text-[8px]">●</span>{" "}
                    {item.arrival_date}
                  </div>
                  <div className="text-[11px] font-black text-slate-400 flex items-center gap-2 mt-1">
                    <span className="text-rose-500 text-[8px]">●</span>{" "}
                    {item.departure_date || "Open End"}
                  </div>
                  <div className="text-[9px] font-bold text-indigo-400 mt-1 uppercase italic">
                    {item.arrival_time}
                  </div>
                </td>

                {/* PRICE */}
                <td className="p-5">
                  <div className="text-sm font-black text-slate-900 tracking-tight">
                    Rp{" "}
                    {new Intl.NumberFormat("id-ID").format(
                      item.room_price || 0,
                    )}
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 italic">
                    Confirmed
                  </div>
                </td>

                {/* ACTIONS */}
                <td className="p-5 text-center">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => onPrint(item)}
                      className="group/btn relative bg-white border border-slate-200 p-2.5 rounded-xl hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                      title="Cetak Invoice"
                    >
                      <span className="text-sm">🖨️</span>
                    </button>
                    <button
                      onClick={() => deleteData(item.id)}
                      className="bg-white border border-slate-200 p-2.5 rounded-xl hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all shadow-sm"
                      title="Hapus Data"
                    >
                      <span className="text-sm">🗑️</span>
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="p-20 text-center">
                <div className="flex flex-col items-center">
                  <span className="text-5xl mb-4">📂</span>
                  <p className="text-slate-400 font-bold uppercase text-[11px] tracking-[0.2em]">
                    Belum Ada Data Reservasi, Lan.
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black hover:bg-slate-900 hover:text-white disabled:opacity-30"
        >
          PREV
        </button>
        <span className="text-[11px] font-black text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg">
          {currentPage} / {totalPages || 1}
        </span>
        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-[10px] font-black hover:bg-slate-900 hover:text-white disabled:opacity-30"
        >
          NEXT
        </button>
      </div>
    </div>
  );
};

export default ReservationTable;
