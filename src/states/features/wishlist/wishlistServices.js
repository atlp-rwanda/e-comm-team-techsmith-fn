import API from '../../api';
import { API_URL } from '../../../constants';

const getAllWishlist = async () => {
  const response = await API.get(`${API_URL}/wishlist`);

  return response.data;
};
const addToWishlist = async () => {
  const response = await API.delete(`${API_URL}/wishlist`);

  return response.data;
};
const deleteWishlist = async (id) => {
  const response = await API.delete(`${API_URL}/wishlist/${id}`);

  return response.data;
};
const deleteAllWishlist = async () => {
  const response = await API.delete(`${API_URL}/wishlist`);
  return response.data;
};
const wishlistServices = {
  getAllWishlist,
  addToWishlist,
  deleteAllWishlist,
  deleteWishlist
};
export default wishlistServices;
