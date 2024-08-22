import { Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../pages/SignIn';
import AdminDashboard from '../pages/AdminDashboard';
import AdminLayout from '../layouts/AdminLayout';

function AdminRoutes() {
  const isAuthenticated = localStorage.getItem('admin-auth');

  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      {isAuthenticated ? (
        <Route path="/dashboard" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
      ) : (
        <Navigate to="/admin/signin" replace />
      )}
    </Routes>
  );
}

export default AdminRoutes;
