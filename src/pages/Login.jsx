import React, { useState } from "react";
import { supabase } from "../config/supabaseClient";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login Gagal: " + error.message);
    } else {
      alert("Login Berhasil! Selamat Datang, Lan.");
      navigate("/admin"); // Langsung lempar ke dashboard
    }
    setLoading(false);
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
            disabled={loading}
            className="w-full bg-blue-900 text-white font-bold py-3 mt-6 hover:bg-black transition-all uppercase tracking-widest"
          >
            {loading ? "Authenticating..." : "Login Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
