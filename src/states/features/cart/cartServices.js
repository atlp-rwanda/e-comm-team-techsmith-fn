import API from '../../api';
import { API_URL } from '../../../constants';

const getCart = async () => {
  const response = await API.get(`${API_URL}/cart`);
  console.log(response.data.data.itemsInCart);
  return response.data.data.itemsInCart;
};

const clearCart = async () => {
  const response = await API.delete(`${API_URL}/cart`);

  return response.data.data;
};

const addToCart = async (productId) => {
  const response = await API.post(`${API_URL}/cart/${productId}`);

  return response.data.message;
};

const deleteSingleItem = async (productId) => {
  const response = await API.delete(`${API_URL}/cart/${productId}`);

  const { message } = response.data;
  return message;
};

const cartServices = { getCart, clearCart, addToCart, deleteSingleItem };

export default cartServices;
