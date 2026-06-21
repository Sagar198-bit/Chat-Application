import dotenv from "dotenv";
dotenv.config();
import express, { urlencoded } from "express";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import http from "http";
import cookieParser from "cookie-parser";
import { DbConnect } from "./src/connection/dbconnect.js";
import SocketAuth from "./src/socket/socketAuth.js";
import { Server } from "socket.io";
import cors from "cors";
import { ConnectSocketHandler } from "./src/socket/connectHandler.js";
import { disconnectSocketHandler } from "./src/socket/disconnectHandler.js";
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
 

  socket.on("disconnect", () => {
    console.log("User Disconnected !!")
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

server.listen(process.env.PORT, () => {
  console.log(`Server is Runing...`);
});
