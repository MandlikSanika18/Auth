// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: "/api", // proxy will prepend http://localhost:5000
});

export default api;
