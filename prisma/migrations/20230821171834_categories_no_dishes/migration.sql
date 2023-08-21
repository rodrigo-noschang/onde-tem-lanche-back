/*
  Warnings:

  - Made the column `updated_at` on table `restaurants` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "dishes" ADD COLUMN     "categories" TEXT[];

-- AlterTable
ALTER TABLE "restaurants" ALTER COLUMN "updated_at" SET NOT NULL;
