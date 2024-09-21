import { Route, Routes } from 'react-router-dom';
import Dashboard from '../../common/components/Dashboard';
import Album from '../pages/Album'; 
import Obras from '../pages/Obras';
import ObraDetail from '../components/ObraDetail'

const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/album" element={<Album />} />
      <Route path="/obras" element={<Obras />} />
      <Route path="/obradetail/:id" element={<ObraDetail />} />
    </Routes>
  );
}

export default UserRoutes;
