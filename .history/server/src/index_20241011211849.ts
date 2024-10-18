import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';
import Redis from 'ioredis'

dotenv.config();
    
const pub = new Redis({
    host: 'caching-30657912-animxwear-e65e.h.aivencloud.com',
    port:
})
const sub = new Redis('rediss://default:AVNS_EmbwYEqmR2OHRqr5HVE@caching-30657912-animxwear-e65e.h.aivencloud.com:28945')

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
        await pub.publish('MESSAGES', JSON.stringify(data));
    })

    console.log('user connected to socket :', socket.id);
    socket.on('disconnect', () => {
        console.log('user disconnected from socket :', socket.id);
    });
});

sub.on('message', (channel, message) => {
    if(channel === 'MESSAGES') {
        const data = JSON.parse(message);
        console.log(data);
        io.to('global-chat').emit('event:recieve', data);
    }
});

httpserver.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

