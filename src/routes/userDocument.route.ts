import express from "express";
import { authenticateUser } from "../middlewares/auth.middlewares";
import {
  createUserDocument,
  createUserDocumentWithoutFieldData,
  deleteUserDocument,
  generateDocumentFiles,
  getAllUserDocuments,
  getUserDocument,
  updateDocumentStatus,
  updateUserDocument,
} from "../controllers/userDocuments";

const router = express.Router();

// Apply authentication middleware to all routes
router.use(authenticateUser);

// Document CRUD operations

router.post("/", createUserDocument);

router.get("/", getAllUserDocuments);

router.get("/:id", getUserDocument);
router.put("/:id", updateUserDocument);
router.patch("/:id/status", updateDocumentStatus);
router.delete("/:id", deleteUserDocument);

// Document generation
router.post("/:id/generate", generateDocumentFiles);
router.post("/create", createUserDocumentWithoutFieldData);

export default router;
