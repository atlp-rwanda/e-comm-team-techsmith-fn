import { createSlice } from '@reduxjs/toolkit';
import { socket } from '../../../socket';
import { removeDuplicates } from '../../../utils/Arrays';

export const user = JSON.parse(localStorage.getItem('user'));

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    activeUsers: [],
    newUser: null,
    error: null,
    loading: false
  },
  reducers: {
    createMessage: (state, { payload }) => {
      const message = {
        message: payload,
        loggedInUser: user
      };
      socket.emit('createMessage', message);
    },
    updateMessages: (state, { payload }) => {
      const updatedMessages = [...state.messages, payload];
      const nonDuplicateMessages = removeDuplicates(updatedMessages);
      state.messages = nonDuplicateMessages;
    },
    setServerMessages: (state, { payload }) => {
      state.messages = payload;
    },
    updateActiveUsers: (state, { payload }) => {
      const nonDuplicateActiveUsers = removeDuplicates(payload);
      state.activeUsers = nonDuplicateActiveUsers;
    },
    removeActiveUser: (state, { payload }) => {
      const updatedActiveUsers = state.activeUsers.filter((activeUser) => {
        return activeUser !== payload;
      });
      state.activeUsers = updatedActiveUsers;
    },
    addActiveUser: (state, { payload }) => {
      const updatedActiveUsers = [...state.activeUsers, payload];
      const nonDuplicateActiveUsers = removeDuplicates(updatedActiveUsers);
      state.activeUsers = nonDuplicateActiveUsers;
      state.newUser = payload;
    }
  }
});

export const {
  createMessage,
  getMessages,
  setServerMessages,
  updateMessages,
  updateActiveUsers,
  removeActiveUser,
  addActiveUser
} = chatSlice.actions;

export default chatSlice.reducer;
