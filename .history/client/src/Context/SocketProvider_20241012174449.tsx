import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContext {
    sendMessage: (message: string) => void;
    memberCount: number;
    data: MessageData[];
    socketID: string | null; // Use camelCase for consistency
}

export interface MessageData {
    message: string;
    socketId: string;
    kinderId: string;
    sender_name: string;
    picture: string;
    created_at: string;
}

const SocketContext = createContext<SocketContext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const socketRef = useRef<ReturnType<typeof io> | null>(null); // Store socket instance
    const [memberCount, setMemberCount] = useState<number>(0);
    const [data, setData] = useState<MessageData[]>([]);
    const [socketID, setSocketID] = useState<string | null>(null);
    const { user } = useKindeAuth();

    const sendMessage = useCallback((message: string) => {
        if (socketRef.current) {
            const data = {
                message,
                socketId: socketRef.current.id,
                kinderId: user?.id,
                sender_name: user?.given_name + ' ' + user?.family_name !== undefined ? user? || '',
                picture: user?.picture,
                created_at: new Date().toISOString(),
            };
            socketRef.current.emit('event:send', data);
        }
    }, [user]);

    useEffect(() => {
        socketRef.current = io('http://localhost:3000');

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('connected to server', socket.id);
            setSocketID(socket.id as string); // Set socket ID after connecting
        });

        socket.on('members', (members: number) => {
            setMemberCount(members);
        });

        socket.on('event:receive', (data: MessageData) => {
            setData((prevState) => [...prevState, data]);
        });

        return () => {
            socket.off('members');
            socket.off('event:receive');
            socket.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={{ sendMessage, memberCount, data, socketID }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
