
import React from 'react'
import { createContext } from 'react'
import socket from '../utility/websocket';
import { useEffect } from 'react';
import { useContext } from 'react';

const socketContext=createContext();

function SocketProvider({children}) {
useEffect(()=>{
    socket.connect();

    return()=>{
        socket.disconnect();
    }
},[]);
  return (
       <socketContext.Provider value={socket}>
             {children}
       </socketContext.Provider>
  )
}


export const useWebSocket = ()=>{
    return  useContext(socketContext);
}
export default SocketProvider
