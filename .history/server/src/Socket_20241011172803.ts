import io from './index'

io.on('connection', (socket) => {
    console.log('user connected to socket :', socket.id);
    socket.emit('message', (message) => {
        console.log('message received:', message);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected from socket :', socket.id);
    });
});
