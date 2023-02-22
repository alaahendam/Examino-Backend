/*
  Warnings:

  - You are about to drop the column `ownerApperoved` on the `levelsonusers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `levelsonusers` DROP COLUMN `ownerApperoved`,
    ADD COLUMN `ownerApproved` BOOLEAN NULL DEFAULT false;
