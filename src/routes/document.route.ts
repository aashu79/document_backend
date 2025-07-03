import { Router } from "express";
import {
  createDocumentType,
  deleteDocumentType,
  getAllDocumentTypes,
  getDocumentType,
  updateDocumentType,
} from "../controllers/documentType.controllers";

const router = Router();

router.get("/", getAllDocumentTypes);

router.get("/:id", getDocumentType);

router.post("/", createDocumentType);

router.put("/:id", updateDocumentType);

router.delete("/:id", deleteDocumentType);

export default router;
