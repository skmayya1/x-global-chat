"use client"

import { createContext } from "react"

interface SocketProvider {
    children: React.ReactNode
}

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    )
}