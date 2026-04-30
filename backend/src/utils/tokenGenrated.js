import jwt from "jsonwebtoken";

export const jwtTokenGenrated = (user) => {
  return jwt.sign(
    { userId: user._id }, // payload (data)
    process.env.JWT_SECRET, // secret key
    { expiresIn: "1d" }, // expiry
  );
};
