import { createSlice } from '@reduxjs/toolkit';

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    page: 0,
    size: 3,
    total: 0
  },
  reducers: {
    setPage: (state, { payload }) => {
      if (payload < 0) {
        state.page = 0;
      } else {
        state.page = payload;
      }
    },
    setSize: (state, { payload }) => {
      state.size = payload;
    },
    setTotal: (state, { payload }) => {
      state.total = payload;
    }
  }
});

export const { setPage, setSize, setTotal } = paginationSlice.actions;
export default paginationSlice.reducer;
