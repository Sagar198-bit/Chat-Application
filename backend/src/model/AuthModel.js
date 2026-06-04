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
  socket_id: {
    type: String,
    default: null,
  },
  online_status: {
    type: Boolean,
    default: false,
  },
  last_seen: {
    type: Date,
    default: null,
  },
});

export const userModel = mongoose.model("users", userSchema);
