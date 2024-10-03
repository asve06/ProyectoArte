import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAllMovimientos = () => {
  return axios.get(`${API_URL}/movimientos`);
}

export{
  getAllMovimientos,
}