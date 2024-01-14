/*
  Warnings:

  - You are about to drop the column `cool` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `edm` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `experimental` on the `Track` table. All the data in the column will be lost.
  - You are about to drop the column `metal` on the `Track` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Track" DROP COLUMN "cool",
DROP COLUMN "edm",
DROP COLUMN "experimental",
DROP COLUMN "metal",
ADD COLUMN     "coolness" DOUBLE PRECISION,
ADD COLUMN     "heaviness" DOUBLE PRECISION,
ADD COLUMN     "hyper" DOUBLE PRECISION,
ADD COLUMN     "rave" DOUBLE PRECISION;
