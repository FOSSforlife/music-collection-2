import type { ArtistServiceInterface } from "../services/artists";
import type { AlbumServiceInterface } from "../services/albums";
import type { TrackServiceInterface } from "../services/tracks";
import type { TrackInfo } from "../types/tracks";
import { generateArtistId } from "./generateArtistId";
import type { Artist } from "@prisma/client";

export async function saveTrack(
  trackInfo: TrackInfo,
  artistService: ArtistServiceInterface,
  albumService: AlbumServiceInterface,
  trackService: TrackServiceInterface,
) {
  // If track exists, return
  if (
    await trackService.getTrackByArtistAlbumAndName(
      trackInfo.album.artists,
      trackInfo.album.name,
      trackInfo.name,
    )
  ) {
    console.log(`Track ${trackInfo.name} already exists`);
    return;
  }

  // If album exists, create track
  const album = await albumService.getAlbumByArtistsAndTitle(
    trackInfo.album.artists,
    trackInfo.album.name,
  );
  if (album) {
    await trackService.createTrack({
      name: trackInfo.name,
      spotifyId: trackInfo.spotifyId,
      albums: {
        create: {
          albumId: album.id,
          position: trackInfo.album.position,
        },
      },
    });
  } else {
    // Else create album and track
    const albumArtists: Array<Artist> = [];
    for (const artist of trackInfo.album.artists) {
      const existingArtists = await artistService.getArtistsByName(artist);
      if (existingArtists[0]) {
        albumArtists.push(existingArtists[0]); // TODO: Handle multiple artists with same name (figure out which one it is)
      } else {
        const newArtist = await artistService.createArtist({
          name: artist,
          id: await generateArtistId(artist, artistService, false),
        });
        albumArtists.push(newArtist);
      }
    }

    const newAlbum = await albumService.createAlbum({
      title: trackInfo.album.name,
      spotifyId: trackInfo.album.spotifyId,
      artists: {
        create: albumArtists.map((artist) => ({
          artist: {
            connect: {
              id: artist.id,
            },
          },
        })),
      },
    });

    await trackService.createTrack({
      name: trackInfo.name,
      spotifyId: trackInfo.spotifyId,
      albums: {
        create: {
          albumId: newAlbum.id,
          position: trackInfo.album.position,
        },
      },
    });
  }
}
