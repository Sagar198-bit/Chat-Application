import io from "socket.io-client";

let socketInstances = null;

function Socket(name, id) {


    if (socketInstances) {
        return socketInstances
    }

    socketInstances = io("http://localhost:8000", {
        withCredentials: true,
    });
    socketInstances.on("connect", () => {
        socketInstances.emit("join", {
            userId: id,
            username: name,
        });
    });
    socketInstances.on("disconnect", function () {
        socketInstances = null
    })

    return socketInstances;
}

export {Socket}