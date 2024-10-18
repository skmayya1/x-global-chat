"use client"

import React, { createContext } from "react"

interface SocketProviderProps {
    children?: React.ReactNode
}

interface socketContext {
    isendMessage : (message: string) => any
}

const SocketContext = createContext<socketContext | null>(null)

export const SocketProvide: React.FC<SocketProviderProps> = ({ children }) => {
    const sendMessage : s = (message: string) => {
        console.log(message)
    }
    return (
        <SocketContext.Provider value={sendMessage}>
            {children}
        </SocketContext.Provider>
    )
}