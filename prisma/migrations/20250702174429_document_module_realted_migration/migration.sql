-- CreateEnum
CREATE TYPE "DocumentCategory" AS ENUM ('professional', 'legal', 'personal', 'education', 'business', 'creative', 'technical', 'medical');

-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('text', 'textarea', 'number', 'date', 'email', 'phone', 'select', 'checkbox', 'radio', 'file', 'richText', 'signature');

-- CreateTable
CREATE TABLE "DocumentType" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "templatePath" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "category" "DocumentCategory",
    "icon" TEXT,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentField" (
    "id" SERIAL NOT NULL,
    "documentTypeId" INTEGER NOT NULL,
    "fieldName" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "fieldType" "FieldType" NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "placeholder" TEXT,
    "defaultValue" TEXT,
    "validation" TEXT,
    "options" JSONB,
    "helpText" TEXT,
    "section" TEXT,
    "minLength" INTEGER,
    "maxLength" INTEGER,
    "dependsOn" TEXT,
    "dependsValue" TEXT,

    CONSTRAINT "DocumentField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDocument" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "documentTypeId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "lastGeneratedAt" TIMESTAMP(3),
    "generatedPdfPath" TEXT,
    "generatedDocxPath" TEXT,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isCurrent" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "UserDocument_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DocumentFieldData" (
    "id" SERIAL NOT NULL,
    "userDocumentId" INTEGER NOT NULL,
    "fieldId" INTEGER NOT NULL,
    "value" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "versionNumber" INTEGER NOT NULL DEFAULT 1,

    CONSTRAINT "DocumentFieldData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DocumentType_name_key" ON "DocumentType"("name");

-- CreateIndex
CREATE INDEX "DocumentField_documentTypeId_sortOrder_idx" ON "DocumentField"("documentTypeId", "sortOrder");

-- CreateIndex
CREATE INDEX "UserDocument_userId_documentTypeId_idx" ON "UserDocument"("userId", "documentTypeId");

-- CreateIndex
CREATE INDEX "DocumentFieldData_userDocumentId_fieldId_idx" ON "DocumentFieldData"("userDocumentId", "fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "DocumentFieldData_userDocumentId_fieldId_versionNumber_key" ON "DocumentFieldData"("userDocumentId", "fieldId", "versionNumber");

-- AddForeignKey
ALTER TABLE "DocumentField" ADD CONSTRAINT "DocumentField_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentFieldData" ADD CONSTRAINT "DocumentFieldData_userDocumentId_fkey" FOREIGN KEY ("userDocumentId") REFERENCES "UserDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentFieldData" ADD CONSTRAINT "DocumentFieldData_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "DocumentField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
