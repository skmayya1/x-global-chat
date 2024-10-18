"use client"

import { createContext } from "react"

interface SocketContextType {
    chil

const SocketContext = createContext(null)

export const SocketProvider = ({ children }) => {
    return (
        <SocketContext.Provider value={null}>
            {children}
        </SocketContext.Provider>
    )
}