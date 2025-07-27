import { Router } from "express";
import { generatePdfHandler } from "../controllers/generatePdf.controllers";

const router = Router();

router.post("/:documentTypeSlug", generatePdfHandler as any);

export default router;
