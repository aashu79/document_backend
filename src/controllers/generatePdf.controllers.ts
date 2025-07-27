import { Request, Response } from "express";
import { documentTemplateModules } from "../templates";
import puppeteer from "puppeteer";

export const generatePdfHandler = async (req: Request, res: Response) => {
  const { documentTypeSlug, formData, theme } = req.body;

  const module =
    documentTemplateModules[
      documentTypeSlug as keyof typeof documentTemplateModules
    ];
  if (!module) {
    return res
      .status(404)
      .json({ error: `Document type '${documentTypeSlug}' not found.` });
  }

  const templates = module.generate(formData);
  const htmlContent = templates[theme as keyof typeof templates];

  if (!htmlContent) {
    return res.status(400).json({ error: `Invalid theme '${theme}'.` });
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox"],
    });
    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });
    const pdfBuffer = await page.pdf({ format: "A4", printBackground: true });
    await browser.close();

    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": pdfBuffer.length,
    });
    res.send(pdfBuffer);
    return;
  } catch (error) {
    console.error("PDF Generation Error:", error);
    res
      .status(500)
      .json({ error: "An internal error occurred during PDF generation." });
  }
};
