import { io } from 'socket.io-client';

const URL = 'http://localhost:5001';
const socket = io(URL);

socket.onAny((event, ...args) => {
  console.log('socket event: ', event, args);
});

export default socket;
