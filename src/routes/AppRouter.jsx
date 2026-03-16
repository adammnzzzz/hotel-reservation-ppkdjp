import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login.jsx";
import Sidebar from "../pages/Sidebar.jsx";
import SuperAdminLogin from "../superadmin/pages/SuperAdminLogin.jsx";
import SuperAdminRoutes from "./SuperAdminRoutes.jsx";
import AdminRoute from "./AdminRoute.jsx";
import NotFound from "../pages/NotFound.jsx";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* 1. Jalur Publik */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/super-login" element={<SuperAdminLogin />} />

        {/* 2. Jalur Utama Admin (Tamu & Reservasi)
           PENTING: Di sini roleRequired kita buat 'admin' agar 
           baik Admin Biasa maupun Super Admin bisa masuk ke sini.
        */}
        <Route
          path="/admin/*"
          element={
            <AdminRoute roleRequired="admin">
              <Sidebar />
            </AdminRoute>
          }
        />

        {/* 3. Jalur Khusus Super Admin (Manage Users & Stats Mendalam)
           Hanya bisa diakses jika login lewat /super-login dengan email master.
        */}
        <Route path="/super-admin/*" element={<SuperAdminRoutes />} />

        {/* 4. Jalur Nyasar */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
