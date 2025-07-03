import { z } from "zod";

export const DocumentCategorySchema = z.enum([
  "professional",
  "legal",
  "personal",
  "education",
  "business",
  "creative",
  "technical",
  "medical",
]);

export const FieldTypeSchema = z.enum([
  "text",
  "textarea",
  "number",
  "date",
  "email",
  "phone",
  "select",
  "checkbox",
  "radio",
  "file",
  "richText",
  "signature",
]);

export const DocumentFieldSchema = z.object({
  fieldName: z.string().min(1).max(100),
  label: z.string().min(1).max(100),
  fieldType: FieldTypeSchema,
  isRequired: z.boolean().default(true),
  sortOrder: z.number().int().nonnegative().default(0),
  placeholder: z.string().optional(),
  defaultValue: z.string().optional(),
  validation: z.string().optional(),
  options: z.record(z.unknown()).optional(),
  helpText: z.string().optional(),
  section: z.string().optional(),
  minLength: z.number().int().optional(),
  maxLength: z.number().int().optional(),
  dependsOn: z.string().optional(),
  dependsValue: z.string().optional(),
});

export const CreateDocumentTypeSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().optional(),
  templatePath: z.string().optional(),
  isActive: z.boolean().default(true),
  category: DocumentCategorySchema.optional(),
  icon: z.string().optional(),
  fields: z.array(DocumentFieldSchema).optional(),
});

export const UpdateDocumentTypeSchema = CreateDocumentTypeSchema.partial();

export type CreateDocumentTypeInput = z.infer<typeof CreateDocumentTypeSchema>;
export type UpdateDocumentTypeInput = z.infer<typeof UpdateDocumentTypeSchema>;
export type DocumentFieldInput = z.infer<typeof DocumentFieldSchema>;
