import { Router } from "express";
import { getDocumentTemplates } from "../controllers/documentTemplate.controllers";

const router = Router();

router.get("/:documentTypeSlug", getDocumentTemplates as any);

export default router;
