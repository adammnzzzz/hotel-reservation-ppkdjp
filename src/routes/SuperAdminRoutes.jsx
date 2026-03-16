import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminRoute from "./AdminRoute.jsx";

// Import 3 Halaman Super Admin
import SuperAdminDashboard from "../superadmin/pages/SuperAdminDashboard.jsx";
import SuperAdminUsers from "../superadmin/pages/SuperAdminUsers.jsx"; // Halaman Manage Users
import SuperAdminStats from "../superadmin/pages/SuperAdminStats.jsx"; // Halaman Statistik

const SuperAdminRoutes = () => {
  return (
    <Routes>
      {/* Semua jalur di bawah ini otomatis dilindungi oleh AdminRoute khusus Super Admin */}
      <Route
        path="/*"
        element={
          <AdminRoute roleRequired="super">
            <Routes>
              {/* Alamat: /super-admin/dashboard */}
              <Route path="dashboard" element={<SuperAdminDashboard />} />

              {/* Alamat: /super-admin/users */}
              <Route path="users" element={<SuperAdminUsers />} />

              {/* Alamat: /super-admin/statistics */}
              <Route path="statistics" element={<SuperAdminStats />} />

              {/* Default kalau cuma akses /super-admin/ langsung lempar ke dashboard */}
              <Route path="/" element={<Navigate to="dashboard" replace />} />
            </Routes>
          </AdminRoute>
        }
      />
    </Routes>
  );
};

export default SuperAdminRoutes;
