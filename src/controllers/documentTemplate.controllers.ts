import { Request, Response } from "express";
import { documentTemplateModules } from "../templates";

export const getDocumentTemplates = (req: Request, res: Response) => {
  try {
    const { documentTypeSlug } = req.params;

    const module =
      documentTemplateModules[
        documentTypeSlug as keyof typeof documentTemplateModules
      ];

    if (!module) {
      return res.status(404).json({
        message: `Templates for document type '${documentTypeSlug}' not found.`,
      });
    }

    const templatesWithPlaceholders = module.rawTemplate();

    return res.status(200).json(templatesWithPlaceholders);
  } catch (error) {
    console.error("Error fetching templates:", error);
    return res.status(500).json({
      message: "An internal server error occurred.",
    });
  }
};
