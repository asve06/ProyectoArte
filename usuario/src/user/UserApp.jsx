import Layout from './components/Layout'; // Tu componente Layout
import UserRoutes from './routes/UserRoutes'; // Archivo de rutas
import { Route, Routes } from 'react-router-dom';

function UserApp() {
  return (
    <Routes>
      <Route path="/*" element={<Layout><UserRoutes/></Layout>} />
    </Routes>
  );
}

export default UserApp;
