import { Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LogIn from '../pages/LogIn';
import AdminDashboard from '../../common/components/Dashboard';
import AdminLayout from '../../common/components/Layout';

function AdminRoutes() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem('admin-auth');
    setIsAuthenticated(!!token);
  }, []);
 
  return (
    <Routes>

      <Route path="/login" element={<LogIn />} />

      <Route
        path="/dashboard"
        element={
          isAuthenticated ? (
          <AdminLayout>
            <AdminDashboard />
          </AdminLayout>
          ) : (
          <Navigate to="/admin/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
