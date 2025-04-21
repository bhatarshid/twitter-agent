import { Server as SocketIOServer } from 'socket.io';

declare global {
  // allow global.io to be reused without TypeScript errors
  // eslint-disable-next-line no-var
  var io: SocketIOServer | undefined;
}

export const setSocketServer = (ioInstance: SocketIOServer) => {
  global.io = ioInstance;
};

export const getSocketServer = (): SocketIOServer => {
  if (!global.io) {
    throw new Error("Socket server not initialized");
  }
  return global.io;
};
