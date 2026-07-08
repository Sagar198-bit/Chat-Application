import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const AuthMiddleWare = (req, res, next) => {
  try {
    const { token } = req.cookies;

    console.log('Token: ' , token)
    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token Not Provided",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or Expired Token",
    });
  }
};
