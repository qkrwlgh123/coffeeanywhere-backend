/*
  Warnings:

  - You are about to drop the column `public` on the `CoffeeShop` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CoffeeShop" DROP COLUMN "public",
ADD COLUMN     "open" BOOLEAN;
