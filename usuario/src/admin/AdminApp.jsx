import { Routes, Route } from 'react-router-dom';
import AdminRoutes from './routes/AdminRoutes'; // Asegúrate de que la ruta sea correcta

function AdminApp() {
  return (
    <Routes>
      <Route path="/*" element={<AdminRoutes/>}/>
    </Routes>
  );
}

export default AdminApp;
