import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContext {
    sendMessage: (message: string) => void;
    memberCount: number;
}

const SocketContext = createContext<SocketContext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const socketRef = useRef<ReturnType<typeof io> | null>(null); // Store socket instance
    const [memberCount, setMemberCount] = useState<number>(0);
    const [Data, setData] = useState<[
        {
            message: string;
            socketId: string;
        }
    ]>([{
        message: '',
        socketId: ''
    }]
    )

    const sendMessage = useCallback((message: string) => {
        if (socketRef.current) {
            const data = {
                message,
                socketId: socketRef.current.id, // Extracting only the socket ID
            };
            socketRef.current.emit('event:send', data);
            console.log('message sent:', message);
        }
    }, []);


    useEffect(() => {
        socketRef.current = io('http://localhost:3000');

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('connected to server', socket.id);
        });

        socket.on('members', (members: number) => {
            setMemberCount(members);
        });

        socket.on('message', (message: string) => {
            console.log('message received:', message);
        });

        socket.on('event:recieve', (data: { message: string; socketId: string }) => {
            setData([...data, data.message]);
        });

        return () => {
            socket.off('members');
            socket.off('message');
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ sendMessage, memberCount }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
