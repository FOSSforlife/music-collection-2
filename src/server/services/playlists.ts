import type { PrismaClient, Playlist, Prisma } from "@prisma/client";
import { db } from "~/server/db";

export interface PlaylistServiceInterface {
  getPlaylistById(playlistId: number): Promise<Playlist>
  createPlaylist(Playlist: Prisma.PlaylistCreateInput): Promise<Playlist>;
}

export class PlaylistService implements PlaylistServiceInterface {
  constructor(private database: PrismaClient = db) {}

  async getPlaylistById(playlistId: number): Promise<Playlist> {
    return this.database.playlist.findFirst({
      where: {
        id: playlistId
      },
    });
  }

  async createPlaylist(
    playlist: Prisma.PlaylistCreateInput,
  ): Promise<Playlist> {
    console.log(`Creating playlist ${playlist.name}`);
    return this.database.playlist.upsert({
      where: {
        id: playlist.,
      },
      update: playlist,
      create: playlist,
    });
  }
}
