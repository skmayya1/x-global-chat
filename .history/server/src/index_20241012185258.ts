import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import { Redis } from 'ioredis';
import { consumeMessages, sendMessage } from './kafka';
import prisma from './prisma';

dotenv.config();
const pub = new Redis('rediss://default:AVNS_EmbwYEqmR2OHRqr5HVE@caching-30657912-animxwear-e65e.h.aivencloud.com:28945');

const sub = new Redis('rediss://default:AVNS_EmbwYEqmR2OHRqr5HVE@caching-30657912-animxwear-e65e.h.aivencloud.com:28945');

pub.on('error', (err) => {
    console.error('Error connecting to Redis:', err);
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
consumeMessages();

io.on('connection', async (socket) => {
    socket.join('global-chat');
    const messages = await prisma.message.find
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

sub.on('message', (channel, count) => {
    console.log(`Subscribed to ${channel}, total subscriptions: ${count}`);
});

sub.on('message', async(channel, message) => {
    if (channel === 'MESSAGES') {
        const data = JSON.parse(message);
        console.log('Message received from Redis:', data);
         await sendMessage(data);
        io.to('global-chat').emit('event:receive', data);
    }
});


httpserver.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
