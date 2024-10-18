import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

dotenv.config();

const httpserver = http.createServer();
const port = process.env.PORT || 3000;

const io = new Server(httpserver, {
    cors: {
        origin: '*',
        allowedHeaders: '*',
    },
});

io.on('connection', (socket) => {
    console.log('user connected to socket :', socket.id);
    socket.emit('message', 'Hello from server');
    socket.on('disconnect', () => {
        console.log('user disconnected from socket :', socket.id);
        

httpserver.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default io;