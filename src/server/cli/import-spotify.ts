import "dotenv/config";
import { SpotifyService } from "../services/spotify";

async function main() {
  if (!process.env.SPOTIFY_CLIENT_ID) {
    console.error("Dotenv failed");
  }

  const spotifyService = new SpotifyService();
  // 1. Get all playlists from Spotify
  const playlists = await spotifyService.getPlaylists(1);

  // 2. For each playlist:
  for (const playlist of playlists) {
    // 2.1 Get all tracks from the playlist
    const playlistItems = await spotifyService.getPlaylistItems(playlist.id, 1);

    // 2.2 For each track:
    for (const playlistItem of playlistItems) {
      // 2.2.1 Add the track to the database
      console.log(playlistItem);
    }
  }
}

await main();
