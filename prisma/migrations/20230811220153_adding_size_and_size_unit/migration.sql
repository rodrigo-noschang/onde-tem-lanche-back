/*
  Warnings:

  - Added the required column `size` to the `dishes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `size_unit` to the `dishes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "dishes" ADD COLUMN     "size" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "size_unit" TEXT NOT NULL;
