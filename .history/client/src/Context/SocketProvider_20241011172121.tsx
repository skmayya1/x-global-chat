import React, { createContext, useCallback, useEffect } from "react";
import { io } from "socket.io-client";

interface SocketProviderProps {
    children?: React.ReactNode;
}

interface SocketContext {
    sendMessage: (message: string) => void;
}


const SocketContext = createContext<SocketContext | null>(null);

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {

    const sendMessage = useCallback((message: string) => {
        
    }, []);

    useEffect(() => {
        
    },[])

    return (
        <SocketContext.Provider value={{ sendMessage }}>
            {children}
        </SocketContext.Provider>
    );
};
