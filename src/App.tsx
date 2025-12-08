import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';
import VerifyForgotPassword from './pages/Auth/VerifyForgotPassword';
import Users from './pages/Management/Users';
import Mechanics from './pages/Management/Mechanics';
import Workshops from './pages/Management/Workshops';
import { ProtectedRoute, AdminLayout, ScrollToTop } from './components';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/verify-forgot-password"
        element={<VerifyForgotPassword />}
      />

      {/* Protected Routes with Layout */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Management Routes */}
      <Route
        path="/management/users"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Users />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/management/mechanics"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Mechanics />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/management/workshops"
        element={
          <ProtectedRoute>
            <AdminLayout>
              <Workshops />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <AppRoutes />
    </>
  );
}

export default App;
