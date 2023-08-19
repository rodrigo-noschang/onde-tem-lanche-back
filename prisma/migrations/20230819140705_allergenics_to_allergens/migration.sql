/*
  Warnings:

  - You are about to drop the column `allergenics` on the `customers` table. All the data in the column will be lost.
  - You are about to drop the column `allergenics` on the `dishes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "customers" DROP COLUMN "allergenics",
ADD COLUMN     "allergens" TEXT[];

-- AlterTable
ALTER TABLE "dishes" DROP COLUMN "allergenics",
ADD COLUMN     "allergens" TEXT[];
