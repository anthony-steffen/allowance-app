import axios from 'axios';

const API = axios.create({
  baseURL: 'https://allowance-backend-production.up.railway.app/',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

export default API;
