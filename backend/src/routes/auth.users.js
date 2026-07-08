import express from "express";
import {AuthMiddleWare} from "../middleware/AuthMiddleWare.js";
import {getALlUsers} from "../controllers/user.controller.js";
 const userRoutes = express.Router();

userRoutes.get("/users" , AuthMiddleWare, getALlUsers)

export {userRoutes}