import { combineReducers } from "redux";
import { productsReducer } from "./features/products/reducer";
const allReducers = combineReducers({
    products: productsReducer
})
export default allReducers;