import type { SpotifyTrack } from "../services/spotify";

interface TrackSaveData {
  playlistDbId?: number;
}

export type TrackInfo = SpotifyTrack & TrackSaveData; // TODO: combine with Last.fm, RYM, and others
