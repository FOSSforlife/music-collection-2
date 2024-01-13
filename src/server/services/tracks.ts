import { PrismaClient, Track } from "@prisma/client";

export interface TrackServiceInterface {
  addTrack(track: Track): Promise<void>;
}

export class TrackService implements TrackServiceInterface {
  constructor(private db: PrismaClient) {}

  async addTrack(track: Track): Promise<void> {
    await this.db.track.create({
      data: track,
    });
  }
}
