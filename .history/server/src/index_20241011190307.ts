import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import Redis from 'ioredis'

dotenv.config();

const pub = new Redis()
const sub = new Redis()

const httpserver = http.createServer();
const port = process.env.PORT || 3000;

const io = new Server(httpserver, {
    cors: {
        origin: '*',
        allowedHeaders: '*',
    },
});

io.on('connection', (socket) => {
    socket.join('global-chat');
    io.emit('members', Array.from(io.sockets.adapter.rooms.get('global-chat') ?? new Set()).length);
    socket.on('event:send', (data) => {
        console.log('message received:', data);

    })

    console.log('user connected to socket :', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected from socket :', socket.id);
    });
});

httpserver.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

