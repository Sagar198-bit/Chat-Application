//user schema for db

import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    unique: true,
    required: true,
  },
});

export const userModel = mongoose.model("users", userSchema);
