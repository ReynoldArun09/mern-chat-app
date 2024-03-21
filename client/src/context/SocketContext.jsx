/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io from 'socket.io-client'

export const SocketContext = createContext()

export const useSocketContext = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const [onlineUser, setOnlineUser] = useState([])
    const {authUser} = useAuthContext()

    useEffect(() => {
        if(authUser) {
            const socket = io(import.meta.env.VITE_BASE_URL, {
                query: {
                    userId: authUser._id
                }
            })
            setSocket(socket)
            socket.on('getOnlineUsers', (users) => {
                setOnlineUser(users)
            })
            return () => socket.close()
        } else {
            if(socket) {
                socket.close()
                setSocket(null)
            }
        }
    }, [authUser])

    return <SocketContext.Provider value={{socket, onlineUser}}>{children}</SocketContext.Provider>
}