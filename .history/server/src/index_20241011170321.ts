import http from 'http';
import dotenv from 'dotenv';
import { Server } from 'socket.io';

dotenv.config();

const httpserver = http.createServer();
const port = process.env.PORT || 3000;

const io = new Server(httpserver, {
    cors: {
        origin: '*',
    },
});

httpserver.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default io;