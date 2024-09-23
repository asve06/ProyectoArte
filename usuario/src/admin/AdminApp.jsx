import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes'; // Asegúrate de que la ruta sea correcta
import { AuthProvider } from './context/AuthContext';

function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/*" element={<AdminRoutes />} />
      </Routes>
    </AuthProvider>
  );
}

export default AdminApp;
