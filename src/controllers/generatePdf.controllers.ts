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
    browser = await puppeteer.launch({
      // headless: "new", // Use new headless mode
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
        "--run-all-compositor-stages-before-draw",
      ],
    });

    const page: Page = await browser.newPage();

    try {
      // Optimized HTML content without extra padding
      const optimizedHtmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <style>
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            body {
              font-family: Arial, sans-serif;
              line-height: 1.4;
              color: #000;
              background: white;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            
            @page {
              margin: 0;
            }
          </style>
        </head>
        <body>
          ${htmlContent}
        </body>
        </html>
      `;

      // Load content without setting viewport
      await page.setContent(optimizedHtmlContent, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      // Generate PDF with paper size matching content
      const pdfBuffer = await page.pdf({
        printBackground: true,
        preferCSSPageSize: true, // Respect CSS-defined page sizes
        displayHeaderFooter: false,
        margin: {
          top: "0mm",
          right: "0mm",
          bottom: "0mm",
          left: "0mm",
        },
      });

      res.set({
        "Content-Type": "application/pdf",
        "Content-Length": pdfBuffer.length.toString(),
        "Content-Disposition": "attachment; filename=resignation-letter.pdf",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      });

      res.send(pdfBuffer);
    } finally {
      await page.close();
    }
  } catch (error) {
    console.error("PDF Generation Error:", error);

    if (error instanceof TimeoutError) {
      return res.status(504).json({
        error: "PDF generation timed out.",
        details:
          "The server could not generate the PDF in time. Please try again.",
      });
    }

    res.status(500).json({
      error: "An internal error occurred during PDF generation.",
      details:
        error instanceof Error ? error.message : "Unknown error occurred.",
    });
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};
