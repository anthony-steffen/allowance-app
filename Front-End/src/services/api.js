import axios from 'axios';

export const API = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: 'https://allowance-backend-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Permite envio de cookies
});
 