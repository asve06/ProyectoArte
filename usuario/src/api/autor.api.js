import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAllAutores = () => {
  return axios.get(`${API_URL}/autores`);
}

export {
  getAllAutores,
}