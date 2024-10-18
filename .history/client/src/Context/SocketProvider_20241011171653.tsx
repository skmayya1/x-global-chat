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
    const sendMessage : socketContext["sendMessage"] = (message: string) => {
        console.log(message)
    }
    return (
        <SocketContext.Provider value={sendMessage}>
            {children}
        </SocketContext.Provider>
    )
}