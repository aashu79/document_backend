import { Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../types/auth.types";

const prisma = new PrismaClient();

export const authenticateUser = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res
        .status(401)
        .json({ error: "Authorization header missing or malformed" });
      return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      res.status(401).json({ error: "Token missing" });
      return;
    }

    let decoded: any;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      res.status(401).json({ error: "Invalid or expired token" });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user || !user.isActive) {
      res.status(401).json({ error: "User not found or inactive" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("[AUTH_MIDDLEWARE_ERROR]", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};
