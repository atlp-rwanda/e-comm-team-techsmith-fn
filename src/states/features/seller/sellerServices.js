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

const sellerServices = { getMyStock, getItem };

export default sellerServices;
