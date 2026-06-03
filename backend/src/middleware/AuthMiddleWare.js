import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const AuthMiddleWare = (req, res, next) => {

  
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token Not Provided",
      });
    }

    const isTokenVerifed = jwt.verify(token, process.env.JWT_SECRET);

    req.user = isTokenVerifed;
    if (isTokenVerifed) {
      next();
    }
  } catch (error) {
    return res.status(401).json({
      status: false,
      message: "Invalid or Expired Token",
    });
  }
};
