import API from '../../api';
import { API_URL } from '../../../constants';

const login = async (data) => {
  const response = await API.post(`${API_URL}/users/login`, data);

  if (!response.data.user) {
    localStorage.setItem('isSeller', 'true');
    localStorage.removeItem('myToken');
  } else {
    const { id, name } = response.data.user;
    localStorage.setItem('user', JSON.stringify({ id, name }));
    localStorage.setItem('myToken', response.data.Authorization);
    localStorage.removeItem('isSeller');
  }
  return response.data;
};

const login2FA = async (data) => {
  const response = await API.get(`${API_URL}/users/login/${data}`);
  if (response.data.user) {
    const { id, name, email } = response.data.user;
    localStorage.setItem('user', JSON.stringify({ id, name, email }));
    localStorage.setItem('myToken', response.data.Authorization);
  }

  return response.data.Authorization;
};

const signup = async (data) => {
  const response = await API.post(`${API_URL}/users/signup`, data);
  return response.data.message;
};

const authServices = { login, login2FA, signup };

export default authServices;
