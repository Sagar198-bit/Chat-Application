import express, { urlencoded } from "express";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import http from "http";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { DbConnect } from "./src/connection/dbconnect.js";
import SocketAuth from "./src/socket/socketAuth.js";
import cors from "cors";

dotenv.config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});


io.use(SocketAuth)
//env confiuration

io.on("connection", (socket) => {
  console.log("User Connected");

  socket.on("disconnect", () => {
    console.log("user Disconnected", socket.id);
  });
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json()); //middleware for json
app.use(urlencoded({ extended: true })); //middleware for urlencoded format

//connecting to Db
DbConnect()
  .then(() => {
    console.log("Database has been connected !!");
  })
  .catch((err) => {
    console.log(`${err.messages}`);
  });

//Authentications Routes
app.use("/api/v1/auth", AuthRoutes);

server.listen(process.env.PORT, () => {
  console.log(`Server is Runing...`);
});
