import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // SAKLARNYA DISINI, LAN!
import RegistrationForm from "../pages/RegistrationForm.jsx";
import Sidebar from "../pages/Sidebar.jsx";
import Login from "../pages/Login.jsx"; // Pastikan lo udah ada file Login.jsx
import ProtectedRoute from "../components/ProtectedRoute.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* 2. Gerbang Masuk */}
        <Route path="/login" element={<Login />} />

        {/* Halaman Admin dibungkus Satpam */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Sidebar />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>404 - Nyasar Bos</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
