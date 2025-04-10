import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on("connection", (socket) => {
    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('connect_error', (error) => {
      console.error('Connection error:', error);
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
})