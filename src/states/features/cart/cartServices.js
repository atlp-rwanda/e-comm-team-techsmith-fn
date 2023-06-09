import API from '../../api';
import { API_URL } from '../../../constants';

const headers = {
  'Content-Type': 'application/json',
  Cookie: localStorage.getItem('myToken')
};

const getCart = async () => {
  const response = await API.get(`${API_URL}/cart`, { headers });
  return response.data.itemsInCart;
};

const cartServices = { getCart };

export default cartServices;
