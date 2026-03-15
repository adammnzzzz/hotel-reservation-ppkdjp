import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom"; // SAKLAR 1
import { showLoading, showAlert, closeSwal } from "../utils/swalCustom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // SAKLAR 2: WAJIB ADA INI BIAR 'navigate' DIKENAL
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    showLoading("Authenticating...", "Sabar ya Lan...");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    closeSwal();

    if (error) {
      showAlert("error", "Login Gagal!", "Email atau password salah.");
    } else {
      // SAKLAR 3: Pake .then() biar nunggu user klik OK baru pindah
      showAlert("success", "Mantap!", "Masuk pak Eko!").then(() => {
        navigate("/admin");
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 shadow-2xl border-t-8 border-blue-900">
        <h2 className="text-2xl font-black text-blue-900 mb-6 text-center">
          ADMIN LOGIN
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Email Address
            </label>
            <input
              type="email"
              className="w-full border-b-2 border-gray-200 focus:border-blue-900 outline-none py-2 transition-all"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">
              Password
            </label>
            <input
              type="password"
              className="w-full border-b-2 border-gray-200 focus:border-blue-900 outline-none py-2 transition-all"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#0F172A] text-white font-black py-4 mt-6 rounded-xl hover:bg-indigo-600 transition-all shadow-xl shadow-indigo-100 uppercase text-xs tracking-[0.2em]"
          >
            Sign In to System
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
