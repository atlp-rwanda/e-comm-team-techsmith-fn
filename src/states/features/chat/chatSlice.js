import { createSlice } from '@reduxjs/toolkit';
import moment from 'moment';
import { socket } from '../../../socket';
import { removeDuplicates } from '../../../utils/Arrays';

export const user = JSON.parse(localStorage.getItem('user'));

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [],
    activeUsers: [],
    rooms: [],
    roomId: null,
    conversationModal: false,
    searchResults: {
      users: [],
      totalPages: 1
    }
  },
  reducers: {
    createMessage: (state, { payload }) => {
      const message = {
        messageBody: payload,
        user,
        roomId: state.roomId
      };
      socket.emit('createMessage', message);
    },
    updateMessages: (state, { payload }) => {
      const message = {
        messageBody: payload.messageBody,
        user: payload?.user,
        roomId: payload.roomId,
        timestamp: moment(payload.updatedAt).format('h:mm A')
      };
      const updatedMessages = [...state.messages, message];
      state.messages = removeDuplicates(updatedMessages);
    },
    setMessages: (state, { payload }) => {
      const messages = payload.map((message) => {
        return {
          messageBody: message.messageBody,
          user: {
            id: message.sender.id,
            name: message.sender.name
          },
          roomId: message.roomId,
          timestamp: moment(message.updatedAt).format('h:mm A')
        };
      });
      state.messages = messages;
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
    },
    setRooms: (state, { payload }) => {
      const rooms = payload.map((participant) => {
        let group = false;
        if (participant?.room?.participants?.length > 2) {
          group = true;
        }
        if (participant?.room?.name?.length <= 0) {
          const room = participant?.room?.participants?.filter(
            (roomParticipant) => {
              return roomParticipant?.user?.id !== user.id;
            }
          );
          return {
            id: participant?.roomId,
            name: room[0]?.user?.name,
            group
          };
        }
        return {
          id: participant?.roomId,
          name: participant?.room?.name,
          group
        };
      });
      state.rooms = rooms;
    },
    setRoomId: (state, { payload }) => {
      state.roomId = payload;
    },
    setConversationModal: (state, { payload }) => {
      state.conversationModal = payload;
    },
    searchRoom: (state, { payload }) => {
      socket.emit('searchRoom', payload);
    },
    setSearchResults: (state, { payload }) => {
      const users = payload.searchResults.map((searchUser) => {
        let group = false;
        if (searchUser?.participants?.length > 2) {
          group = true;
        }
        return {
          ...searchUser,
          group
        };
      });
      state.searchResults = {
        users,
        totalPages: payload.totalPages
      };
    },
    setRoomParticipants: (state, { payload }) => {
      state.roomId = payload?.room?.id;
      const room = {
        id: payload?.room?.id,
        name: payload?.room?.name
      };
      state.rooms = [...state.rooms, room];
    }
  }
});

export const {
  createMessage,
  getMessages,
  setMessages,
  updateMessages,
  updateActiveUsers,
  removeActiveUser,
  addActiveUser,
  setRoomId,
  setRooms,
  setConversationModal,
  searchRoom,
  setSearchResults,
  setRoomParticipants
} = chatSlice.actions;

export default chatSlice.reducer;
