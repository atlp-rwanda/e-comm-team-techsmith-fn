import API from '../../api';
import { API_URL } from '../../../constants';

const getMyStock = async (page) => {
  const response = await API.get(
    `${API_URL}/products/myStock?page=${page}?&size=4`
  );
  return response.data.data;
};
const getItem = async (id) => {
  const response = await API.get(`${API_URL}/products/${id}`);
  return response.data.data;
};
const getAllNotification = async () => {
  const response = await API.get(`${API_URL}/notify`);
  return response.data.data;
};
const readSingleNotification = async (id) => {
  const response = await API.put(`${API_URL}/notify/${id}`);
  return response.data.data;
};
const readAllNotification = async () => {
  const response = await API.get(`${API_URL}/notify/read/`);
  return response.data.data;
};
const getAllUnreadNotification = async () => {
  const response = await API.get(`${API_URL}/notify/unread`);
  return response.data.data || [];
};
const deleteNotification = async (id) => {
  const response = await API.delete(`${API_URL}/notify/${id}`);
  return response.data.data;
};
const sellerServices = {
  getMyStock,
  getItem,
  getAllNotification,
  readSingleNotification,
  readAllNotification,
  getAllUnreadNotification,
  deleteNotification
};

export default sellerServices;
