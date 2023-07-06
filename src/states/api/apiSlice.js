import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL } from '../../constants';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      const token = `token=${localStorage.getItem('myToken')}`;
      if (token) {
        headers.set('authorization', token);
      }
      return headers;
    }
  }),
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
            body: review
          };
        },
        invalidatesTags: ['Products']
      }),
      getProductReviews: builder.query({
        query: ({ id }) => {
          return {
            url: `feedback/${id}?size=${40}&page=${3}`
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
            method: 'PUT'
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
            body: { desiredQuantity, productId, amount }
          };
        }
      }),
      getSingleOrder: builder.query({
        query: (id) => {
          return {
            url: `orders/single/${id}`
          };
        }
      }),
      postOrderPayment: builder.mutation({
        query: ({ orderId, card }) => {
          return {
            url: `orders/${orderId}/checkout`,
            method: 'POST',
            body: card
          };
        }
      }),
      deleteProduct: builder.mutation({
        query: ({ productId }) => {
          return {
            url: `/products/${productId}`,
            method: 'DELETE'
          };
        }
      }),
      updateProduct: builder.mutation({
        query: ({ data, id }) => {
          return {
            url: `products/${id}`,
            method: 'PUT',
            body: data
          };
        },
        invalidatesTags: ['Products']
      }),
      getAllWishlist: builder.query({
        query: () => {
          return {
            url: 'wishlist'
          };
        }
      }),
      postAddToWishlist: builder.mutation({
        query: ({ productId }) => {
          return {
            url: `wishlist/${productId}`,
            method: 'POST'
          };
        }
      }),
      deleteSingleWishlist: builder.mutation({
        query: ({ productId }) => {
          return {
            url: `wishlist/${productId}`,
            method: 'DELETE'
          };
        }
      }),
      deleteAllWishlist: builder.mutation({
        query: () => {
          return {
            url: 'wishlist',
            method: 'DELETE'
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
            url: `orders/user/?size=${size}&page=${page}`
          };
        }
      }),
      postOrderBulkPayment: builder.mutation({
        query: ({ ordersCheckout, card }) => {
          return {
            url: 'orders/checkout',
            method: 'POST',
            body: { ordersCheckout, card }
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
      }),
      getAllSellers: builder.query({
        query: ({ size, page }) => {
          return {
            url: `sellers/?size=${size}&page=${page}`
          };
        }
      }),
      getSingleSeller: builder.query({
        query: (id) => {
          return {
            url: `sellers/${id}`
          };
        }
      }),
      getRoomList: builder.query({
        query: ({ userId, page, size }) => {
          return {
            url: `chat/rooms/${userId}/?size=${size}&page=${page}`
          };
        }
      }),
      getChatRoom: builder.query({
        query: (id) => {
          return {
            url: `chat/chats/${id}`
          };
        }
      }),
      postCreateRoomWithParticipant: builder.mutation({
        query: ({ creatorId, recipientId, roomName }) => {
          return {
            url: `chat/rooms/participants/?creatorId=${creatorId}&recipientId=${recipientId}`,
            method: 'POST',
            body: {
              name: roomName || ''
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
  useSubmitContactFormMutation,
  useLazyGetAllSellersQuery,
  useLazyGetSingleSellerQuery,
  useLazyGetRoomListQuery,
  usePostCreateRoomWithParticipantMutation
} = apiSlice;
