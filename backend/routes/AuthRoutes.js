import express from "express";
import { userSchema } from "../schema/AuthSchema.js";
import { userModel } from "../model/AuthModel.js";
import bcrypt from "bcrypt";
const AuthRoutes = express.Router();

AuthRoutes.post("/signup", async (req, res) => {
  try {
    const userValiDate = userSchema.safeParse(req.body);

    if (!userValiDate.success) {
      return res.status(400).json({
        message: "Invalid input",
        errors: result.error.errors,
      });
    } else {
      const userInfo = req?.body;

      const checkUserExist = await userModel.findOne({
        email: userInfo?.email,
      });

      if (checkUserExist) {
        return res.status(409).json({
          success: false,
          message: "Email already exists",
        });
      }

      const hashedPassword = await bcrypt.hash(userInfo.password, 10);

      const result = await userModel.create({
        name: userInfo.name,
        email: userInfo.email,
        password: hashedPassword,
      });

      if (result) {
        res.status(201).json({
          success: true,
          message: "User created successfully",
        });
      }
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export default AuthRoutes;
