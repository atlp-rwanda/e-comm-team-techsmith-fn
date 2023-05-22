import { GET_PRODUCTS } from '../actionTypes';

const initialState = {
  products: []
};
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload
      };
    default:
      return state;
  }
};
