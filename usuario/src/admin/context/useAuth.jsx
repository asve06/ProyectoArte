import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Importa AuthContext desde el archivo original

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return { isAuthenticated: false, setIsAuthenticated: () => {} }; // valores predeterminados
  }
  return context;
};
