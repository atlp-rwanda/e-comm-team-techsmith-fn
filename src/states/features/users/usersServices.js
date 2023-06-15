import API from '../../api';
import { API_URL } from '../../../constants';
import checkIsLogged from '../../../utils/isLoggedin';

const disable = async (id) => {
  const response = await API.put(`${API_URL}/users/disable/${id}`);
  return response.data.message;
};
const enable = async (id) => {
  const response = await API.put(`${API_URL}/users/enable/${id}`);

  return response.data.message;
};
const allusers = async (page) => {
  const response = await API.get(`${API_URL}/admin/users?page=${page}?&size=5`);
  return response.data.data;
};

const userInfo = async () => {
  const { id } = checkIsLogged();
  const response = await API.get(`${API_URL}/users/${id}`);
  return response.data;
};

const updateUser = async (data) => {
  const { id } = checkIsLogged();
  const response = await API.put(`${API_URL}/users/${id}`, data);
  return response.data;
};

const usersServices = { disable, enable, allusers, userInfo, updateUser };

export default usersServices;
