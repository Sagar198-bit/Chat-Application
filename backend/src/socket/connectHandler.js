import { userModel } from "../model/AuthModel.js";
export const ConnectSocketHandler = async (socket) => {
  try {
    await userModel.findByIdAndUpdate(socket.userId, {
      socket_id: socket.id,
      online_status: true,
    });

    socket.broadcast.emit("user_online", { userId: socket.userId });
  } catch (err) {
    console.log(err.message);
  }
};
