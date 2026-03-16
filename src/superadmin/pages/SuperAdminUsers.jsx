import React, { useEffect, useState } from "react";
import { supabase } from "../../config/supabaseClient";
import AddUserForm from "../components/AddUserForm"; // Import form yang kita buat tadi
import { showAlert } from "../../utils/swalCustom";

const SuperAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Note: Untuk mengambil list user secara detail, biasanya butuh Supabase Admin Auth Helper
  // Tapi untuk sekarang, kita bisa fetch dari tabel profil jika lo punya, atau tampilkan UI manajemennya.

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-10">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">
            User Management
          </h2>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            Kelola Akses Admin Hotel
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* KOLOM KIRI: FORM TAMBAH USER */}
          <div className="lg:col-span-1">
            <AddUserForm />
          </div>

          {/* KOLOM KANAN: INFO & LIST (Placeholder) */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-widest">
                Status Akses
              </h3>

              <div className="space-y-4">
                {/* User Master (Lo) */}
                <div className="flex items-center justify-between p-4 bg-indigo-50 rounded-2xl border border-indigo-100">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs">
                      SA
                    </div>
                    <div>
                      <p className="text-xs font-black text-slate-900">
                        superadmin@gmail.com
                      </p>
                      <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-widest">
                        Master Authority
                      </p>
                    </div>
                  </div>
                  <span className="bg-indigo-200 text-indigo-700 text-[8px] font-black px-2 py-1 rounded-md uppercase">
                    Active
                  </span>
                </div>

                {/* Info Box */}
                <div className="p-6 bg-slate-900 rounded-[2rem] text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">
                      Penting!
                    </p>
                    <p className="text-xs leading-relaxed text-slate-300">
                      Pastikan lo sudah mematikan{" "}
                      <span className="text-indigo-400 font-bold italic">
                        "Email Confirmation"
                      </span>{" "}
                      di dashboard Supabase agar admin baru bisa langsung login
                      tanpa verifikasi email.
                    </p>
                  </div>
                  <div className="absolute -right-5 -bottom-5 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminUsers;
