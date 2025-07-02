import { Request, Response } from "express";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { loginSchema, registerSchema } from "../schemas/user.schema";
import { generateToken } from "../utils/jwt";
import { AuthenticatedRequest } from "../types/auth.types";

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    console.log("[REGISTER_USER] Request body:", req.body);
    const parseResult = registerSchema.safeParse(req.body);
    if (!parseResult.success) {
      res.status(400).json({ error: parseResult.error.flatten().fieldErrors });
      return;
    }

    const { firstName, lastName, email, phone, password } = parseResult.data;

    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, phone ? { phone } : undefined].filter(Boolean) as any,
      },
    });

    if (existingUser) {
      res.status(409).json({
        error:
          existingUser.email === email
            ? "Email already in use"
            : "Phone number already in use",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const profileImage = req.file ? req.file.filename : null;

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        password: hashedPassword,
        profileImage,
      },
    });

    const { password: pass, ...userWithoutPassword } = user;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userWithoutPassword,
    });
    return;
  } catch (error) {
    console.error("[REGISTER_USER_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors });
      return;
    }

    const { email, password } = result.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.isActive) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      res.status(401).json({ error: "Invalid credentials" });
      return;
    }

    const token = generateToken({ userId: user.id });
    const { password: pass, ...userWithoutPassword } = user;
    res
      .status(200)
      .json({ message: "Login successful", token, userWithoutPassword });
    return;
  } catch (error) {
    console.error("[LOGIN_USER_ERROR]", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }
};

export const getUserProfile = (req: AuthenticatedRequest, res: Response) => {
  if (!req.user) {
    res.status(403).json({ error: "Unauthorized access" });
    return;
  }

  const { password, ...userWithoutPassword } = req.user;

  res.status(200).json({ user: userWithoutPassword });
  return;
};
