import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { 
    email, 
    password 
  });
    return response.data;
  } catch (error) {
    return Promise.reject(error);
  }
}

export { 
  login, 

};