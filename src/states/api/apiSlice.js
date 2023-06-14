import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

const token = `token=${localStorage.getItem('myToken')}`;

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tags: ['Products'],
  endpoints: (builder) => {
    return {
      getSingleProduct: builder.query({
        query: (id) => {
          return `products/${id}`;
        }
      }),
      postProductReview: builder.mutation({
        query: ({ id, review }) => {
          return {
            url: `feedback/${id}`,
            method: 'POST',
            body: review,
            headers: {
              'Content-Type': 'application/json',
              authorization: `${token}`
            }
          };
        },
        invalidatesTags: ['Products']
      }),
      getProductReviews: builder.query({
        query: ({ id }) => {
          return {
            url: `feedback/${id}`,
            headers: {
              'Content-Type': 'application/json',
              authorization: `${token}`
            }
          };
        }
      }),
      createProduct: builder.mutation({
        query: (data) => {
          return {
            url: 'products',
            method: 'POST',
            body: data,
            headers: {
              'Content-Type': 'application/json',
              authorization: `${token}`
            }
          };
        }
      })
    };
  }
});

export const {
  useGetSingleProductQuery,
  usePostProductReviewMutation,
  useGetProductReviewsQuery,
  useCreateProductMutation
} = apiSlice;
