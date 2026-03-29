import express, { urlencoded } from "express";
import AuthRoutes from "./routes/AuthRoutes.js";
import dotenv from "dotenv";
import { DbConnect } from "./connection/dbconnect.js";
const app = express();
app.use(express.json()); //middleware for json
app.use(urlencoded({ extended: true })); //middleware for urlencoded format

//connecting to Db
DbConnect().then(() => {
    console.log('Database has been connected !!')
}).catch((err) => {
    console.log(`${err.messages}`)
})

//env confiuration
dotenv.config();

//Authentications Routes
app.use("/api/v1/auth", AuthRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is Runing...`);
});
