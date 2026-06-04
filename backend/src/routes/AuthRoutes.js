import express from "express";
// import { loginUser } from "../services/authServices.js";
import { signup } from "../controllers/authController.js";
import { login } from "../controllers/authController.js";
import { getme } from "../controllers/authController.js";
import { AuthMiddleWare } from "../middleware/AuthMiddleWare.js";
const AuthRoutes = express.Router();

AuthRoutes.post("/signup", signup);
AuthRoutes.post("/login", login);
AuthRoutes.get("/me", AuthMiddleWare, getme);
export default AuthRoutes;
