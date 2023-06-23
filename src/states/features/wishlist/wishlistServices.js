import API from '../../api';
import { API_URL } from '../../../constants';

const getAllWishlist = async () => {
  const response = await API.get(`${API_URL}/wishlist`);

  return response.data;
};
const addToWishlist = async (id) => {
  const response = await API.post(`${API_URL}/wishlist/${id}`);

  return response.data;
};
const wishlistServices = { getAllWishlist, addToWishlist };
export default wishlistServices;
