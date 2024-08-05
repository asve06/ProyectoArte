import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard/Dashboard';
import Album from './pages/Album'; 
import SignIn from './pages/SignIn';
import Obras from './pages/Obras';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/album" element={<Album />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/obras" element={<Obras />} />
      </Routes>
    </Router>
  );
}

export default App;
