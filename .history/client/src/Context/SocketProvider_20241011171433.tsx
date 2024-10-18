"use client"

import React, { createContext } from "react"

interface SocketProviderProps {
    children?: React.ReactNode
}

interface socketContext {
    sendMessage : (message: string) => any
}

const SocketContext = createContext<socketContext | null>(null)

export const SocketProvide: React.FC<SocketProviderProps> = ({ children }) => {
    return (
        <SocketContext.Provider value={}>
            {children}
        </SocketContext.Provider>
    )
}