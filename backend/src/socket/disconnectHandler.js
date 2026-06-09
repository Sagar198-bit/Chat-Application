import { userModel } from "../model/AuthModel.js";

export const disconnectSocketHandler = async (socket) => {
  try {
    await userModel.findByIdAndUpdate(socket.userId, {
      socket_id: null,
      online_status: false,
      last_seen: new Date(),
    });

    socket.broadcast.emit("user_offline", { userId: socket.userId });
  } catch (err) {
    console.log(err.message);
  }
};
