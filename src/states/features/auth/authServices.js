import API from '../../api';
import { API_URL } from '../../../constants';

const login = async (data) => {
  const response = await API.post(`${API_URL}/users/login`, data);

  if (!response.data.user) {
    localStorage.setItem('isSeller', 'true');
    localStorage.removeItem('myToken');
    localStorage.setItem('email', data.email);
  } else {
    const { id, name, role } = response.data.user;
    if (role.name === 'admin') {
      localStorage.setItem('isAdmin', 'true');
      localStorage.setItem('user', JSON.stringify({ id, name }));
      localStorage.setItem('myToken', response.data.Authorization);
      localStorage.removeItem('isSeller');
    } else if (role.name === 'buyer') {
      localStorage.setItem('isBuyer', 'true');
      localStorage.setItem('user', JSON.stringify({ id, name }));
      localStorage.setItem('myToken', response.data.Authorization);
      localStorage.removeItem('isSeller');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('isSeller');
    }
  }
  return response.data;
};

const login2FA = async (data) => {
  const userEmail = localStorage.getItem('email');
  const response = await API.get(
    `${API_URL}/users/login/${data}/?email=${userEmail}`
  );
  if (response.data.user) {
    const { id, name, email } = response.data.user;
    localStorage.setItem('user', JSON.stringify({ id, name, email }));
    localStorage.setItem('myToken', response.data.Authorization);
    localStorage.setItem('isSeller', 'true');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('isBuyer');
    localStorage.removeItem('email');
  }

  return response.data.Authorization;
};

const signup = async (data) => {
  const response = await API.post(`${API_URL}/users/signup`, data);
  return response.data.message;
};
const requestPasswordReset = async (email) => {
  const response = await API.post(`${API_URL}/password/requestReset`, {
    email
  });
  return response.data.message;
};
const resetPassword = async (token, password) => {
  const response = await API.post(
    `${API_URL}/password/resetPassword/${token}`,
    { password }
  );
  return response.data;
};
const changePassword = async (data) => {
  const response = await API.put(`${API_URL}/users/update/password`, data);
  return response.data;
};

const authServices = {
  login,
  login2FA,
  signup,
  requestPasswordReset,
  resetPassword,
  changePassword
};

export default authServices;
