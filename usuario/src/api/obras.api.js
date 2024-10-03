import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const getAllObras = () => {
  return axios.get(`${API_URL}/obras`);
};

const getObra = (id) => {
  return axios.get(`${API_URL}/obras/${id}`);
};

const putObra = (id, obra) => {
  return axios.put(`${API_URL}/obras/${id}`, obra);
}

const postObra = (obra) => {
  return axios.post(`${API_URL}/obras`, obra);
}
export { 
  getAllObras, 
  getObra,
  putObra,
  postObra,
};
