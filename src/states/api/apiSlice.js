import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

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
        query: ({ id, review, token }) => {
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
        query: ({ id, token }) => {
          return {
            url: `feedback/${id}`,
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
  useGetProductReviewsQuery
} = apiSlice;
