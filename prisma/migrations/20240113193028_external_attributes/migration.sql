-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "mbid" TEXT,
ADD COLUMN     "rymId" TEXT,
ADD COLUMN     "spotifyId" TEXT;

-- AlterTable
ALTER TABLE "Artist" ADD COLUMN     "mbid" TEXT,
ADD COLUMN     "rymId" TEXT,
ADD COLUMN     "spotifyId" TEXT;

-- CreateTable
CREATE TABLE "Track" (
    "id" SERIAL NOT NULL,
    "spotifyId" TEXT,
    "mbid" TEXT,
    "bpm" INTEGER,
    "key" TEXT NOT NULL,
    "energy" DOUBLE PRECISION,
    "danceability" DOUBLE PRECISION,
    "valence" DOUBLE PRECISION,
    "acousticness" DOUBLE PRECISION,
    "instrumentalness" DOUBLE PRECISION,
    "liveness" DOUBLE PRECISION,
    "speechiness" DOUBLE PRECISION,
    "loudness" DOUBLE PRECISION,
    "mode" INTEGER,
    "popularity" DOUBLE PRECISION,

    CONSTRAINT "Track_pkey" PRIMARY KEY ("id")
);
