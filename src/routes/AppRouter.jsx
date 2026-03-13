import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegistrationForm from "../pages/RegistrationForm.jsx";
import AdminDashboard from "../pages/AdminDashboard.jsx";
import Login from "../pages/Login.jsx"; // Pastikan lo udah ada file Login.jsx
import ProtectedRoute from "../components/ProtectedRoute.jsx";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />

        {/* Halaman Admin dibungkus Satpam */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<div>404 - Nyasar Bos</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
