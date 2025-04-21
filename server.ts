import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
import 'dotenv/config';
import { setSocketServer } from './config/socket-server';

const dev = process.env.NODE_ENV !== 'production';
const hostname = dev ? process.env.DEV_URL : process.env.PROD_URL;
const port = +process.env.PORT!;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();


async function startServer() {
  await app.prepare()
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  setSocketServer(io);

  io.on("connection", (socket) => {
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    socket.on('log', (data) => {
      console.log(`Socket message: ${data}`);
    });

    socket.on('test', (data) => {
      console.log(data);
    });
  });

  httpServer
    .once("error", (err) => {
      console.log(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`Ready on http://${hostname}:${port}`);
    });
}

startServer();