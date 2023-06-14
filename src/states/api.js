import axios from 'axios';
import { API_URL } from '../constants';

const API = axios.create({
  baseURL: API_URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('myToken');
  if (token) {
    req.headers.Authorization = `token=${token}`;
  }
  return req;
});

export default API;
