import { z } from "zod";

export const DocumentStatusSchema = z.enum([
  "Draft",
  "Pending",
  "Completed",
  "Rejected",
  "Archived",
]);

export const DocumentFieldDataSchema = z.object({
  fieldId: z.string().uuid(),
  value: z.string().optional().nullable(),
});

export const CreateUserDocumentSchema = z.object({
  documentTypeId: z.string().uuid(),
  title: z.string().min(1).max(255),
  fieldData: z.array(DocumentFieldDataSchema).optional(),
});

export const UpdateUserDocumentSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  status: DocumentStatusSchema.optional(),
  fieldData: z.array(DocumentFieldDataSchema).optional(),
});

export const UpdateDocumentStatusSchema = z.object({
  status: DocumentStatusSchema,
});

export type CreateUserDocumentInput = z.infer<typeof CreateUserDocumentSchema>;
export type UpdateUserDocumentInput = z.infer<typeof UpdateUserDocumentSchema>;
export type DocumentFieldDataInput = z.infer<typeof DocumentFieldDataSchema>;
export type UpdateDocumentStatusInput = z.infer<
  typeof UpdateDocumentStatusSchema
>;
