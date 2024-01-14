/*
  Warnings:

  - The primary key for the `Artist` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArtistFollowers` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArtistTags` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ArtistTrack` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistFollowers" DROP CONSTRAINT "ArtistFollowers_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistTags" DROP CONSTRAINT "ArtistTags_artistId_fkey";

-- DropForeignKey
ALTER TABLE "ArtistTrack" DROP CONSTRAINT "ArtistTrack_artistId_fkey";

-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "artistId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Artist_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Artist_id_seq";

-- AlterTable
ALTER TABLE "ArtistFollowers" DROP CONSTRAINT "ArtistFollowers_pkey",
ALTER COLUMN "artistId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArtistFollowers_pkey" PRIMARY KEY ("userId", "artistId");

-- AlterTable
ALTER TABLE "ArtistTags" DROP CONSTRAINT "ArtistTags_pkey",
ALTER COLUMN "artistId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArtistTags_pkey" PRIMARY KEY ("artistId", "tagId");

-- AlterTable
ALTER TABLE "ArtistTrack" DROP CONSTRAINT "ArtistTrack_pkey",
ALTER COLUMN "artistId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ArtistTrack_pkey" PRIMARY KEY ("artistId", "trackId");

-- AddForeignKey
ALTER TABLE "ArtistTags" ADD CONSTRAINT "ArtistTags_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistFollowers" ADD CONSTRAINT "ArtistFollowers_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistTrack" ADD CONSTRAINT "ArtistTrack_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
