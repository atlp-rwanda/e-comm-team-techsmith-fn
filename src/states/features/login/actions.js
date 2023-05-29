// actions.js
import { GET_TOKEN } from './actionTypes';

export const getToken = (data) => {
  return {
    type: GET_TOKEN,
    payload: data
  };
};
