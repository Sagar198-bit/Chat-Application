//this is used to connect the socket connection if the user has token already

import {Socket} from "./socket.js"
export const connectSocket = (status) => {
    if(status){
        Socket()
    }
}