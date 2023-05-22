import { GET_PRODUCTS, GET_PRODUCTS_ERROR } from "../actionTypes";

// FETCH PRODUCT
export const getProducts = () => {
  return async (dispatch) =>{
    try {
        // fetch products
        const data = [
            {
              id: 1,
              name: 'Product 1',
              price: 10.99,
              description: 'This is product 1.',
            },
            {
              id: 2,
              name: 'Product 2',
              price: 19.99,
              description: 'This is product 2.',
            },
            {
              id: 3,
              name: 'Product 3',
              price: 7.49,
              description: 'This is product 3.',
            },
           
          ];
        dispatch({
            type: GET_PRODUCTS,
            payload: data
        })
    } catch (error) {
       dispatch({
        type: GET_PRODUCTS_ERROR,
        payload: error.message  
       })
    }
  }
    
}