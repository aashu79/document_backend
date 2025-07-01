import express from "express";
import { handleProfileUpload } from "../middlewares/multer.middlewares";
import {
  getUserProfile,
  loginUser,
  registerUser,
} from "../controllers/auth.controllers";
import { authenticateUser } from "../middlewares/auth.middlewares";

const router = express.Router();

router.post("/register", [handleProfileUpload], registerUser);
router.post("/login", loginUser);
router.get("/profile", authenticateUser, getUserProfile);

export default router;
