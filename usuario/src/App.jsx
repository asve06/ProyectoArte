import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserApp from './user/UserApp';
import AdminApp from './admin/AdminApp';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas para el panel de administración */}
        <Route path="/admin/*" element={<AdminApp />} />
        
        {/* Rutas para la interfaz de usuario */}
        <Route path="/*" element={<UserApp />} />
      </Routes>
    </Router>
  );
}

export default App;
