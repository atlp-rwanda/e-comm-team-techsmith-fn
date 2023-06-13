import API from '../../api';
import { API_URL } from '../../../constants';
import checkIsLogged from '../../../utils/isLoggedin';

const getCart = async () => {
  const { token } = checkIsLogged();
  const response = await API.get(`${API_URL}/cart`, {
    headers: {
      Authorization: `token=${token}`
    }
  });
  return response.data.itemsInCart;
};

const cartServices = { getCart };

export default cartServices;
