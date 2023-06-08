import axios from 'axios';
import { API_URL } from '../constants';

const API = axios.create({
  baseURL: API_URL
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('test_token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
