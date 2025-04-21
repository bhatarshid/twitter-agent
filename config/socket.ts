import { io, Socket } from 'socket.io-client';

let socket: Socket;

const URL = process.env.NODE_ENV === 'production'
  ? process.env.PROD_URL : process.env.DEV_URL;

export const getSocket = (): Socket => {
  if (socket) {
    return socket;
  }
  socket = io(URL, {
    autoConnect: false
  });
  return socket;
}