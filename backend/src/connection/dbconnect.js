import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


console.log(process.env.MONGODB_URI)
export const DbConnect = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
};
