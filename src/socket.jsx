import { io } from 'socket.io-client';
import { WEBSOCKET_URL } from './constants';

export const socket = io(WEBSOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true
});
