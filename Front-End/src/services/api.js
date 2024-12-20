import axios from 'axios';

export const API = axios.create({
  baseURL: 'https://allowance-backend-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // Permite envio de cookies
});
