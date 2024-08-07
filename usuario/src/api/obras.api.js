import axios from 'axios';

const getAllObras = () => {
  return axios.get('http://localhost:8000/obras/api/v1/obras/');
};

const getObra = (id) => {
  console.log(`http://localhost:8000/obras/api/v1/obras/${id}/`)
  return axios.get(`http://localhost:8000/obras/api/v1/obras/${id}/`);
};

export { getAllObras, getObra };
