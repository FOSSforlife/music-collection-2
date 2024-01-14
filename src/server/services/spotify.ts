import { SpotifyApi } from "@spotify/web-api-ts-sdk";
import type * as Spotify from "@spotify/web-api-ts-sdk";

export interface SpotifyTrack {
  spotifyId: string;
  name: string;
  artists: Array<string>;
  album: {
    spotifyId: string;
    artists: Array<string>;
    name: string;
    position: number;
  };
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
  private client: SpotifyApi;
  constructor(accessToken: Spotify.AccessToken) {
    this.client = SpotifyApi.withAccessToken(
      process.env.SPOTIFY_CLIENT_ID!,
      accessToken,
    );
  }

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
          spotifyId: track.track.id,
          name: track.track.name,
          artists: track.track.artists.map((artist) => artist.name),
          album: {
            artists: track.track.album.artists.map((artist) => artist.name),
            name: track.track.album.name,
            spotifyId: track.track.album.id,
            position: track.track.track_number,
          },
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

  // static async getAccessToken(code: string): Promise<string> {}
}
