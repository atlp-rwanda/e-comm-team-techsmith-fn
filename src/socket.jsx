import { io } from 'socket.io-client';
import { WEBSOCKET_LOCAL_URL, WEBSOCKET_URL } from './constants';

export const socket = io(WEBSOCKET_LOCAL_URL || WEBSOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true
});
