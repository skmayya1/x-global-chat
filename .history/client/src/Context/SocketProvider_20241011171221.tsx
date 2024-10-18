"use client"

import React, { createContext } from "react"

interface SocketProviderProps {
    children?: React.ReactNode
}

const SocketContext = createContext(null)

export const SocketProvide: React.FC<> = ({ children }) => {
    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    )
}