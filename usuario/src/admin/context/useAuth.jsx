import { useContext } from 'react';
import { AuthContext } from './AuthContext'; // Importa AuthContext desde el archivo original

export const useAuth = () => {
  return useContext(AuthContext);
};
