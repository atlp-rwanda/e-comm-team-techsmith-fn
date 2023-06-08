import API from '../../api';
import { API_URL } from '../../../constants';

const login = async (data) => {
  const response = await API.post(`${API_URL}/users/login`, data);
  localStorage.setItem('myToken', response.data.Authorization);

  return response.data.Authorization;
};

const authServices = { login };

export default authServices;
