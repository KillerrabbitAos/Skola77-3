/*
  Warnings:

  - You are about to alter the column `location` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Unsupported("geometry(Point, 4326)")`.
  - Made the column `location` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "location"
