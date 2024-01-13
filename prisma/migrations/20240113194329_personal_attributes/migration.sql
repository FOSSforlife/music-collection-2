/*
  Warnings:

  - You are about to drop the `PlaylistAlbum` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlaylistAlbum" DROP CONSTRAINT "PlaylistAlbum_albumId_fkey";

-- DropForeignKey
ALTER TABLE "PlaylistAlbum" DROP CONSTRAINT "PlaylistAlbum_playlistId_fkey";

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "rating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "cool" DOUBLE PRECISION,
ADD COLUMN     "edm" DOUBLE PRECISION,
ADD COLUMN     "experimental" DOUBLE PRECISION,
ADD COLUMN     "metal" DOUBLE PRECISION,
ADD COLUMN     "notes" TEXT;

-- DropTable
DROP TABLE "PlaylistAlbum";

-- CreateTable
CREATE TABLE "PlaylistTrack" (
    "playlistId" INTEGER NOT NULL,
    "albumId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "PlaylistTrack_pkey" PRIMARY KEY ("playlistId","albumId")
);

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlaylistTrack" ADD CONSTRAINT "PlaylistTrack_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
