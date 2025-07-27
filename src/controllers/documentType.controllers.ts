import { Request, Response } from "express";
import { Prisma, PrismaClient } from "@prisma/client";
import {
  CreateDocumentTypeSchema,
  UpdateDocumentTypeSchema,
} from "../schemas/documentType.schema";

const prisma = new PrismaClient();

export const createDocumentType = async (req: Request, res: Response) => {
  try {
    const result = CreateDocumentTypeSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors });
      return;
    }

    const { fields, ...documentTypeData } = result.data;

    // Generate slug from name if not provided
    const slug =
      documentTypeData.slug ||
      documentTypeData.name
        .toLowerCase()
        .trim()
        .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters
        .replace(/\s+/g, "-") // Replace spaces with hyphens
        .replace(/-+/g, "-") // Replace multiple hyphens with single
        .replace(/^-+|-+$/g, ""); // Remove leading/trailing hyphens

    // Check if document type already exists (by name or slug)
    const existingType = await prisma.documentType.findFirst({
      where: {
        OR: [{ name: documentTypeData.name }, { slug: slug }],
      },
    });

    if (existingType) {
      const conflictField =
        existingType.name === documentTypeData.name ? "name" : "slug";
      res.status(409).json({
        error: `Document type with this ${conflictField} already exists`,
      });
      return;
    }

    // Create document type with fields in a transaction
    const newDocumentType = await prisma.$transaction(async (tx) => {
      const docType = await tx.documentType.create({
        data: {
          ...documentTypeData,
          slug, // Add the generated or provided slug
        },
      });

      if (fields && fields.length > 0) {
        await tx.documentField.createMany({
          data: fields.map(
            (field): Prisma.DocumentFieldCreateManyInput => ({
              documentTypeId: docType.id,
              fieldName: field.fieldName,
              label: field.label,
              fieldType: field.fieldType,
              isRequired: field.isRequired ?? true,
              sortOrder: field.sortOrder ?? 0,
              placeholder: field.placeholder,
              defaultValue: field.defaultValue,
              validation: field.validation,
              options: field.options
                ? JSON.parse(JSON.stringify(field.options))
                : Prisma.JsonNull,
              helpText: field.helpText,
              section: field.section,
              minLength: field.minLength,
              maxLength: field.maxLength,
              dependsOn: field.dependsOn,
              dependsValue: field.dependsValue,
            })
          ),
        });
      }

      return docType;
    });

    // Fetch the complete document type with fields
    const completeDocumentType = await prisma.documentType.findUnique({
      where: { id: newDocumentType.id },
      include: {
        fields: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: "Document type created successfully",
      data: completeDocumentType,
    });
    return;
  } catch (error) {
    console.error("[CREATE_DOCUMENT_TYPE_ERROR]", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res.status(409).json({
          error: "Document type with this name or slug already exists",
        });
        return;
      }
    }

    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

export const updateDocumentType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = UpdateDocumentTypeSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({ error: result.error.flatten().fieldErrors });
      return;
    }

    const { fields, ...updateData } = result.data;

    // Check if document type exists (using UUID directly)
    const existingType = await prisma.documentType.findUnique({
      where: { id: id },
    });

    if (!existingType) {
      res.status(404).json({ error: "Document type not found" });
      return;
    }

    // Check for name conflicts if name is being updated
    if (updateData.name && updateData.name !== existingType.name) {
      const nameConflict = await prisma.documentType.findUnique({
        where: { name: updateData.name },
      });

      if (nameConflict) {
        res
          .status(409)
          .json({ error: "Document type with this name already exists" });
        return;
      }
    }

    const updatedDocumentType = await prisma.$transaction(async (tx) => {
      // Update document type
      const docType = await tx.documentType.update({
        where: { id: id },
        data: updateData,
      });

      // Handle fields update
      if (fields) {
        // Get existing fields for this document type
        const existingFields = await tx.documentField.findMany({
          where: { documentTypeId: docType.id },
        });

        // Separate fields into ones to update, create, and delete
        const fieldsToUpdate = fields.filter((field) =>
          existingFields.some((ef) => ef.fieldName === field.fieldName)
        );
        const fieldsToCreate = fields.filter(
          (field) =>
            !existingFields.some((ef) => ef.fieldName === field.fieldName)
        );
        const fieldsToDelete = existingFields.filter(
          (ef) => !fields.some((field) => field.fieldName === ef.fieldName)
        );

        // Process updates
        await Promise.all(
          fieldsToUpdate.map((field) =>
            tx.documentField.updateMany({
              where: {
                documentTypeId: docType.id,
                fieldName: field.fieldName,
              },
              data: {
                label: field.label,
                fieldType: field.fieldType,
                isRequired: field.isRequired ?? true,
                sortOrder: field.sortOrder ?? 0,
                placeholder: field.placeholder,
                defaultValue: field.defaultValue,
                validation: field.validation,
                options: field.options
                  ? JSON.parse(JSON.stringify(field.options))
                  : Prisma.JsonNull,
                helpText: field.helpText,
                section: field.section,
                minLength: field.minLength,
                maxLength: field.maxLength,
                dependsOn: field.dependsOn,
                dependsValue: field.dependsValue,
              },
            })
          )
        );

        // Process creations
        if (fieldsToCreate.length > 0) {
          await tx.documentField.createMany({
            data: fieldsToCreate.map((field) => ({
              documentTypeId: docType.id,
              fieldName: field.fieldName,
              label: field.label,
              fieldType: field.fieldType,
              isRequired: field.isRequired ?? true,
              sortOrder: field.sortOrder ?? 0,
              placeholder: field.placeholder,
              defaultValue: field.defaultValue,
              validation: field.validation,
              options: field.options
                ? JSON.parse(JSON.stringify(field.options))
                : Prisma.JsonNull,
              helpText: field.helpText,
              section: field.section,
              minLength: field.minLength,
              maxLength: field.maxLength,
              dependsOn: field.dependsOn,
              dependsValue: field.dependsValue,
            })),
          });
        }

        // Process deletions
        if (fieldsToDelete.length > 0) {
          await tx.documentField.deleteMany({
            where: {
              id: { in: fieldsToDelete.map((f) => f.id) },
            },
          });
        }
      }

      return docType;
    });

    // Fetch the complete updated document type
    const completeDocumentType = await prisma.documentType.findUnique({
      where: { id: updatedDocumentType.id },
      include: {
        fields: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    res.status(200).json({
      success: true,
      message: "Document type updated successfully",
      data: completeDocumentType,
    });
    return;
  } catch (error) {
    console.error("[UPDATE_DOCUMENT_TYPE_ERROR]", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        res
          .status(409)
          .json({ error: "Document type with this name already exists" });
        return;
      }
    }

    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

export const getDocumentType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const documentType = await prisma.documentType.findUnique({
      where: { id: id },
      include: {
        fields: {
          orderBy: { sortOrder: "asc" },
        },
      },
    });

    if (!documentType) {
      res.status(404).json({ error: "Document type not found" });
      return;
    }

    res.status(200).json({
      success: true,
      data: documentType,
    });
    return;
  } catch (error) {
    console.error("[GET_DOCUMENT_TYPE_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

export const getAllDocumentTypes = async (req: Request, res: Response) => {
  try {
    const documentTypes = await prisma.documentType.findMany({
      select: {
        id: true,
        name: true,
      },
      where: {
        isActive: true,
      },
      orderBy: { name: "asc" },
    });

    res.status(200).json({
      success: true,
      data: documentTypes,
    });
    return;
  } catch (error) {
    console.error("[GET_ALL_DOCUMENT_TYPES_ERROR]", error);
    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};

export const deleteDocumentType = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if document type exists
    const existingType = await prisma.documentType.findUnique({
      where: { id: id },
      include: {
        _count: {
          select: {
            fields: true,
            // Add other related counts if needed
            // documents: true
          },
        },
      },
    });

    if (!existingType) {
      res.status(404).json({ error: "Document type not found" });
      return;
    }

    // Optional: Check if there are documents using this type
    // Uncomment if you have a documents relation
    /*
    if (existingType._count.documents > 0) {
      res.status(400).json({ 
        error: "Cannot delete document type that is being used by documents",
        details: {
          documentsCount: existingType._count.documents
        }
      });
      return;
    }
    */

    // Delete document type and its fields in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete all associated fields first
      await tx.documentField.deleteMany({
        where: { documentTypeId: id },
      });

      // Delete the document type
      await tx.documentType.delete({
        where: { id: id },
      });
    });

    res.status(200).json({
      success: true,
      message: "Document type deleted successfully",
      data: {
        id: id,
        name: existingType.name,
        fieldsDeleted: existingType._count.fields,
      },
    });
    return;
  } catch (error) {
    console.error("[DELETE_DOCUMENT_TYPE_ERROR]", error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        res.status(400).json({
          error: "Cannot delete document type due to existing references",
        });
        return;
      }
    }

    res.status(500).json({ success: false, error: "Internal server error" });
    return;
  }
};
