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
            url: `feedback/${id}?size=${40}&page=${3}`,
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
              'Content-Type': 'application/json'
            }
          };
        }
      }),
      putUserRole: builder.mutation({
        query: ({ id, roleId }) => {
          return {
            url: `users/${id}/role/${roleId}`,
            method: 'PUT',
            headers: {
              authorization: `${token}`
            }
          };
        }
      }),
      getAllCategories: builder.query({
        query: () => {
          return `category`;
        }
      }),
      postProductSearch: builder.mutation({
        query: ({ name, categoryIds, price, size, page }) => {
          return {
            url: `products/search/?size=${size}&page=${page}`,
            method: 'POST',
            body: { name, categoryIds, price }
          };
        }
      }),
      getProductsCategory: builder.query({
        query: ({ categoryId, size, page }) => {
          return `category/${categoryId}/?size=${size}&page=${page}`;
        }
      }),
      getAllProducts: builder.query({
        query: ({ size, page }) => {
          return `products/?size=${size}&page=${page}`;
        }
      }),
      createOrder: builder.mutation({
        query: ({ desiredQuantity, productId, amount }) => {
          return {
            url: 'orders',
            method: 'POST',
            body: { desiredQuantity, productId, amount },
            headers: {
              'Content-Type': 'application/json',
              authorization: `${token}`
            }
          };
        }
      }),
      getSingleOrder: builder.query({
        query: (id) => {
          return {
            url: `orders/single/${id}`,
            headers: {
              'Content-Type': 'application/json',
              authorization: `${token}`
            }
          };
        }
      }),
      postOrderPayment: builder.mutation({
        query: ({ orderId, card }) => {
          return {
            url: `orders/${orderId}/checkout`,
            method: 'POST',
            body: card,
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
  useCreateProductMutation,
  useGetAllCategoriesQuery,
  usePostProductSearchMutation,
  useLazyGetProductsCategoryQuery,
  useLazyGetAllProductsQuery,
  usePutUserRoleMutation,
  useCreateOrderMutation,
  useGetSingleOrderQuery,
  usePostOrderPaymentMutation
} = apiSlice;
