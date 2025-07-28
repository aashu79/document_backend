import { Request, Response } from "express";
import { documentTemplateModules } from "../templates";
import puppeteer, { Browser, Page, TimeoutError } from "puppeteer";

export const generatePdfHandler = async (req: Request, res: Response) => {
  const { documentTypeSlug } = req.params;
  const { formData, theme } = req.body;

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

  let browser: Browser | null = null;

  try {
    // Launch Puppeteer with a stable set of arguments for server environments
    browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage", // Essential for Docker and some CI/CD environments
        "--disable-gpu", // Often helps prevent crashes in headless mode
      ],
    });

    const page: Page = await browser.newPage();

    try {
      // Use goto with a data URL for more reliable content loading
      await page.goto(
        `data:text/html;charset=UTF-8,${encodeURIComponent(htmlContent)}`,
        {
          waitUntil: "networkidle0", // Wait for network calls (e.g., fonts) to finish
          timeout: 60000, // 60-second timeout
        }
      );

      const pdfBuffer = await page.pdf({
        format: "A4",
        printBackground: true,
        margin: { top: "1in", right: "1in", bottom: "1in", left: "1in" },
      });

      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdfBuffer.length,
      });
      res.send(pdfBuffer);
    } finally {
      // Ensure the page is closed even if pdf generation fails
      await page.close();
    }
  } catch (error) {
    console.error("PDF Generation Error:", error);

    // FIX: Correctly check for TimeoutError
    if (error instanceof TimeoutError) {
      return res.status(504).json({
        error: "PDF generation timed out.",
        details:
          "The server could not load external resources (like fonts) in time. Check network or firewall settings.",
      });
    }

    // Handle other errors, including the TargetCloseError
    res.status(500).json({
      error: "An internal error occurred during PDF generation.",
      details:
        error instanceof Error
          ? error.message
          : "An unknown error occurred. The browser process may have crashed.",
    });
  } finally {
    // Ensure the main browser instance is closed to prevent memory leaks
    if (browser) {
      await browser.close();
    }
  }
};
