import { combineReducers } from 'redux';
import productsReducer from './features/products/reducer';
import token from './features/login/reducers';

const allReducers = combineReducers({
  products: productsReducer,
  token
});
export default allReducers;
