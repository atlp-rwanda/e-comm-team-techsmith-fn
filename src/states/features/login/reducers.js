// reducer.js
import { GET_TOKEN } from './actionTypes';

const initialState = {
  data: null
};

const token = (state = initialState, action) => {
  switch (action.type) {
    case GET_TOKEN:
      return {
        ...state,
        data: action.payload
      };
    default:
      return state;
  }
};

export default token;
