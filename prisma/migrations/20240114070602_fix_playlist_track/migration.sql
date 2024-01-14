/*
  Warnings:

  - The primary key for the `PlaylistTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `albumId` on the `PlaylistTrack` table. All the data in the column will be lost.
  - Added the required column `trackId` to the `PlaylistTrack` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PlaylistTrack" DROP CONSTRAINT "PlaylistTrack_albumId_fkey";

-- AlterTable
ALTER TABLE "PlaylistTrack" DROP CONSTRAINT "PlaylistTrack_pkey",
DROP COLUMN "albumId",
ADD COLUMN     "trackId" INTEGER NOT NULL,
ADD CONSTRAINT "PlaylistTrack_pkey" PRIMARY KEY ("playlistId", "trackId");

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
