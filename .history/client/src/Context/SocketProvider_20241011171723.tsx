"use client"

import React, { createContext, useCallback } from "react"

interface SocketProviderProps {
    children?: React.ReactNode
}

interface socketContext {
    sendMessage : (message: string) => any
}

const SocketContext = createContext<socketContext | null>(null)

export const SocketProvide: React.FC<SocketProviderProps> = ({ children }) => {
    const sendMessage: socketContext["sendMessage"] = useCallback((message) => {
        console.log(message)
    }   , [])
    return (
        <SocketContext.Provider value={sendMessage}>
            {children}
        </SocketContext.Provider>
    )
}