import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Album from './pages/Album/Album'; 
import SignIn from './pages/SignIn/SignIn';
import Obras from './pages/Obras/Obras';
import ObraDetail from './pages/Album/ObraDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/album" element={<Album />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/obras" element={<Obras />} />
        <Route path="/obradetail" element={<ObraDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
