import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import type * as Spotify from "@spotify/web-api-ts-sdk";

interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  duration: number;
  dateAdded: Date;
  bpm: number;
  key: number;
  energy: number;
  danceability: number;
  valence: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  speechiness: number;
  loudness: number;
  mode: number;
  popularity: number;
}

interface PlaylistItem {
  addedAt: Date;
  track: SpotifyTrack;
}

interface PlaylistSearchItem {
  id: string;
  name: string;
  dateUpdated: Date;
  public: boolean;
  uri: string;
}

interface PlaylistedTrackNonEpisode extends Spotify.PlaylistedTrack {
  track: Spotify.Track;
}

const SpotifyPlaylistItemIsTrack = (
  playlistedTrack: Spotify.PlaylistedTrack,
): playlistedTrack is PlaylistedTrackNonEpisode => {
  return "album" in playlistedTrack.track;
};

export interface SpotifyServiceInterface {
  getPlaylists(): Promise<PlaylistSearchItem[]>;
  getPlaylistItems(playlistId: string): Promise<Array<PlaylistItem>>;
  // if we don't get all the track data from playlists:
  // getTrack(trackId: string): Promise<Track>;
}

export class SpotifyService implements SpotifyServiceInterface {
  constructor(
    private client = SpotifyApi.withAccessToken(
      process.env.SPOTIFY_CLIENT_ID!,
      {
        access_token: process.env.SPOTIFY_ACCESS_TOKEN!,
        token_type: "",
        expires_in: 0,
        refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
      },
    ),
  ) {}

  async getPlaylists(
    limit?: Spotify.MaxInt<50>,
  ): Promise<PlaylistSearchItem[]> {
    const playlists = await this.client.currentUser.playlists.playlists(limit);

    return playlists.items.map((playlist) => ({
      id: playlist.id,
      name: playlist.name,
      dateUpdated: new Date(playlist.snapshot_id),
      public: playlist.public,
      uri: playlist.uri,
    }));
  }

  async getPlaylistItems(
    playlistId: string,
    limit?: Spotify.MaxInt<50>,
  ): Promise<Array<PlaylistItem>> {
    const tracks = await this.client.playlists.getPlaylistItems(
      playlistId,
      undefined,
      undefined,
      limit,
    );
    const nonEpisodeTracks = tracks.items.filter(SpotifyPlaylistItemIsTrack);
    const tracksResult: Array<PlaylistItem> = [];

    for (const track of nonEpisodeTracks) {
      const audioFeatures = await this.client.tracks.audioFeatures(
        track.track.id,
      );
      tracksResult.push({
        addedAt: new Date(track.added_at),
        track: {
          id: track.track.id,
          name: track.track.name,
          artist: track.track.artists[0]!.name, // TODO: handle multiple artists
          album: track.track.album.name,
          duration: track.track.duration_ms,
          dateAdded: new Date(track.added_at),
          bpm: audioFeatures.tempo,
          key: audioFeatures.key,
          energy: audioFeatures.energy,
          danceability: audioFeatures.danceability,
          valence: audioFeatures.valence,
          acousticness: audioFeatures.acousticness,
          instrumentalness: audioFeatures.instrumentalness,
          liveness: audioFeatures.liveness,
          speechiness: audioFeatures.speechiness,
          loudness: audioFeatures.loudness,
          mode: audioFeatures.mode,
          popularity: track.track.popularity,
        },
      });
    }

    return tracksResult;
  }
}
