import axios from 'axios';

const getAllObras = () => {
  return axios.get('http://localhost:8000/obras');
};

const getObra = (id) => {
  return axios.get(`http://localhost:8000/obras/${id}`);
};

export { getAllObras, getObra };
