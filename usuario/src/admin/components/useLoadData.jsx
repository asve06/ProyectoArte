import { useState, useEffect } from 'react';
import { getAllAutores, getAllUbicaciones, getAllMovimientos, getAllTecnicas } from '../../api/index.api';

export default function useLoadData() {
  const [autores, setAutores] = useState([]);
  const [ubicaciones, setUbicaciones] = useState([]);
  const [tecnicas, setTecnicas] = useState([]);
  const [movimientos, setMovimientos] = useState([]);

  useEffect(() => {
    async function loadData() {
      const [autoresRes, ubicacionesRes, tecnicasRes, movimientosRes] = await Promise.all([
        getAllAutores(),
        getAllUbicaciones(),
        getAllTecnicas(),
        getAllMovimientos(),
      ]);
      setAutores(autoresRes.data);
      setUbicaciones(ubicacionesRes.data);
      setTecnicas(tecnicasRes.data);
      setMovimientos(movimientosRes.data);
    }
    loadData();
  }, []);

  return { autores, ubicaciones, tecnicas, movimientos };
}
