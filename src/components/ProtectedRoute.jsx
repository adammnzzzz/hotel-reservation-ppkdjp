import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

const ProtectedRoute = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Cek session saat pertama kali halaman dimuat
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // 2. Pantengin kalau ada perubahan status login/logout
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return <div className="p-10 text-center font-bold">Mengecek Akses...</div>;
  }

  // Kalau nggak ada session (belum login), tendang ke halaman login
  if (!session) {
    return <Navigate to="/login" replace />;
  }

  // Kalau ada session, silakan masuk
  return children;
};

export default ProtectedRoute;
