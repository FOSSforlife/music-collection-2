/*
  Warnings:

  - You are about to drop the column `position` on the `PlaylistTrack` table. All the data in the column will be lost.
  - The `key` column on the `Track` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `addedAt` to the `PlaylistTrack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Track` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PlaylistTrack" DROP COLUMN "position",
ADD COLUMN     "addedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Track" ADD COLUMN     "name" TEXT NOT NULL,
DROP COLUMN "key",
ADD COLUMN     "key" INTEGER;

-- CreateTable
CREATE TABLE "AlbumTrack" (
    "albumId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "AlbumTrack_pkey" PRIMARY KEY ("albumId","trackId")
);

-- CreateTable
CREATE TABLE "ArtistTrack" (
    "artistId" INTEGER NOT NULL,
    "trackId" INTEGER NOT NULL,

    CONSTRAINT "ArtistTrack_pkey" PRIMARY KEY ("artistId","trackId")
);

-- AddForeignKey
ALTER TABLE "AlbumTrack" ADD CONSTRAINT "AlbumTrack_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlbumTrack" ADD CONSTRAINT "AlbumTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistTrack" ADD CONSTRAINT "ArtistTrack_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistTrack" ADD CONSTRAINT "ArtistTrack_trackId_fkey" FOREIGN KEY ("trackId") REFERENCES "Track"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
