import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const generateToken = (payload: object) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: 3600 * 24 * 7 }); // Default to 7 days
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, JWT_SECRET);
};
