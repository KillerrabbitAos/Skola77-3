/*
  Warnings:

  - You are about to drop the column `members` on the `Request` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Request" DROP COLUMN "members",
ADD COLUMN     "status" INTEGER NOT NULL DEFAULT 0;
