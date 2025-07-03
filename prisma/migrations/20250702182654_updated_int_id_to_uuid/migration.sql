/*
  Warnings:

  - The primary key for the `DocumentField` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DocumentFieldData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DocumentType` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `UserDocument` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('Draft', 'Completed', 'Archived', 'Published');

-- DropForeignKey
ALTER TABLE "DocumentField" DROP CONSTRAINT "DocumentField_documentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentFieldData" DROP CONSTRAINT "DocumentFieldData_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentFieldData" DROP CONSTRAINT "DocumentFieldData_userDocumentId_fkey";

-- DropForeignKey
ALTER TABLE "UserDocument" DROP CONSTRAINT "UserDocument_documentTypeId_fkey";

-- AlterTable
ALTER TABLE "DocumentField" DROP CONSTRAINT "DocumentField_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "documentTypeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DocumentField_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DocumentField_id_seq";

-- AlterTable
ALTER TABLE "DocumentFieldData" DROP CONSTRAINT "DocumentFieldData_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userDocumentId" SET DATA TYPE TEXT,
ALTER COLUMN "fieldId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DocumentFieldData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DocumentFieldData_id_seq";

-- AlterTable
ALTER TABLE "DocumentType" DROP CONSTRAINT "DocumentType_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DocumentType_id_seq";

-- AlterTable
ALTER TABLE "UserDocument" DROP CONSTRAINT "UserDocument_pkey",
ADD COLUMN     "status" "DocumentStatus" NOT NULL DEFAULT 'Draft',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "documentTypeId" SET DATA TYPE TEXT,
ADD CONSTRAINT "UserDocument_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "UserDocument_id_seq";

-- AddForeignKey
ALTER TABLE "DocumentField" ADD CONSTRAINT "DocumentField_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentFieldData" ADD CONSTRAINT "DocumentFieldData_userDocumentId_fkey" FOREIGN KEY ("userDocumentId") REFERENCES "UserDocument"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentFieldData" ADD CONSTRAINT "DocumentFieldData_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "DocumentField"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
