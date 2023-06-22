import { createSlice } from '@reduxjs/toolkit';

export const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: [],
    orderId: null,
    validateOrderModel: false,
    singleOrder: {}
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
    }
  }
});

export default orderSlice.reducer;

export const { setOrderId, updateModelVisility, updateSingleOrder } =
  orderSlice.actions;
