import { Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreateUserDocumentSchema,
  UpdateUserDocumentSchema,
  UpdateDocumentStatusSchema,
} from "../schemas/userDocument.schema";
import { AuthenticatedRequest } from "../types/auth.types";

const prisma = new PrismaClient();

/**
 * Create a new user document with field data
 */
export const createUserDocument = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Validate AuthenticatedRequest body
    const result = CreateUserDocumentSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors });
      return;
    }

    const { documentTypeId, title, fieldData } = result.data;

    // Extract userId from the AuthenticatedRequest (added by auth middleware)
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID not found" });
      return;
    }

    // Verify document type exists
    const documentType = await prisma.documentType.findUnique({
      where: { id: documentTypeId },
      include: { fields: true },
    });

    if (!documentType) {
      res.status(404).json({ error: "Document type not found" });
      return;
    }

    // Validate field data against document type fields
    if (fieldData) {
      const documentFieldIds = documentType.fields.map((field) => field.id);
      const invalidFields = fieldData.filter(
        (data) => !documentFieldIds.includes(data.fieldId)
      );

      if (invalidFields.length > 0) {
        res.status(400).json({
          error: "Invalid field IDs provided",
          invalidFields: invalidFields.map((f) => f.fieldId),
        });
        return;
      }

      // Check for required fields
      const requiredFields = documentType.fields.filter(
        (field) => field.isRequired
      );
      const missingFields = requiredFields.filter(
        (field) =>
          !fieldData.some((data) => data.fieldId === field.id && data.value)
      );

      if (missingFields.length > 0) {
        res.status(400).json({
          error: "Required fields missing values",
          missingFields: missingFields.map((f) => ({
            id: f.id,
            fieldName: f.fieldName,
            label: f.label,
          })),
        });
        return;
      }
    }

    // Create user document and field data in a transaction
    const newUserDocument = await prisma.$transaction(async (tx) => {
      // Create the user document
      const userDoc = await tx.userDocument.create({
        data: {
          userId,
          documentTypeId,
          title,
          status: "Completed",
        },
      });

      // Create field data if provided
      if (fieldData && fieldData.length > 0) {
        await tx.documentFieldData.createMany({
          data: fieldData.map((field) => ({
            userDocumentId: userDoc.id,
            fieldId: field.fieldId,
            value: field.value || null,
          })),
        });
      }

      return userDoc;
    });

    // Fetch the complete document with field data
    const completeDocument = await prisma.userDocument.findUnique({
      where: { id: newUserDocument.id },
      include: {
        documentType: {
          select: {
            name: true,
            description: true,
            category: true,
          },
        },
        fieldData: {
          include: {
            field: {
              select: {
                fieldName: true,
                label: true,
                fieldType: true,
              },
            },
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Document created successfully",
      data: completeDocument,
    });
    return;
  } catch (error) {
    console.error("[CREATE_USER_DOCUMENT_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

/**
 * Update an existing user document
 */
export const updateUserDocument = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const result = UpdateUserDocumentSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors });
      return;
    }

    const { title, status, fieldData } = result.data;

    // Extract userId from the AuthenticatedRequest (added by auth middleware)
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID not found" });
      return;
    }

    // Check if document exists and belongs to the user
    const existingDocument = await prisma.userDocument.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        documentType: {
          include: {
            fields: true,
          },
        },
      },
    });

    if (!existingDocument) {
      res.status(404).json({
        error: "Document not found or you don't have permission to access it",
      });
      return;
    }

    // Validate field data against document type fields if provided
    if (fieldData) {
      const documentFieldIds = existingDocument.documentType.fields.map(
        (field) => field.id
      );
      const invalidFields = fieldData.filter(
        (data) => !documentFieldIds.includes(data.fieldId)
      );

      if (invalidFields.length > 0) {
        res.status(400).json({
          error: "Invalid field IDs provided",
          invalidFields: invalidFields.map((f) => f.fieldId),
        });
        return;
      }
    }

    // Update document and field data in a transaction
    await prisma.$transaction(async (tx) => {
      // Update basic document info
      await tx.userDocument.update({
        where: { id },
        data: {
          title,
          status: status as any,
          updatedAt: new Date(),
        },
      });

      // Update field data if provided
      if (fieldData && fieldData.length > 0) {
        // Process each field data update
        for (const field of fieldData) {
          // Check if field data exists for this document
          const existingFieldData = await tx.documentFieldData.findFirst({
            where: {
              userDocumentId: id,
              fieldId: field.fieldId,
            },
          });

          if (existingFieldData) {
            // Update existing field data
            await tx.documentFieldData.update({
              where: { id: existingFieldData.id },
              data: {
                value: field.value,
                updatedAt: new Date(),
                versionNumber: existingFieldData.versionNumber + 1,
              },
            });
          } else {
            // Create new field data
            await tx.documentFieldData.create({
              data: {
                userDocumentId: id,
                fieldId: field.fieldId,
                value: field.value,
              },
            });
          }
        }
      }
    });

    // Fetch the updated document with field data
    const updatedDocument = await prisma.userDocument.findUnique({
      where: { id },
      include: {
        documentType: {
          select: {
            name: true,
            description: true,
          },
        },
        fieldData: {
          include: {
            field: {
              select: {
                fieldName: true,
                label: true,
                fieldType: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Document updated successfully",
      data: updatedDocument,
    });
    return;
  } catch (error) {
    console.error("[UPDATE_USER_DOCUMENT_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

/**
 * Update document status
 */
export const updateDocumentStatus = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;
    const result = UpdateDocumentStatusSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors });
      return;
    }

    const { status } = result.data;

    // Extract userId from the AuthenticatedRequest
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID not found" });
      return;
    }

    // Check if document exists and belongs to the user
    const existingDocument = await prisma.userDocument.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingDocument) {
      res.status(404).json({
        error: "Document not found or you don't have permission to access it",
      });
      return;
    }

    // Update document status
    const updatedDocument = await prisma.userDocument.update({
      where: { id },
      data: {
        status: status as any,
        updatedAt: new Date(),
      },
      include: {
        documentType: {
          select: {
            name: true,
          },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Document status updated successfully",
      data: {
        id: updatedDocument.id,
        title: updatedDocument.title,
        status: updatedDocument.status,
        documentType: updatedDocument.documentType.name,
        updatedAt: updatedDocument.updatedAt,
      },
    });
    return;
  } catch (error) {
    console.error("[UPDATE_DOCUMENT_STATUS_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

/**
 * Get a specific user document by ID
 */
export const getUserDocument = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Extract userId from the AuthenticatedRequest
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID not found" });
      return;
    }

    // Get document if it belongs to the user
    const document = await prisma.userDocument.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        documentType: {
          include: {
            fields: true,
          },
        },
        fieldData: {
          include: {
            field: true,
          },
        },
      },
    });

    if (!document) {
      res.status(404).json({
        error: "Document not found or you don't have permission to access it",
      });
      return;
    }

    // Organize field data in a more user-friendly structure
    const formattedFieldData = document.fieldData.map((data) => ({
      id: data.id,
      fieldId: data.fieldId,
      fieldName: data.field.fieldName,
      label: data.field.label,
      fieldType: data.field.fieldType,
      value: data.value,
      versionNumber: data.versionNumber,
    }));

    const response = {
      ...document,
      fieldData: formattedFieldData,
      // Don't expose redundant field details
      documentType: {
        ...document.documentType,
        fields: document.documentType.fields.map((field) => ({
          id: field.id,
          fieldName: field.fieldName,
          label: field.label,
          fieldType: field.fieldType,
          isRequired: field.isRequired,
          sortOrder: field.sortOrder,
          options: field.options,
          helpText: field.helpText,
        })),
      },
    };

    res.status(200).json({
      success: true,
      data: response,
    });
    return;
  } catch (error) {
    console.error("[GET_USER_DOCUMENT_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

/**
 * Get all documents for a user with minimal information
 */
export const getAllUserDocuments = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    // Extract userId from the AuthenticatedRequest
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID not found" });
      return;
    }

    // Optional query parameters
    const status = req.query.status as string | undefined;
    const documentTypeId = req.query.documentTypeId as string | undefined;

    // Build filter conditions
    const filterConditions: Prisma.UserDocumentWhereInput = {
      userId,
      ...(status && { status: status as any }),
      ...(documentTypeId && { documentTypeId }),
    };

    // Get all documents for the user with minimal info
    const documents = await prisma.userDocument.findMany({
      where: filterConditions,
      select: {
        id: true,
        title: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        lastGeneratedAt: true,
        version: true,
        documentType: {
          select: {
            id: true,
            name: true,
            category: true,
            icon: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      count: documents.length,
      data: documents,
    });
    return;
  } catch (error) {
    console.error("[GET_ALL_USER_DOCUMENTS_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

/**
 * Delete a user document
 */
export const deleteUserDocument = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Extract userId from the AuthenticatedRequest
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID not found" });
      return;
    }

    // Check if document exists and belongs to the user
    const existingDocument = await prisma.userDocument.findFirst({
      where: {
        id,
        userId,
      },
      select: {
        id: true,
        title: true,
      },
    });

    if (!existingDocument) {
      res.status(404).json({
        error: "Document not found or you don't have permission to access it",
      });
      return;
    }

    // Delete document and its field data in a transaction
    await prisma.$transaction(async (tx) => {
      // First delete all field data
      await tx.documentFieldData.deleteMany({
        where: { userDocumentId: id },
      });

      // Then delete the document
      await tx.userDocument.delete({
        where: { id },
      });
    });

    res.status(200).json({
      success: true,
      message: "Document deleted successfully",
      data: {
        id: existingDocument.id,
        title: existingDocument.title,
      },
    });
    return;
  } catch (error) {
    console.error("[DELETE_USER_DOCUMENT_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

/**
 * Generate document files (PDF/DOCX)
 */
export const generateDocumentFiles = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const { id } = req.params;

    // Extract userId from the AuthenticatedRequest
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: "Unauthorized: User ID not found" });
      return;
    }

    // Check if document exists and belongs to the user
    const document = await prisma.userDocument.findFirst({
      where: {
        id,
        userId,
      },
      include: {
        documentType: true,
        fieldData: {
          include: {
            field: true,
          },
        },
      },
    });

    if (!document) {
      res.status(404).json({
        error: "Document not found or you don't have permission to access it",
      });
      return;
    }

    // Check if document type has a template
    if (!document.documentType.templatePath) {
      res
        .status(400)
        .json({ error: "No template available for this document type" });
      return;
    }

    // Here you would implement your document generation logic
    // This is a placeholder for where you would call your PDF/DOCX generation service
    const pdfPath = `/documents/${userId}/${id}_${Date.now()}.pdf`;
    const docxPath = `/documents/${userId}/${id}_${Date.now()}.docx`;

    // Update document with file paths and generation time
    const updatedDocument = await prisma.userDocument.update({
      where: { id },
      data: {
        generatedPdfPath: pdfPath,
        generatedDocxPath: docxPath,
        lastGeneratedAt: new Date(),
      },
    });

    res.status(200).json({
      success: true,
      message: "Document files generated successfully",
      data: {
        id: updatedDocument.id,
        title: updatedDocument.title,
        pdfPath: updatedDocument.generatedPdfPath,
        docxPath: updatedDocument.generatedDocxPath,
        generatedAt: updatedDocument.lastGeneratedAt,
      },
    });
    return;
  } catch (error) {
    console.error("[GENERATE_DOCUMENT_FILES_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};
