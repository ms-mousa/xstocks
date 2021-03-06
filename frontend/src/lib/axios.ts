import axios from 'axios';

export const Axios = axios.create({
  baseURL: process.env.BACKEND_URL,
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
