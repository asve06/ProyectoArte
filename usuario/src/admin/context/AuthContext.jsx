import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Inicializa el estado basado en el localStorage
    const auth = localStorage.getItem('admin-auth');
    console.log('Auth:', !!auth)
    return !!auth; // Convierte el valor a booleano
  });

  // useEffect(() => {
  //   // Verifica si el usuario está autenticado cuando el componente se monta
  //   const auth = localStorage.getItem('admin-auth');
  //   setIsAuthenticated(!!auth); // Convierte el valor a booleano
  //   console.log('Auth:', isAuthenticated)
  // }, [])

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}