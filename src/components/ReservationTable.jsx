import React from "react";
import { supabase } from "../config/supabaseClient";

const ReservationTable = ({ list, onRefresh, onPrint }) => {
  // Fungsi untuk hapus data
  const deleteData = async (id) => {
    if (
      window.confirm(
        "Hapus data ini, Lan? Data pendaftaran bakal ilang permanen!",
      )
    ) {
      const { error } = await supabase
        .from("reservations")
        .delete()
        .eq("id", id);
      if (error) {
        alert("Gagal hapus: " + error.message);
      } else {
        onRefresh(); // Refresh data biar tabel langsung update
      }
    }
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
      <table className="w-full text-left border-collapse bg-white">
        <thead className="bg-blue-900 text-white">
          <tr>
            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-center">
              No. Kamar
            </th>
            <th className="p-4 text-[10px] font-black uppercase tracking-widest">
              Nama Tamu
            </th>
            <th className="p-4 text-[10px] font-black uppercase tracking-widest">
              ID / KTP
            </th>
            <th className="p-4 text-[10px] font-black uppercase tracking-widest">
              Phone
            </th>
            <th className="p-4 text-[10px] font-black uppercase tracking-widest">
              Check In
            </th>
            <th className="p-4 text-[10px] font-black uppercase tracking-widest text-center">
              Aksi
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {list && list.length > 0 ? (
            list.map((item) => (
              <tr
                key={item.id}
                className="hover:bg-blue-50 transition-colors group"
              >
                <td className="p-4 font-black text-center">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded text-xs">
                    {item.room_no || "???"}
                  </span>
                </td>
                <td className="p-4">
                  <div className="font-bold text-gray-800 uppercase text-sm">
                    {item.guest_name}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium uppercase">
                    {item.room_type}
                  </div>
                </td>
                <td className="p-4 text-gray-600 font-mono text-xs italic">
                  {item.id_number || "-"}
                </td>
                <td className="p-4 text-gray-600 text-sm">
                  {item.phone || "-"}
                </td>
                <td className="p-4">
                  <div className="text-sm font-bold text-gray-700">
                    {item.arrival_date}
                  </div>
                  <div className="text-[10px] text-blue-500 font-bold uppercase">
                    {item.arrival_time || "No Time"}
                  </div>
                </td>
                <td className="p-4 text-center">
                  <div className="flex justify-center gap-2">
                    {/* TOMBOL PRINT - SUDAH FIX BIAR GAK REFRESH PAGE */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault(); // Kunci URL biar gak lari
                        onPrint(item);
                      }}
                      className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-800 transition-all shadow-md flex items-center gap-1 px-3 text-xs font-bold"
                      title="Cetak Konfirmasi"
                    >
                      <span>🖨️</span> PRINT
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteData(item.id)}
                      className="bg-red-50 text-red-600 p-2 rounded-lg hover:bg-red-600 hover:text-white transition-all shadow-sm flex items-center gap-1 px-3 text-xs font-bold"
                    >
                      <span>🗑️</span> HAPUS
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-10 text-center text-gray-400 italic">
                Belum ada data reservasi, Lan. Coba input dulu di tab sebelah!
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReservationTable;
