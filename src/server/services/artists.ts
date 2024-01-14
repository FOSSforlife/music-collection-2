import type { PrismaClient, Artist, Prisma } from "@prisma/client";
import { db } from "~/server/db";

export interface ArtistServiceInterface {
  getArtistsByName(name: string): Promise<Array<Artist>>;
  createArtist(artist: Prisma.ArtistCreateInput): Promise<Artist>;
}

export class ArtistService implements ArtistServiceInterface {
  constructor(private database: PrismaClient = db) {}

  async getArtistsByName(name: string): Promise<Array<Artist>> {
    return this.database.artist.findMany({
      where: { name },
    });
  }

  async createArtist(artist: Prisma.ArtistCreateInput): Promise<Artist> {
    console.log(`Creating artist ${artist.name}`);
    return this.database.artist.create({
      data: artist,
    });
  }
}
