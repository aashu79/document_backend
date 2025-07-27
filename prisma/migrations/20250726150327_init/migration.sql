-- DropForeignKey
ALTER TABLE "DocumentField" DROP CONSTRAINT "DocumentField_documentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentFieldData" DROP CONSTRAINT "DocumentFieldData_fieldId_fkey";

-- DropForeignKey
ALTER TABLE "DocumentFieldData" DROP CONSTRAINT "DocumentFieldData_userDocumentId_fkey";

-- DropForeignKey
ALTER TABLE "UserDocument" DROP CONSTRAINT "UserDocument_documentTypeId_fkey";

-- DropForeignKey
ALTER TABLE "UserDocument" DROP CONSTRAINT "UserDocument_userId_fkey";

-- AddForeignKey
ALTER TABLE "DocumentField" ADD CONSTRAINT "DocumentField_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_documentTypeId_fkey" FOREIGN KEY ("documentTypeId") REFERENCES "DocumentType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentFieldData" ADD CONSTRAINT "DocumentFieldData_userDocumentId_fkey" FOREIGN KEY ("userDocumentId") REFERENCES "UserDocument"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DocumentFieldData" ADD CONSTRAINT "DocumentFieldData_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "DocumentField"("id") ON DELETE CASCADE ON UPDATE CASCADE;
