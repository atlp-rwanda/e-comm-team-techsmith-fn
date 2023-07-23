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
    groups: [],
    roomId: null,
    createUserModal: false,
    createGroupModal: false,
    createNewGroupModal: false,
    searchResults: {
      users: [],
      totalPages: 1
    },
    groupUsers: [],
    createConversationOptions: false,
    user: {}
  },
  reducers: {
    createMessage: (state, { payload }) => {
      const message = {
        messageBody: payload,
        user,
        roomId: state.roomId
      };
      console.log(message);
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
    setCreateUserModal: (state, { payload }) => {
      state.createUserModal = payload;
    },
    searchRoom: (state, { payload }) => {
      socket.emit('searchRoom', payload);
    },
    setSearchRoomResults: (state, { payload }) => {
      state.searchResults = payload;
    },
    setRoomParticipants: (state, { payload }) => {
      state.roomId = payload?.room?.id;
      const room = {
        id: payload?.room?.id,
        name: payload?.room?.name
      };
      state.rooms = [...state.rooms, room];
    },
    setCreateGoupModal: (state, { payload }) => {
      state.createGroupModal = payload;
    },
    setGroupsList: (state, { payload }) => {
      state.groups = payload;
    },
    setSearchGroupResults: (state, { payload }) => {
      const groups = payload.map((group) => {
        return {
          id: group.id,
          name: group.name,
          group: true
        };
      });
      state.searchResults = {
        users: groups,
        totalPages: 1
      };
    },
    setCreateNewGroupModal: (state, { payload }) => {
      state.createNewGroupModal = payload;
    },
    setGroupUsers: (state, { payload }) => {
      state.groupUsers = [...state.groupUsers, payload];
    },
    setCreateConversationOptions: (state, { payload }) => {
      state.createConversationOptions = payload;
    },
    setLocalStorageUser: (state, { payload }) => {
      localStorage.setItem('user', JSON.stringify(payload));
      state.user = payload;
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
  setCreateUserModal,
  searchRoom,
  setSearchRoomResults,
  setRoomParticipants,
  setCreateGoupModal,
  setGroupsList,
  setSearchGroupResults,
  setCreateNewGroupModal,
  setGroupUsers,
  setCreateConversationOptions,
  setLocalStorageUser
} = chatSlice.actions;

export default chatSlice.reducer;
