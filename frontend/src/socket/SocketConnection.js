//this is used to connect the socket connection if the user has token already

import {Socket} from "./socket.js"
export const connectSocket = (status) => {
    if(status){
        const socket = Socket();

        socket().on("connect", () => {
            socket().emit("join", {
                userId: data._id,
                username: data.username,
            });
        });
    }
}