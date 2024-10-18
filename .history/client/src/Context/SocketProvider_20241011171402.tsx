"use client"

import React, { createContext } from "react"

interface SocketProviderProps {
    children?: React.ReactNode
}

interface socketContext {
    sendMessage : (message: string) => any
}

const SocketContext = createContext<socketContext | undefined>()

export const SocketProvide: React.FC<SocketProviderProps> = ({ children }) => {
    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    )
}