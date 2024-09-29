import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import UserApp from './user/UserApp'; // Asegúrate de que la ruta sea correcta
import AdminApp from './admin/AdminApp'; // Asegúrate de que la ruta sea correcta

function App() {
  useEffect(() => {
    AOS.init();
  }, []);

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
