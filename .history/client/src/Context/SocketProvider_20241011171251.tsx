"use client"

import React, { createContext } from "react"

interface SocketProviderProps {
    children?: React.ReactNode
}

interface socketContext {
    
}

const SocketContext = createContext(null)

export const SocketProvide: React.FC<SocketProviderProps> = ({ children }) => {
    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    )
}