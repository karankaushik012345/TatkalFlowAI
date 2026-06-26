import http from 'http';
import { Server } from 'socket.io';
import app from './app';
import { connectDB } from './config/db';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

const server = http.createServer(app);

// Setup Socket.io
export const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // User joins their own private room for personal alerts
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User ${userId} joined their room`);
  });

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
