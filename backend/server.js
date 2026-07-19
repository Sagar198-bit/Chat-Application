import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import AuthRoutes from "./src/routes/auth.routes.js";
import http from "http";
import cookieParser from "cookie-parser";
import { DbConnect } from "./src/connection/dbconnect.js";
import {onlineUsers} from "./src/socket/onlineUsers.js";
import { Server } from "socket.io";
import cors from "cors";
import {userRoutes} from "./src/routes/auth.users.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json()); //middleware for json
app.use(urlencoded({ extended: true })); //middleware for urlencoded format

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// io.use(SocketAuth);

// //env confiuration

io.on("connection", (socket) => {
   console.log("User Connected", socket.id);
  // ConnectSocketHandler(socket);
socket.on("typing" , ({senderId , receiverId}) => {
    console.log(senderId , receiverId)
    const receiver  = onlineUsers.get(receiverId);

    if(receiver.socketId){
        io.to(receiver.socketId).emit("userTyping" , {senderId})
    }
})

    socket.on("stopTyping" , ({senderId , receiverId}) => {
        const receiver  = onlineUsers.get(receiverId);
        if(receiver.socketId){
            io.to(receiver.socketId).emit("userStoppedTyping" , {senderId})
        }
    })
    socket.on("sendMessage",  (message) => {
        const {senderId, receiverId, text} = message


        console.log('messages: ' , message)
        // Save to DB (uncomment once you have a Message model)
        // const savedMessage = await Message.create({ senderId, receiverId, text })

        const receiver = onlineUsers.get(receiverId)

        if (receiver) {
            io.to(receiver.socketId).emit("receiveMessage", message)
        }
    })

    socket.on("join", (data) => {
        const { userId, username } = data;

        onlineUsers.set(userId, {
            socketId: socket.id,
            username
        });

        io.emit('onlineUsers' , Array.from(onlineUsers.keys()))

    });

  socket.on("disconnect", () => {
    console.log("User Disconnected !!")

      for(const [userId , value] of onlineUsers.entries()){
          if(value.socketId === socket.id){
              onlineUsers.delete(userId)
              break
          }
      }

      io.emit('onlineUsers' , Array.from(onlineUsers.keys()))
  });
});

//connecting to Db
DbConnect()
  .then(() => {
    console.log("Database has been connected !!");
  })
  .catch((err) => {
    console.log(`${err.message}`);
  });

//Authentications Routes
app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1", userRoutes);


server.listen(process.env.PORT, () => {
  console.log(`Server is Runing...`);
});
