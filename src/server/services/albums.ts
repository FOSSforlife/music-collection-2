import type { PrismaClient, Album, Prisma } from "@prisma/client";
import { db } from "~/server/db";

export interface AlbumServiceInterface {
  getAlbumByArtistsAndTitle(
    artists: Array<string>,
    name: string,
  ): Promise<Album | null>;
  createAlbum(album: Prisma.AlbumCreateInput): Promise<Album>;
}

export class AlbumService implements AlbumServiceInterface {
  constructor(private database: PrismaClient = db) {}

  async getAlbumByArtistsAndTitle(
    artists: Array<string>,
    title: string,
  ): Promise<Album | null> {
    return this.database.album.findFirst({
      where: {
        title,
        artists: {
          some: {
            artistId: {
              in: artists,
            },
          },
        },
      },
    });
  }

  async createAlbum(album: Prisma.AlbumCreateInput): Promise<Album> {
    console.log(`Creating album ${album.title}`);
    return this.database.album.create({
      data: album,
    });
  }
}
