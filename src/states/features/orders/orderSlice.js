import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    orderId: null,
    validateOrderModel: false,
    singleOrder: {},
    ordersCheckout: []
  },
  reducers: {
    setOrderId: (state, { payload }) => {
      state.orderId = payload;
    },
    updateModelVisility: (state, { payload }) => {
      state.validateOrderModel = payload;
    },
    updateSingleOrder: (state, { payload }) => {
      state.singleOrder = payload;
    },
    updateOrders: (state, { payload }) => {
      state.orders = payload;
    },
    setOrdersCheckout: (state, { payload }) => {
      state.ordersCheckout = payload;
    },
    updateOrdersCheckout: (state, { payload }) => {
      state.ordersCheckout = [...state.ordersCheckout, payload];
    }
  }
});

export default orderSlice.reducer;

export const {
  setOrderId,
  updateModelVisility,
  updateSingleOrder,
  updateOrders,
  setOrdersCheckout,
  updateOrdersCheckout
} = orderSlice.actions;
