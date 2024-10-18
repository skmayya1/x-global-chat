import { useKindeAuth } from "@kinde-oss/kinde-auth-react";
import React, { createContext, useCallback, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { createUniqueId } from "../Utils/generateId";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContext {
    sendMessage: (message: string, ReplyToId: string | null,
        ReplyToNAme: string | null,
        ReplyToText: string | null) => void;
    DeleteHandler: (mID: string) => void;
    memberCount: number;
    data: MessageData[];
    socketID: string | null; // Use camelCase for consistency
}

export interface MessageData {
    mID: string;
    text: string;
    socketId: string;
    kinderId: string;
    sender_name: string;
    picture: string ;
    createdAt: string ;
    ReplyToId  : string | null;
    ReplyToNAme: string | null;
    ReplyToText: string | null;
}

const SocketContext = createContext<SocketContext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
    const socketRef = useRef<ReturnType<typeof io> | null>(null); // Store socket instance
    const [memberCount, setMemberCount] = useState<number>(0);
    const [data, setData] = useState<MessageData[]>([]);
    const [socketID, setSocketID] = useState<string | null>(null);
    const { user } = useKindeAuth();

    const sendMessage = useCallback((message: string, ReplyToId: string | null,
        ReplyToNAme: string | null,
        ReplyToText: string | null) => {
        if (socketRef.current) {
            const data = {
                mID: createUniqueId(user?.id || '', message),
                ReplyToId,
                ReplyToNAme,
                ReplyToText,
                text:message,
                socketId: socketRef.current.id,
                kinderId: user?.id,
                sender_name: user?.given_name + (user?.family_name ? ' ' + user.family_name : ''),
                picture: user?.picture,
                createdAt: new Date().toISOString(),
            };
            socketRef.current.emit('event:send', data);
        }
    }, [user]);

    const DeleteHandler = useCallback((mID: string) => {
        if (socketRef.current) {
            socketRef.current.emit('event:delete', mID);
        }
    },[]);

    useEffect(() => {
        socketRef.current = io('http://localhost:3000');

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('connected to server', socket.id);
            setSocketID(socket.id as string); // Set socket ID after connecting
        });

        socket.on('pastMessages', (messages: MessageData[]) => {
            setData(messages);                        
        });
        socket.on('members', (members: number) => {
            setMemberCount(members);
        });
        socket.on('event:delete', (mID: string) => {
            console.log('Message Deleted:', mID); // Debugging

            setData(
                return prevData.filter((msgdata) => msgdata.mID !== mID);
            });
        });



        socket.on('event:receive', (data: MessageData) => {
            setData((prevState) => [...prevState, data]);
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

    return (
        <SocketContext.Provider value={{ sendMessage, memberCount, data, socketID, DeleteHandler }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketContext;
