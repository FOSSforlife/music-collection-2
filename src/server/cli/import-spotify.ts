import "dotenv/config";
import { SpotifyService } from "../services/spotify";
import spotifyToken from "../../../spotify-token.json";
import { TrackService } from "../services/tracks";
import { db } from "~/server/db";
import { saveTrack } from "../utils/saveTrack";
import { ArtistService } from "../services/artists";
import { AlbumService } from "../services/albums";

async function main() {
  if (!process.env.SPOTIFY_CLIENT_ID) {
    console.error("Dotenv failed");
  }

  const spotifyService = new SpotifyService(spotifyToken);
  const trackService = new TrackService();
  const artistService = new ArtistService();
  const albumService = new AlbumService();
  // 1. Get all playlists from Spotify
  const playlists = await spotifyService.getPlaylists(10);

  // 2. For each playlist:
  for (const playlist of playlists) {
    // 2.1 Get all tracks from the playlist
    const playlistItems = await spotifyService.getPlaylistItems(
      playlist.id,
      30,
    );

    // 2.2 For each track:
    for (const playlistItem of playlistItems) {
      await saveTrack(
        playlistItem.track,
        artistService,
        albumService,
        trackService,
        playlist,
      );
    }
  }
}

await main();
