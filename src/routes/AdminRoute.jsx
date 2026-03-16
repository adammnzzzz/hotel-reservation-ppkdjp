import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../config/supabaseClient";

const AdminRoute = ({ children, roleRequired }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkUser();
  }, []);

  if (loading)
    return (
      <div className="p-10 text-center font-black opacity-20">VERIFYING...</div>
    );

  if (!user) return <Navigate to="/login" replace />;

  // LOGIKA MASTER LAN: Email super admin lo
  const isSuperAdmin = user.email === "lan@super.com";

  if (roleRequired === "super" && !isSuperAdmin) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

export default AdminRoute;
