import { io } from "socket.io-client";

const URL = process.env.REACT_APP_BaseURL;

const socket = io(URL , {
    transports:['websocket'],
    autoConnect:false
})

export default socket;