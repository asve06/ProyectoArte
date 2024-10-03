import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAllUbicaciones = () => {
  return axios.get(`${API_URL}/ubicacion`);
}

export {
  getAllUbicaciones,
}