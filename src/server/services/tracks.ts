import type { Prisma, PrismaClient, Track } from "@prisma/client";
import { db } from "~/server/db";

export interface TrackServiceInterface {
  getTrackByArtistAlbumAndName(
    albumArtists: Array<string>,
    albumTitle: string,
    name: string,
  ): Promise<Track | null>;
  createTrack(track: Prisma.TrackCreateInput): Promise<void>;
}

export class TrackService implements TrackServiceInterface {
  constructor(private database: PrismaClient = db) {}

  async getTrackByArtistAlbumAndName(
    albumArtists: Array<string>,
    albumTitle: string,
    name: string,
  ): Promise<Track | null> {
    return this.database.track.findFirst({
      where: {
        name,
        albums: {
          some: {
            album: {
              title: albumTitle,
              artists: {
                some: {
                  artist: {
                    name: {
                      in: albumArtists,
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async createTrack(track: Prisma.TrackCreateInput): Promise<void> {
    console.log(`Creating track ${track.name}`);
    await this.database.track.create({
      data: track,
    });
  }
}
