import API from '../../api';
import { API_URL } from '../../../constants';

const getCart = async () => {
  const response = await API.get(`${API_URL}/cart`);

  return response.data.data.itemsInCart;
};

const clearCart = async () => {
  const response = await API.delete(`${API_URL}/cart`);

  return response.data.data;
};

const cartServices = { getCart, clearCart };

export default cartServices;
