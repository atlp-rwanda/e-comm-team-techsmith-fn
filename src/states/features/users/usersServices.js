import API from '../../api';
import { API_URL } from '../../../constants';

const disable = async (id) => {
  const response = await API.put(`${API_URL}/users/disable/${id}`);

  return response.message;
};
const enable = async (id) => {
  const response = await API.put(`${API_URL}/users/enable/${id}`);

  return response.message;
};
const allusers = async (page) => {
  const response = await API.get(`${API_URL}/admin/users?page=${page}?&size=5`);
  return response.data.data;
};

const usersServices = { disable, enable, allusers };

export default usersServices;
