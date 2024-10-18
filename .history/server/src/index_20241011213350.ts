import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import {Redis} from 'ioredis';

dotenv.config();
const pub = new Redis({
    host: 'caching-30657912-animxwear-e65e.h.aivencloud.com',
    port: 28945,
    username: 'default',
    password: 'AVNS_EmbwYEqmR2OHRqr5HVE',
    m
});

const sub = new Redis({
    host: 'caching-30657912-animxwear-e65e.h.aivencloud.com',
    port: 28945,
    username: 'default',
    password: 'AVNS_EmbwYEqmR2OHRqr5HVE',
});


const httpserver = http.createServer();
const port = process.env.PORT || 3000;

const io = new Server(httpserver, {
    cors: {
        origin: '*',
        allowedHeaders: '*',
    },
});

sub.subscribe('MESSAGES');

io.on('connection', (socket) => {
    socket.join('global-chat');

    io.emit('members', Array.from(io.sockets.adapter.rooms.get('global-chat') ?? new Set()).length);

    socket.on('event:send', async (data) => {
        console.log('message received:', data);

        try {
            const result = await pub.publish('MESSAGES', JSON.stringify(data));
            console.log('Message published:', data, 'Result:', result);
        } catch (err) {
            console.error('Error publishing message:', err);
        }
    });


    console.log('user connected to socket :', socket.id);

    socket.on('disconnect', () => {
        console.log('user disconnected from socket :', socket.id);
        io.emit('members', Array.from(io.sockets.adapter.rooms.get('global-chat') ?? new Set()).length);
    });
});

sub.on('subscribe', (channel, count) => {
    console.log(`Subscribed to ${channel}, total subscriptions: ${count}`);
});

sub.on('message', (channel, message) => {
    if (channel === 'MESSAGES') {
        const data = JSON.parse(message);
        console.log('Message received from Redis:', data);
        io.to('global-chat').emit('event:receive', data);
    }
});


httpserver.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
