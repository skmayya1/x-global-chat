import React, { createContext, useCallback, useEffect, useState } from "react";
import { io, SocketOptions } from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContext {
    sendMessage: (message: string) => void;
    memberCount: number;
}


const SocketContext = createContext<SocketContext | null>(null);

const socket = io('http://localhost:3000');

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const sendMessage = useCallback((message: string) => {
        socket.emit('event:send', message);
        console.log('message sent:', message);
        
    }, []);
    const [memberCount, setmemberCount] = useState<number>(0)
    const [socket, setsocket] = useState<SocketOptions | null>(null)
    useEffect(() => {
        setsocket(io('http://localhost:3000'));
        socket.on('connect', () => {
            console.log('connected to server',socket.id);
        });
        socket.on('members', (members: number) => {
            setmemberCount(members);
        });
        socket.on('message', (message: string) => {
            console.log('message received:', message);
        });
        return () => {
            socket.disconnect();
        }
    },[])

    return (
        <SocketContext.Provider value={{ sendMessage, memberCount }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;