import express, { urlencoded } from "express";
import AuthRoutes from "./src/routes/AuthRoutes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { DbConnect } from "./src/connection/dbconnect.js";
import cors from "cors";
const app = express();

//env confiuration
dotenv.config();

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

app.listen(process.env.PORT, () => {
  console.log(`Server is Runing...`);
});
