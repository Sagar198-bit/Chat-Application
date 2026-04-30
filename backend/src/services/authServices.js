import bcrypt from "bcrypt";
import { userSchema } from "../schema/AuthSchema.js";
import { userModel } from "../model/AuthModel.js";
import { loginSchema } from "../schema/AuthSchema.js";
import { jwtTokenGenrated } from "../utils/tokenGenrated.js";
//this is for signup users.....
export const createUser = async (body) => {
  // ✅ fix 1 — was using wrong variable name "result" before it was defined
  const validatedData = userSchema.safeParse(body);

  if (!validatedData.success) {
    const error = new Error("Invalid input");
    error.statusCode = 400;
    throw error;
  }

  // ✅ fix 2 — trim inputs to avoid spaces causing issues
  const { name, email, password } = validatedData.data;
  const trimmedEmail = email.trim().toLowerCase(); // normalize email

  // ✅ check if user already exists
  const existingUser = await userModel.findOne({ email: trimmedEmail });

  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  // ✅ fix 3 — salt rounds increased to 12 for production
  const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // ✅ fix 4 — removed "if (result)" check, just let it throw if it fails
  await userModel.create({
    name: name.trim(),
    email: trimmedEmail,
    password: hashedPassword,
  });
};

//this is for login users

export const loginUser = async (body) => {
  const validateUserDetails = loginSchema.safeParse(body);

  if (!validateUserDetails) {
    const error = new Error("Invalid Input");
    error.statusCode = 400;
    throw error;
  }

  // ✅ fix 2 — trim inputs to avoid spaces causing issues
  const { email, password } = validateUserDetails.data;

  const trimedEmail = email.toLowerCase().trim();

  // Find the user creditionsl in the database

  const user = await userModel.findOne({ email: trimedEmail });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // step 3 — compare plain password with hashed password
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = jwtTokenGenrated(user._id);

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};
