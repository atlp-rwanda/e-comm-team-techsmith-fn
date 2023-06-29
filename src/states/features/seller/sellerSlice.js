import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sellerServices from './sellerServices';

const initialState = {
  page: 1,
  message: '',
  isPending: false,
  networkError: false,
  totalpages: 0,
  isLoading: false,
  isDeleted: false,
  isSeen: false,
  myCollection: [],
  notifications: [],
  unreadNotifications: [],
  newUnread: 0,
  sellers: [],
  seller: {}
};

const resetStates = {
  isPending: false,
  networkError: false,
  totalpages: '...',
  isLoading: false,
  isDeleted: false,
  isSeen: false
};
// Creating authslice
export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    reset: () => {
      return resetStates;
    },
    setSellers: (state, { payload }) => {
      state.sellers = payload;
    },
    updateSeller: (state, { payload }) => {
      state.seller = payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchingMyCollection.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchingMyCollection.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.myCollection = payload.products;
        state.totalpages = payload.totalPages;
      })
      .addCase(fetchingMyCollection.rejected, (state) => {
        state.isPending = false;
        state.networkError = true;
      })
      .addCase(fetchingOneItem.pending, (state) => {
        state.isPending = true;
      })
      .addCase(fetchingOneItem.fulfilled, (state, { payload }) => {
        state.isPending = false;
        state.item = payload;
      })
      .addCase(fetchingOneItem.rejected, (state) => {
        state.isPending = false;
        state.networkError = true;
      })
      //  Notification of seller
      //Mark notification as read
      .addCase(markNotificationAsRead.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(markNotificationAsRead.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(markNotificationAsRead.rejected, (state) => {
        state.isLoading = false;
      })
      //get all notification
      .addCase(fetchingAllNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchingAllNotification.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.notifications = payload;
      })
      .addCase(fetchingAllNotification.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.message = payload;
      })
      //get all unread notification
      .addCase(fetchingAllUnreadNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        fetchingAllUnreadNotification.fulfilled,
        (state, { payload }) => {
          state.isLoading = false;
          state.unreadNotifications = payload;
          state.newUnread = payload.length;
        }
      )
      .addCase(fetchingAllUnreadNotification.rejected, (state) => {
        state.isLoading = false;
      })
      // mark single notification as read
      .addCase(readSingleNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(readSingleNotification.fulfilled, (state) => {
        state.isLoading = false;
        state.isSeen = true;
      })
      .addCase(readSingleNotification.rejected, (state) => {
        state.isLoading = false;
      })
      // delete single notification
      .addCase(deleteSingleNotification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSingleNotification.fulfilled, (state) => {
        state.isLoading = false;
        state.isDeleted = true;
      })
      .addCase(deleteSingleNotification.rejected, (state) => {
        state.isLoading = false;
        state.isDeleted = false;
      });
  }
});

export const fetchingMyCollection = createAsyncThunk(
  'myCollection-thunk',
  async (data, thunkAPI) => {
    try {
      return await sellerServices.getMyStock(data);
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchingOneItem = createAsyncThunk(
  'oneItem-thunk',
  async (data, thunkAPI) => {
    try {
      return await sellerServices.getItem(data);
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const markNotificationAsRead = createAsyncThunk(
  'readAllNotification-thunk',
  async (data, thunkAPI) => {
    try {
      return await sellerServices.readAllNotification();
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchingAllNotification = createAsyncThunk(
  'getAll-thunk',
  async (data, thunkAPI) => {
    try {
      return await sellerServices.getAllNotification();
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const fetchingAllUnreadNotification = createAsyncThunk(
  'allUnreadNotification-thunk',
  async (data, thunkAPI) => {
    try {
      return await sellerServices.getAllUnreadNotification();
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const readSingleNotification = createAsyncThunk(
  'readSingleNotification-thunk',
  async (data, thunkAPI) => {
    try {
      return await sellerServices.readSingleNotification(data);
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const deleteSingleNotification = createAsyncThunk(
  'deleteSingleNotification-thunk',
  async (data, thunkAPI) => {
    try {
      return await sellerServices.deleteNotification(data);
    } catch (error) {
      let message;
      if (error.code === 'ERR_NETWORK') {
        message = 'Make sure you are connected to the internet';
      } else if (error.response) {
        message = error.response.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export auth slice
export const { reset, setSellers, updateSeller } = sellerSlice.actions;
export default sellerSlice.reducer;
