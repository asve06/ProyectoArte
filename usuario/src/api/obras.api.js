import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAllObras = () => {
  return axios.get(`${API_URL}/obras`);
};

const getObra = (id) => {
  return axios.get(`${API_URL}/obras/${id}`);
};

export { 
  getAllObras, 
  getObra,
  
};
