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
      }),
      deleteProduct: builder.mutation({
        query: ({ productId }) => {
          return {
            url: `/products/${productId}`,
            method: 'DELETE',
            headers: {
              authorization: `${token}`
            }
          };
        }
      }),
      updateProduct: builder.mutation({
        query: ({ data, id }) => {
          return {
            url: `products/${id}`,
            method: 'PUT',
            body: data,
            headers: {
              'Content-Type': 'application/json',
              authorization: `${token}`
            }
          };
        },
        invalidatesTags: ['Products']
      }),
      getAllWishlist: builder.query({
        query: () => {
          return {
            url: 'wishlist',
            headers: {
              authorization: `${token}`
            }
          };
        }
      }),
      postAddToWishlist: builder.mutation({
        query: ({ productId }) => {
          return {
            url: `wishlist/${productId}`,
            method: 'POST',
            headers: {
              authorization: `${token}`
            }
          };
        }
      }),
      deleteSingleWishlist: builder.mutation({
        query: ({ productId }) => {
          return {
            url: `wishlist/${productId}`,
            method: 'DELETE',
            headers: {
              authorization: `${token}`
            }
          };
        }
      }),
      deleteAllWishlist: builder.mutation({
        query: () => {
          return {
            url: 'wishlist',
            method: 'DELETE',
            headers: {
              authorization: `${token}`
            }
          };
        }
      }),
      getAllWishlistAllUsers: builder.query({
        query: ({ page, size }) => {
          return `wishlist/allWishlists/?size=${size}&page=${page}`;
        }
      }),
      getAllOrdersUser: builder.query({
        query: ({ page, size }) => {
          return {
            url: `orders/user/?size=${size}&page=${page}`,
            headers: {
              authorization: `${token}`
            }
          };
        }
      }),
      postOrderBulkPayment: builder.mutation({
        query: ({ ordersCheckout, card }) => {
          return {
            url: 'orders/checkout',
            method: 'POST',
            body: { ordersCheckout, card },
            headers: {
              authorization: `${token}`
            }
          };
        }
      }),
      submitContactForm: builder.mutation({
        query: ({ name, email, phone, message }) => {
          return {
            url: `/users/contact`,
            method: 'POST',
            body: { name, email, phone, message },
            headers: {
              'Content-Type': 'application/json'
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
  useGetProductsCategoryQuery,
  useLazyGetAllProductsQuery,
  usePutUserRoleMutation,
  useCreateOrderMutation,
  useGetSingleOrderQuery,
  usePostOrderPaymentMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
  useLazyGetAllWishlistQuery,
  usePostAddToWishlistMutation,
  useDeleteSingleWishlistMutation,
  useDeleteAllWishlistMutation,
  useLazyGetAllWishlistAllUsersQuery,
  useLazyGetAllOrdersUserQuery,
  usePostOrderBulkPaymentMutation,
  useSubmitContactFormMutation
} = apiSlice;
