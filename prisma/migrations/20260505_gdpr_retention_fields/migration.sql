-- GDPR Retention Fields for Document model
-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "retentionExpiresAt" TIMESTAMP(3),
ADD COLUMN     "retentionNoticeSentAt" TIMESTAMP(3),
ADD COLUMN     "retentionToken" TEXT,
ADD COLUMN     "retentionYears" INTEGER NOT NULL DEFAULT 3;

-- CreateIndex
CREATE UNIQUE INDEX "Document_retentionToken_key" ON "Document"("retentionToken");
