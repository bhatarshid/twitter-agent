import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const getSocket = (): Socket => {
  if (socket) {
    return socket;
  }
  socket = io('http://localhost:3000', {
    autoConnect: false
  });
  return socket;
}