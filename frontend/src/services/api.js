import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // Verifique se esta porta está correta
});

export default api;