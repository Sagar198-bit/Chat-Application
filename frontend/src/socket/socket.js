import io from "socket.io-client";

let socketInstances = null;

function Socket(){


if (socketInstances) {
    return socketInstances
}

socketInstances = io("http://localhost:8000", {
    withCredentials: true,
});

socketInstances.on("disconnect", function () {
    socketInstances = null
})

return socketInstances;
}

export {Socket}