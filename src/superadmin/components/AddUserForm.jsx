import React, { useState } from "react";
import { supabase } from "../../config/supabaseClient";
import { showAlert, showLoading, closeSwal } from "../../utils/swalCustom";

const AddUserForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAddUser = async (e) => {
    e.preventDefault();
    showLoading("Creating User...", "Please wait...");

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    closeSwal();

    if (error) {
      showAlert("error", "Gagal!", error.message);
    } else {
      showAlert("success", "Berhasil!", `User ${email} berhasil dibuat.`);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
      <h3 className="text-lg font-black text-slate-900 mb-6 uppercase tracking-tight">
        Tambah Admin Baru
      </h3>
      <form onSubmit={handleAddUser} className="space-y-4">
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
            Email Admin
          </label>
          <input
            type="email"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
            placeholder="admin@hotel.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 ml-1">
            Password
          </label>
          <input
            type="password"
            className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-black py-4 rounded-xl hover:bg-indigo-700 transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-indigo-100"
        >
          Daftarkan Admin
        </button>
      </form>
    </div>
  );
};

export default AddUserForm;
