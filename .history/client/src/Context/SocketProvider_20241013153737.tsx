import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { io } from "socket.io-client";
import { createUniqueId } from "../Utils/generateId";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContext {
    sendMessage: (message: string, ReplyToId: string | null, ReplyToNAme: string | null, ReplyToText: string | null) => void;
    DeleteHandler: (mID: string) => void;
    memberCount: number;
    data: MessageData[];
    socketID: string | null;
}

export interface MessageData {
    mID: string;
    text: string;
    socketId: string;
    kinderId: string;
    sender_name: string;
    picture: string;
    createdAt: string;
    ReplyToId: string | null;
    ReplyToNAme: string | null;
    ReplyToText: string | null;
}

const SocketContext = createContext<SocketContext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const socketRef = useRef<ReturnType<typeof io> | null>(null);
    const [memberCount, setMemberCount] = useState<number>(0);
    const [data, setData] = useState<MessageData[]>([]);
    const [socketID, setSocketID] = useState<string | null>(null);
    const { user } = useKindeAuth();

    const sendMessage = useCallback((message: string, ReplyToId: string | null, ReplyToNAme: string | null, ReplyToText: string | null) => {
        if (socketRef.current && socketRef.current.connected) {
            const data: MessageData = {
                mID: createUniqueId(user?.id || '', message),
                ReplyToId,
                ReplyToNAme,
                ReplyToText,
                text: message,
                socketId: socketRef.current.id,
                kinderId: user?.id || '',
                sender_name: `${user?.given_name || ''} ${user?.family_name || ''}`.trim(),
                picture: user?.picture || '',
                createdAt: new Date().toISOString(),
            };
            socketRef.current.emit('event:send', data);
        } else {
            console.warn('Socket is not connected.');
        }
    }, [user]);

    const DeleteHandler = useCallback((mID: string) => {
        if (socketRef.current) {
            socketRef.current.emit('event:delete', mID);
        }
    }, []);

    useEffect(() => {
        const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:3000';
        socketRef.current = io(SOCKET_URL, { reconnect: true });

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('connected to server', socket.id);
            setSocketID(socket.id as string);
        });

        socket.on('pastMessages', (messages: MessageData[]) => {
            setData(messages);
        });

        socket.on('members', (members: number) => {
            setMemberCount(members);
        });

        socket.on('event:delete', (mID: string) => {
            console.log('Message deleted:', mID);
            setData((prevState) => prevState.filter((msg) => msg.mID !== mID));
        });

        socket.on('event:receive', (data: MessageData) => {
            setData((prevState) => [...prevState, data]);
        });

        socket.on('connect_error', (err) => {
            console.error('Connection error:', err);
        });

        socket.on('disconnect', (reason) => {
            console.warn('Disconnected from server:', reason);
        });

        return () => {
            socket.off('connect');
            socket.off('pastMessages');
            socket.off('members');
            socket.off('event:delete');
            socket.off('event:receive');
            socket.disconnect();
        };
    }, []);

    const contextValue = useMemo(() => ({
        sendMessage,
        memberCount,
        data,
        socketID,
        DeleteHandler,
    }), [sendMessage, memberCount, data, socketID, DeleteHandler]);

    return (
        <SocketContext.Provider value={contextValue}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
