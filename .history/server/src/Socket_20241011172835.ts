import io from './index'

io.on('connection', (socket) => {
    console.log('user connected to socket :', socket.id);
    socket.emit('message', 'Hello from server');
    socket.on('disconnect', () => {
        console.log('user disconnected from socket :', socket.id);
    });
});
