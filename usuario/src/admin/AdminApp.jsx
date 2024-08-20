import AdminLayout from './components/AdminLayout'; // Asegúrate de que la ruta sea correcta
import AdminRoutes from './routes/AdminRoutes'; // Asegúrate de que la ruta sea correcta

function AdminApp() {
  return (
    <AdminLayout>
      <AdminRoutes />
    </AdminLayout>
  );
}

export default AdminApp;
