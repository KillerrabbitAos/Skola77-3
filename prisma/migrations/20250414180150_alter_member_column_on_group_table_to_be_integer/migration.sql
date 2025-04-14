/*
  Warnings:

  - The `members` column on the `Group` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Group" DROP COLUMN "members",
ADD COLUMN     "members" INTEGER NOT NULL DEFAULT 0;
