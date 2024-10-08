import { Routes, Route, Navigate } from 'react-router-dom';
import LogIn from '../pages/LogIn';
import AdminDashboard from '../../common/components/Dashboard';
import AdminLayout from '../../common/components/Layout';
import AdminObras from '../../common/components/Obras';
import { useAuth } from '../context/useAuth';

function AdminRoutes() {  

  const { isAuthenticated } = useAuth();
 
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
      <Route
        path="/obras"
        element={
          isAuthenticated ? (
          <AdminLayout>
            <AdminObras />
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
